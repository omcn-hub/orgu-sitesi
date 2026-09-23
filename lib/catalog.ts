// ─────────────────────────────────────────────────────────────
// Mağaza Kataloğu — Hazır ürünler
// Fiyatlar TL. Sunucu ödeme tutarını buradan hesaplar.
// ─────────────────────────────────────────────────────────────

export interface CatalogProduct {
  productId: string;
  name: string;
  price: number;
  image: string;
  hoverImage: string;
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    name: 'Gri Kristal Taşlı & Peluş Ponponlu Patik',
    price: 500,
    image: '/images/gri-patik-3.webp',
    hoverImage: '/images/gri-patik-4.webp',
    productId: 'gri-kristal-tasli-patik',
  },
  {
    name: 'Özel Tasarım İncili ve Tüylü Beyaz Gelin Patiği',
    price: 500,
    image: '/images/beyaz-patik-1.jpg',
    hoverImage: '/images/beyaz-patik-2.jpg',
    productId: 'beyaz-gelin-patigi',
  },
  {
    name: 'Konfor Serisi: Mavi El Örgüsü Kışlık Ev Botu',
    price: 500,
    image: '/images/mavi-patik3.webp',
    hoverImage: '/images/mavi-patik2.webp',
    productId: 'mavi-kislik-ev-botu',
  },
  {
    name: 'El Örgüsü Çiçek Detaylı Kadın Ev Patiği — Pudra Pembe',
    price: 500,
    image: '/images/pembe-patik2.webp',
    hoverImage: '/images/pembe-patik3.webp',
    productId: 'pembe-cicekli-patik',
  },
  {
    name: 'El Örgüsü Kadife Mary Jane Ev Ayakkabısı — Tarçın',
    price: 500,
    image: '/images/kahverengi-patik.webp',
    hoverImage: '/images/kahverengi-patik2.webp',
    productId: 'tarcin-mary-jane',
  },
  {
    name: 'Bulutların Üzerinde Yürümeye Hazır mısın? ☁️',
    price: 500,
    image: '/images/patik2.webp',
    hoverImage: '/images/patik.webp',
    productId: 'bulut-patik',
  },
  {
    name: 'Zarif Dokunuş: El Örgüsü İncili Çiçekli Kadın Patik - Nar Çiçeği Kırmızısı',
    price: 500,
    image: '/images/kırmızı-patik.webp',
    hoverImage: '/images/kırmızı-patik3.webp',
    productId: 'kirmizi-incili-patik',
  },
];
