import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası - ÖRGÜHOME',
  description: 'ÖRGÜHOME Gizlilik Politikası ve veri güvenliği.',
};

const PrivacyPolicy = () => {
  return (
    <article className="legal-content">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Gizlilik Politikası</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Veri Toplama</h2>
        <p>
          ÖRGÜHOME olarak kişisel verilerinizin güvenliğine önem veriyoruz. Sitemizi ziyaret ettiğinizde veya alışveriş yaptığınızda topladığımız bilgiler, size daha iyi hizmet verebilmek ve siparişlerinizi yönetebilmek amacıyla kullanılmaktadır.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Hangi Bilgileri Topluyoruz?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Ad, soyad ve iletişim bilgileri (telefon, e-posta, adres).</li>
          <li>Sipariş detayları ve ödeme bilgileri (ödeme işlemleri güvenli ödeme sistemleri üzerinden gerçekleştirilir, kart bilgileriniz tarafımızca saklanmaz).</li>
          <li>Site kullanım verileri ve çerezler.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Verilerin Kullanımı</h2>
        <p>
          Toplanan veriler; siparişlerinizin teslimatı, kampanya bilgilendirmeleri (onayınız dahilinde) ve müşteri desteği hizmetleri için kullanılır. Bilgileriniz, yasal zorunluluklar dışında üçüncü şahıslarla paylaşılmaz.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Güvenlik</h2>
        <p>
          Kişisel verileriniz, yetkisiz erişime karşı modern güvenlik önlemleri ve SSL sertifikaları ile korunmaktadır.
        </p>
      </section>

      <p className="mt-12 text-sm text-[var(--text-light-muted)]">Son Güncelleme: 14.05.2026</p>
    </article>
  );
};

export default PrivacyPolicy;
