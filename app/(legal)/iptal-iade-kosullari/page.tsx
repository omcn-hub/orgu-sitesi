import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İptal ve İade Koşulları - ÖRGÜHOME',
  description: 'ÖRGÜHOME İptal ve İade Politikası detayları.',
};

const RefundPolicy = () => {
  return (
    <article className="legal-content">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">İptal ve İade Koşulları</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">İade Hakkı</h2>
        <p>
          Almış olduğunuz ürünleri, teslimat tarihinden itibaren 14 gün içerisinde iade edebilirsiniz. İade edilecek ürünlerin orijinal ambalajında, kullanılmamış ve satılabilirlik özelliğini yitirmemiş olması gerekmektedir.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">İade Süreci</h2>
        <ol className="list-decimal pl-6 space-y-3">
          <li>İade talebinizi <strong>omeratalamiscan321@gmail.com</strong> adresine e-posta göndererek veya <strong>+90 551 077 41 12</strong> numaralı telefondan bize ulaşarak iletebilirsiniz.</li>
          <li>Onaylanan iade talepleriniz için ürünü anlaşmalı olduğumuz kargo firması ile tarafımıza göndermeniz gerekmektedir.</li>
          <li>Ürün tarafımıza ulaştıktan sonra incelenecek ve iade şartlarına uygunluğu kontrol edilecektir.</li>
          <li>İadesi onaylanan ürünlerin ücreti, 7 iş günü içerisinde ödeme yaptığınız yöntemle (kartınıza veya hesabınıza) iade edilecektir.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">İptal Şartları</h2>
        <p>
          Siparişiniz kargoya verilmeden önce iptal talebinde bulunabilirsiniz. Kargoya verilmiş siparişlerde iade süreci geçerli olacaktır. Özel tasarım veya kişiye özel üretilen ürünlerde, üretim süreci başladıktan sonra iptal/iade kabul edilememektedir.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Değişim</h2>
        <p>
          Ürün değişimi yapmak isterseniz, iade sürecini takip ederek ürünü iade edebilir ve yeni bir sipariş oluşturabilirsiniz.
        </p>
      </section>

      <p className="mt-12 text-sm text-[var(--text-light-muted)]">Son Güncelleme: 14.05.2026</p>
    </article>
  );
};

export default RefundPolicy;
