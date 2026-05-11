import crypto from "crypto";

// ─────────────────────────────────────────────────────────────
// PayTR Yardımcı Fonksiyonlar
// Kaynak: https://dev.paytr.com/iframe-api
// ─────────────────────────────────────────────────────────────

export interface PayTROrderItem {
  name: string;
  price: string; // kuruş cinsinden string (örn: "15000" = 150 TL)
  quantity: number;
}

export interface PayTRTokenParams {
  merchantId: string;
  merchantKey: string;
  merchantSalt: string;
  merchantOid: string;        // Benzersiz sipariş numaranız
  email: string;              // Alıcı e-postası
  paymentAmount: number;      // Kuruş cinsinden (örn: 15000 = 150 TL)
  currency?: string;          // "TL" | "USD" | "EUR" (varsayılan: "TL")
  testMode?: "0" | "1";       // "1" = test modu
  noInstallment?: "0" | "1";  // "1" = taksit seçeneklerini kapat
  maxInstallment?: string;    // Maksimum taksit sayısı ("0" = limitsiz)
  userBasket: PayTROrderItem[];
  userIp: string;
  userName: string;
  userAddress: string;
  userPhone: string;
  merchantOkUrl: string;      // Başarılı ödeme sonrası yönlendirme URL'i
  merchantFailUrl: string;    // Başarısız ödeme sonrası yönlendirme URL'i
  debugOn?: "0" | "1";        // "1" = hata bilgilerini göster
  lang?: "tr" | "en";
}

/**
 * PayTR iFrame token'ı oluşturur.
 * Bu token ile müşteriye ödeme formu gösterebilirsiniz.
 *
 * @example
 * const token = await generatePayTRToken({ ... });
 * // Ardından token ile PayTR iFrame API'sini çağırın:
 * // POST https://www.paytr.com/odeme/api/get-token
 */
export async function generatePayTRToken(
  params: PayTRTokenParams
): Promise<string> {
  const {
    merchantId,
    merchantKey,
    merchantSalt,
    merchantOid,
    email,
    paymentAmount,
    currency = "TL",
    testMode = "0",
    noInstallment = "0",
    maxInstallment = "0",
    userBasket,
    userIp,
    userName,
    userAddress,
    userPhone,
    merchantOkUrl,
    merchantFailUrl,
    debugOn = "0",
    lang = "tr",
  } = params;

  // Sepeti base64 ile kodla
  const basketEncoded = Buffer.from(
    JSON.stringify(
      userBasket.map((item) => [item.name, item.price, item.quantity])
    )
  ).toString("base64");

  // Hash oluşturma: PayTR dokümantasyonuna göre
  const hashStr =
    merchantId +
    userIp +
    merchantOid +
    email +
    paymentAmount +
    basketEncoded +
    noInstallment +
    maxInstallment +
    currency +
    testMode +
    merchantSalt;

  const paytrToken = crypto
    .createHmac("sha256", merchantKey)
    .update(hashStr)
    .digest("base64");

  // PayTR API'sine token isteği gönder
  const formData = new URLSearchParams({
    merchant_id: merchantId,
    user_ip: userIp,
    merchant_oid: merchantOid,
    email: email,
    payment_amount: String(paymentAmount),
    paytr_token: paytrToken,
    user_basket: basketEncoded,
    debug_on: debugOn,
    no_installment: noInstallment,
    max_installment: maxInstallment,
    user_name: userName,
    user_address: userAddress,
    user_phone: userPhone,
    merchant_ok_url: merchantOkUrl,
    merchant_fail_url: merchantFailUrl,
    timeout_limit: "30",
    currency: currency,
    test_mode: testMode,
    lang: lang,
  });

  const response = await fetch(
    "https://www.paytr.com/odeme/api/get-token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    }
  );

  const result = (await response.json()) as {
    status: string;
    token?: string;
    reason?: string;
  };

  if (result.status !== "success" || !result.token) {
    throw new Error(
      `PayTR token alınamadı: ${result.reason ?? "Bilinmeyen hata"}`
    );
  }

  return result.token;
}

/**
 * Benzersiz sipariş numarası üretir.
 * Format: ORG-{timestamp}-{random}
 */
export function generateOrderId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORG-${timestamp}-${random}`;
}
