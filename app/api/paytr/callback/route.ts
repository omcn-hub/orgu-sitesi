import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// ─────────────────────────────────────────────────────────────
// PayTR Callback Handler
// Endpoint: POST /api/paytr/callback
// Bu rota PayTR sunucularından gelen ödeme bildirimlerini alır.
// PayTR, ödeme tamamlandığında bu adrese POST isteği gönderir.
// Doğrulama başarılı ve ödeme "success" ise sipariş güncellenir.
// PayTR yalnızca düz metin "OK" yanıtını kabul eder.
// ─────────────────────────────────────────────────────────────

/**
 * Siparişi "Ödendi" olarak güncelleyen fonksiyon.
 * Bu fonksiyonu kendi veritabanı/API mantığınıza göre uyarlayın.
 *
 * @param merchantOid - PayTR'den gelen sipariş numarası
 * @param totalAmount - Ödenen tutar (kuruş cinsinden, örn: 15000 = 150.00 TL)
 */
async function markOrderAsPaid(
  merchantOid: string,
  totalAmount: string
): Promise<void> {
  // ─── ÖRNEK: Prisma ORM ile güncelleme ───────────────────────
  // import { prisma } from "@/lib/prisma";
  // await prisma.order.update({
  //   where: { merchantOid },
  //   data: {
  //     status: "paid",
  //     paidAmount: parseInt(totalAmount) / 100, // kuruşu TL'ye çevir
  //     paidAt: new Date(),
  //   },
  // });

  // ─── ÖRNEK: Harici bir API'ye istek ─────────────────────────
  // await fetch(`${process.env.INTERNAL_API_URL}/orders/${merchantOid}/pay`, {
  //   method: "PATCH",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ status: "paid", amount: totalAmount }),
  // });

  // Şimdilik konsola yaz — kendi mantığınızla değiştirin
  console.log(
    `[PayTR] Sipariş güncellendi → OID: ${merchantOid} | Tutar: ${
      parseInt(totalAmount) / 100
    } TL`
  );
}

/**
 * PayTR hash doğrulaması.
 * PayTR dokümantasyonuna göre hash şu şekilde hesaplanır:
 * base64( HMAC-SHA256( merchant_oid + merchant_salt + status + total_amount, merchant_key ) )
 */
function verifyPayTRHash(params: {
  merchantOid: string;
  status: string;
  totalAmount: string;
  hash: string;
  merchantKey: string;
  merchantSalt: string;
}): boolean {
  const { merchantOid, status, totalAmount, hash, merchantKey, merchantSalt } =
    params;

  const hashStr = merchantOid + merchantSalt + status + totalAmount;

  const expectedHash = crypto
    .createHmac("sha256", merchantKey)
    .update(hashStr)
    .digest("base64");

  // Zamanlama saldırılarına karşı sabit zamanlı karşılaştırma
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expectedHash),
      Buffer.from(hash)
    );
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    // ── 1. Ortam değişkenlerini al ─────────────────────────────
    const merchantKey = process.env.PAYTR_MERCHANT_KEY;
    const merchantSalt = process.env.PAYTR_MERCHANT_SALT;

    if (!merchantKey || !merchantSalt) {
      console.error(
        "[PayTR] PAYTR_MERCHANT_KEY veya PAYTR_MERCHANT_SALT tanımlı değil!"
      );
      // PayTR'ye OK döndürmeyin — tekrar deneyecektir, siz de sorunu çözebilirsiniz
      return new NextResponse("MISSING_CONFIG", { status: 500 });
    }

    // ── 2. POST gövdesini parse et (application/x-www-form-urlencoded) ──
    const body = await req.text();
    const params = new URLSearchParams(body);

    const merchantOid = params.get("merchant_oid") ?? "";
    const status = params.get("status") ?? "";
    const totalAmount = params.get("total_amount") ?? "";
    const hash = params.get("hash") ?? "";

    // Zorunlu alanların varlığını kontrol et
    if (!merchantOid || !status || !totalAmount || !hash) {
      console.warn("[PayTR] Eksik parametre alındı:", {
        merchantOid,
        status,
        totalAmount,
        hash: hash ? "***" : "(boş)",
      });
      return new NextResponse("INVALID_PARAMS", { status: 400 });
    }

    // ── 3. Hash doğrulaması ─────────────────────────────────────
    const isValid = verifyPayTRHash({
      merchantOid,
      status,
      totalAmount,
      hash,
      merchantKey,
      merchantSalt,
    });

    if (!isValid) {
      console.error(
        `[PayTR] Hash doğrulaması BAŞARISIZ → OID: ${merchantOid}`
      );
      // Güvenlik: geçersiz hash'te OK dönme, PayTR tekrar deneyecektir
      return new NextResponse("INVALID_HASH", { status: 403 });
    }

    // ── 4. Ödeme durumuna göre işlem yap ───────────────────────
    if (status === "success") {
      console.log(
        `[PayTR] Ödeme BAŞARILI → OID: ${merchantOid} | Tutar: ${
          parseInt(totalAmount) / 100
        } TL`
      );
      await markOrderAsPaid(merchantOid, totalAmount);
    } else {
      // "failed" durumu — siparişi iptal/başarısız olarak işaretleyebilirsiniz
      console.log(
        `[PayTR] Ödeme BAŞARISIZ → OID: ${merchantOid} | Durum: ${status}`
      );
      // İsteğe bağlı: markOrderAsFailed(merchantOid);
    }

    // ── 5. PayTR'ye zorunlu "OK" yanıtı dön ────────────────────
    // PayTR bu yanıtı görmezse bildirimi tekrar tekrar gönderir!
    return new NextResponse("OK", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("[PayTR] Callback işlenirken beklenmedik hata:", error);
    // Hata durumunda da PayTR'ye "OK" dönmezseniz sürekli tekrar gönderir.
    // Hatayı logladıktan sonra OK dönmek genellikle daha güvenlidir.
    return new NextResponse("OK", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

// GET isteklerini reddet (sadece PayTR'nin POST'u geçerli)
export async function GET() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
