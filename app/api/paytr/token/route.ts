import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { headers } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase";
import { CheckoutError, priceItems, validateCustomer } from "@/lib/checkout";

// ─────────────────────────────────────────────────────────────
// POST /api/paytr/token
// Frontend bu endpoint'i çağırır, hassas key'ler asla client'a gitmez.
// İstemci yalnızca ürün kimliği/adet/seçenek id'leri ve müşteri bilgisi
// gönderir; tutar burada hesaplanır ve sipariş ödeme beklerken kaydedilir.
// ─────────────────────────────────────────────────────────────

function generateOrderId(): string {
  const timestamp = Date.now();
  const random = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `ORG${timestamp}${random}`;
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

    const body = await req.json();

    let lines, customer;
    try {
      lines = priceItems(body?.items);
      customer = validateCustomer(body?.customer);
    } catch (err) {
      if (err instanceof CheckoutError) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
      throw err;
    }

    // Kullanıcının gerçek IP'sini al (Vercel proxy arkasında)
    const headerList = await headers();
    const userIp =
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    const totalTl = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
    const paymentAmountKurus = Math.round(totalTl * 100);
    const merchantOid = generateOrderId();

    // ── Siparişi ödeme beklerken kaydet — kayıt yoksa ödeme alma ──
    const supabase = createServerSupabaseClient();
    const orderDate = new Date().toISOString();
    const { error: dbError } = await supabase.from("custom_orders").insert(
      lines.map((l) => ({
        paytr_order_id: merchantOid,
        payment_status: "awaiting",
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        customer_address: customer.address,
        product_id: l.productId,
        product_name: l.name,
        quantity: l.quantity,
        base_price: l.unitPrice,
        total_price: l.unitPrice * l.quantity,
        color_label: l.custom?.colorLabel ?? null,
        color_hex: l.custom?.colorHex ?? null,
        size: l.custom?.size ?? null,
        sole_type: l.custom?.sole ?? null,
        yarn_type: l.custom?.yarn ?? null,
        ankle_height: l.custom?.ankle ?? null,
        knit_pattern: l.custom?.pattern ?? null,
        accessories: l.custom?.accessories ?? [],
        gift_box: l.custom?.giftBox ?? false,
        has_inscription: !!l.custom?.inscription,
        inscription_text: l.custom?.inscription || null,
        status: "pending",
        order_date: orderDate,
      }))
    );

    if (dbError) {
      console.error("[PayTR Token] Sipariş kaydedilemedi:", dbError);
      return NextResponse.json(
        { error: "Sipariş oluşturulamadı. Lütfen tekrar deneyin." },
        { status: 500 }
      );
    }

    // PayTR sepet formatı: base64( JSON([[name, birim_fiyat_tl_str, qty]] ) )
    const userBasket = Buffer.from(
      JSON.stringify(
        lines.map((l) => [l.name.substring(0, 100), l.unitPrice.toFixed(2), l.quantity])
      )
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
      customer.email +
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
      email: customer.email,
      payment_amount: String(paymentAmountKurus),
      paytr_token: paytrToken,
      user_basket: userBasket,
      debug_on: "0",
      no_installment: noInstallment,
      max_installment: maxInstallment,
      user_name: customer.name,
      user_address: customer.address,
      user_phone: customer.phone,
      merchant_ok_url: `${req.nextUrl.origin}/odeme/tesekkur`,
      merchant_fail_url: `${req.nextUrl.origin}/odeme/hata`,
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
      await supabase
        .from("custom_orders")
        .update({ payment_status: "failed" })
        .eq("paytr_order_id", merchantOid);
      return NextResponse.json(
        { error: "Ödeme formu açılamadı. Lütfen tekrar deneyin." },
        { status: 502 }
      );
    }

    return NextResponse.json({ token: result.token, orderId: merchantOid, total: totalTl });
  } catch (err) {
    console.error("[PayTR Token] Beklenmedik hata:", err);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
