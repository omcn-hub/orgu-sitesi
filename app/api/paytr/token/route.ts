import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { headers } from "next/headers";

// ─────────────────────────────────────────────────────────────
// POST /api/paytr/token
// Frontend bu endpoint'i çağırır, hassas key'ler asla client'a gitmez.
// ─────────────────────────────────────────────────────────────

interface TokenRequestBody {
  productName: string;
  price: string; // "500 ₺" formatında gelir, sayıya çevrilir
  productId: string;
}

function generateOrderId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORG${timestamp}${random}`;
}

// TL fiyat stringini kuruşa çevir: "500 ₺" → 50000
function parsePriceToKurus(priceStr: string): number {
  const cleaned = priceStr.replace(/[^\d,.]/g, "").replace(",", ".");
  const tl = parseFloat(cleaned) || 0;
  return Math.round(tl * 100);
}

export async function POST(req: NextRequest) {
  try {
    const merchantId = process.env.PAYTR_MERCHANT_ID;
    const merchantKey = process.env.PAYTR_MERCHANT_KEY;
    const merchantSalt = process.env.PAYTR_MERCHANT_SALT;

    if (!merchantId || !merchantKey || !merchantSalt) {
      return NextResponse.json(
        { error: "Ödeme sistemi yapılandırılmamış." },
        { status: 500 }
      );
    }

    const body: TokenRequestBody = await req.json();
    const { productName, price, productId } = body;

    if (!productName || !price) {
      return NextResponse.json({ error: "Eksik ürün bilgisi." }, { status: 400 });
    }

    // Kullanıcının gerçek IP'sini al (Vercel proxy arkasında)
    const headerList = await headers();
    const userIp =
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    const paymentAmountKurus = parsePriceToKurus(price);
    const merchantOid = generateOrderId();

    // PayTR sepet formatı: base64( JSON([[name, price_kurus_str, qty]] ) )
    const userBasket = Buffer.from(
      JSON.stringify([[productName, String(paymentAmountKurus), 1]])
    ).toString("base64");

    const noInstallment = "0";
    const maxInstallment = "0";
    const currency = "TL";
    const testMode = process.env.PAYTR_TEST_MODE === "true" ? "1" : "0";

    // PayTR hash hesaplama
    const hashStr =
      merchantId +
      userIp +
      merchantOid +
      "musteri@orguhome.com" +
      paymentAmountKurus +
      userBasket +
      noInstallment +
      maxInstallment +
      currency +
      testMode +
      merchantSalt;

    const paytrToken = crypto
      .createHmac("sha256", merchantKey)
      .update(hashStr)
      .digest("base64");

    const formData = new URLSearchParams({
      merchant_id: merchantId,
      user_ip: userIp,
      merchant_oid: merchantOid,
      email: "musteri@orguhome.com",
      payment_amount: String(paymentAmountKurus),
      paytr_token: paytrToken,
      user_basket: userBasket,
      debug_on: "0",
      no_installment: noInstallment,
      max_installment: maxInstallment,
      user_name: "Değerli Müşteri",
      user_address: "Türkiye",
      user_phone: "05000000000",
      merchant_ok_url: "https://www.orguhome.com.tr/odeme/tesekkur",
      merchant_fail_url: "https://www.orguhome.com.tr/odeme/hata",
      timeout_limit: "30",
      currency,
      test_mode: testMode,
      lang: "tr",
    });

    const paytrResponse = await fetch(
      "https://www.paytr.com/odeme/api/get-token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      }
    );

    const result = (await paytrResponse.json()) as {
      status: string;
      token?: string;
      reason?: string;
    };

    if (result.status !== "success" || !result.token) {
      console.error("[PayTR Token] Hata:", result.reason);
      return NextResponse.json(
        { error: result.reason || "Token alınamadı." },
        { status: 502 }
      );
    }

    return NextResponse.json({ token: result.token, orderId: merchantOid });
  } catch (err) {
    console.error("[PayTR Token] Beklenmedik hata:", err);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
