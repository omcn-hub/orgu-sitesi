import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teslimat ve Kargo - ÖRGÜHOME',
  description: 'ÖRGÜHOME Teslimat ve Kargo süreçleri hakkında bilgilendirme.',
};

const DeliveryInformation = () => {
  return (
    <article className="legal-content">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Teslimat ve Kargo</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Gönderim Süreci</h2>
        <p>
          Siparişleriniz, ürünün stok durumuna ve hazırlık sürecine bağlı olarak genellikle 1-3 iş günü içerisinde kargoya teslim edilmektedir. Özel tasarım veya el örgüsü ürünlerimizde bu süre ürünün hazırlanma süresine bağlı olarak değişiklik gösterebilir.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Kargo Ücretleri</h2>
        <p>
          Kargo ücretleri, siparişinizin tutarına ve gönderim yapılacak bölgeye göre değişiklik gösterebilir. Belirli tutar üzerindeki siparişlerinizde kargo ücretsizdir. Güncel kargo bilgilerini ödeme sayfasında görebilirsiniz.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Teslimat Süresi</h2>
        <p>
          Kargoya verilen siparişler, kargo firmasının yoğunluğuna ve teslimat adresinin uzaklığına bağlı olarak 1-4 iş günü içerisinde adresinize ulaştırılır.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Hasarlı Teslimat</h2>
        <p>
          Kargonuzu teslim alırken paketi kontrol etmenizi rica ederiz. Eğer pakette bir hasar varsa, kargo görevlisine tutanak tutturarak ürünü teslim almamanız gerekmektedir. Hasarlı ürünlerle ilgili durumu en kısa sürede bize bildiriniz.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Takip</h2>
        <p>
          Siparişiniz kargoya verildiğinde, kayıtlı e-posta adresinize kargo takip numarası gönderilecektir. Bu numara ile kargonuzun durumunu ilgili kargo firmasının web sitesinden takip edebilirsiniz.
        </p>
      </section>

      <p className="mt-12 text-sm text-[var(--text-light-muted)]">Son Güncelleme: 14.05.2026</p>
    </article>
  );
};

export default DeliveryInformation;
