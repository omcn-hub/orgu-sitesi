import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mesafeli Satış Sözleşmesi - ÖRGÜHOME',
  description: 'ÖRGÜHOME Mesafeli Satış Sözleşmesi detayları.',
};

const DistanceSalesAgreement = () => {
  return (
    <article className="legal-content">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Mesafeli Satış Sözleşmesi</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. TARAFLAR</h2>
        <p>İşbu Sözleşme aşağıdaki taraflar arasında aşağıda belirtilen hüküm ve şartlar çerçevesinde imzalanmıştır.</p>
        <div className="mt-4 space-y-2">
          <p><strong>ALICI:</strong> (Bundan sonra "ALICI" olarak anılacaktır)</p>
          <p>Ad Soyad / Unvan: [ALICI ADI]</p>
          <p>Adres: [ALICI ADRESİ]</p>
          <hr className="my-2 border-white/10" />
          <p><strong>SATICI:</strong> (Bundan sonra "SATICI" olarak anılacaktır)</p>
          <p>Ad Soyad / Unvan: Ömer Can Atalamış - ÖRGÜHOME</p>
          <p>Adres: Gaziantep, Türkiye</p>
          <p>Telefon: +90 551 077 41 12</p>
          <p>E-posta: omeratalamiscan321@gmail.com</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">2. KONU</h2>
        <p>
          İşbu Sözleşme'nin konusu, ALICI'nın SATICI'ya ait www.orguhome.com internet sitesinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. SÖZLEŞME KONUSU ÜRÜN BİLGİLERİ</h2>
        <p>
          Malın /Ürünün /Hizmetin türü, miktarı, marka/modeli, rengi, adedi, satış bedeli, ödeme şekli, siparişin sonlandığı andaki bilgilerden oluşmaktadır.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">4. GENEL HÜKÜMLER</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>ALICI, SATICI'ya ait internet sitesinde sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup, bilgi sahibi olduğunu, elektronik ortamda gerekli teyidi verdiğini kabul, beyan ve taahhüt eder.</li>
          <li>Sözleşme konusu her bir ürün, 30 günlük yasal süreyi aşmamak kaydı ile ALICI'nın yerleşim yeri uzaklığına bağlı olarak internet sitesindeki ön bilgiler kısmında belirtilen süre zarfında ALICI veya ALICI'nın gösterdiği adresteki kişi ve/veya kuruluşa teslim edilir.</li>
          <li>SATICI, sözleşme konusu ürünü eksiksiz, siparişte belirtilen niteliklere uygun ve varsa garanti belgeleri, kullanım kılavuzları işin gereği olan bilgi ve belgeler ile teslim etmeyi, her türlü kusurdan arî olarak yasal mevzuat gereklerine göre sağlam, standartlara uygun bir şekilde işi tekemmül ettirmeyi kabul, beyan ve taahhüt eder.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">5. CAYMA HAKKI</h2>
        <p>
          ALICI; mal satışına ilişkin mesafeli sözleşmelerde, ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa teslim tarihinden itibaren 14 (on dört) gün içerisinde, SATICI'ya bildirmek şartıyla hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkını kullanabilir.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">6. YETKİLİ MAHKEME</h2>
        <p>
          İşbu sözleşmeden doğan uyuşmazlıklarda şikayet ve itirazlar, aşağıdaki kanunda belirtilen parasal sınırlar dahilinde tüketicinin yerleşim yerinin bulunduğu veya tüketici işleminin yapıldığı yerdeki tüketici sorunları hakem heyetine veya tüketici mahkemesine yapılacaktır.
        </p>
      </section>

      <p className="mt-12 text-sm text-[var(--text-light-muted)]">Son Güncelleme: 14.05.2026</p>
    </article>
  );
};

export default DistanceSalesAgreement;
