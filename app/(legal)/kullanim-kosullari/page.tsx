import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Koşulları - ÖRGÜHOME',
  description: 'ÖRGÜHOME Kullanım Koşulları ve kurallar.',
};

const TermsOfUse = () => {
  return (
    <article className="legal-content">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Kullanım Koşulları</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Giriş</h2>
        <p>
          Bu web sitesini kullanarak, aşağıda belirtilen kullanım koşullarını kabul etmiş sayılırsınız. Eğer bu koşulları kabul etmiyorsanız, lütfen siteyi kullanmayınız.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Fikri Mülkiyet Hakları</h2>
        <p>
          Sitede yer alan tüm içerik (metinler, görseller, tasarımlar, logolar vb.) ÖRGÜHOME'a aittir ve telif hakları ile korunmaktadır. Yazılı izin olmaksızın kopyalanamaz veya kullanılamaz.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Sorumluluk Reddi</h2>
        <p>
          Sitede yer alan bilgilerin doğruluğunu sağlamak için çaba gösteriyoruz ancak bu bilgilerin her zaman güncel veya hatasız olduğunu garanti edemeyiz. Site kullanımından doğabilecek dolaylı zararlardan ÖRGÜHOME sorumlu tutulamaz.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Değişiklikler</h2>
        <p>
          ÖRGÜHOME, bu kullanım koşullarını dilediği zaman önceden haber vermeksizin değiştirme hakkını saklı tutar. Değişiklikler sitede yayınlandığı andan itibaren geçerli olur.
        </p>
      </section>

      <p className="mt-12 text-sm text-[var(--text-light-muted)]">Son Güncelleme: 14.05.2026</p>
    </article>
  );
};

export default TermsOfUse;
