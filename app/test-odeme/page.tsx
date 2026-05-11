
import { generatePayTRToken, generateOrderId } from "@/lib/paytr";

export default async function TestOdemePage() {
  // Bu değerler normalde env'den gelecek
  const merchantId = process.env.PAYTR_MERCHANT_ID!;
  const merchantKey = process.env.PAYTR_MERCHANT_KEY!;
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT!;

  const orderId = generateOrderId();
  
  try {
    const token = await generatePayTRToken({
      merchantId,
      merchantKey,
      merchantSalt,
      merchantOid: orderId,
      email: "test@example.com",
      paymentAmount: 100, // 1.00 TL (kuruş cinsinden)
      userBasket: [
        { name: "Test Ürünü", price: "100", quantity: 1 }
      ],
      userIp: "127.0.0.1", // Test için sabit kalsın
      userName: "Test Kullanıcı",
      userAddress: "Test Adresi",
      userPhone: "05555555555",
      merchantOkUrl: "https://www.orguhome.com.tr/",
      merchantFailUrl: "https://www.orguhome.com.tr/",
      testMode: "1", // TEST MODU AÇIK
      debugOn: "1"
    });

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">PayTR Test Ödeme Sayfası</h1>
        <div className="w-full max-w-4xl border rounded-lg overflow-hidden shadow-lg bg-white">
          <iframe 
            src={`https://www.paytr.com/odeme/guvenli/${token}`} 
            id="paytriframe" 
            className="w-full h-[600px] border-none"
          ></iframe>
        </div>
        <p className="mt-4 text-gray-500 text-sm">Bu sayfa sadece entegrasyon testi içindir.</p>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="p-8 text-red-500">
        <h1 className="text-xl font-bold">Hata Oluştu</h1>
        <p>{error.message}</p>
        <p className="mt-2 text-sm">Lütfen Environment Variables (ID, KEY, SALT) ayarlarınızı kontrol edin.</p>
      </div>
    );
  }
}
