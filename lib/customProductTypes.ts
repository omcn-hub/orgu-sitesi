// ─────────────────────────────────────────────────────────────
// Custom Product Builder — Tip Tanımları & Sabitler
// Genişletilmiş v2: Taban, İp, Bilek, Desen, Aksesuar, Hediye
// ─────────────────────────────────────────────────────────────

/** Renk seçeneği */
export interface ColorOption {
  id: string;
  label: string;    // Türkçe isim (örn: "Krem Beyaz")
  hex: string;      // CSS renk kodu
}

/** Genel seçenek kartı (taban, ip, bilek, desen için) */
export interface ProductOption {
  id: string;
  label: string;
  description?: string;  // Alt açıklama
  surcharge: number;     // 0 veya pozitif ek ücret (₺)
  icon?: string;         // Emoji/ikon
}

/** Aksesuar seçeneği (çoklu seçim) */
export interface AccessoryOption {
  id: string;
  label: string;
  surcharge: number;
}

/** Kullanıcının wizard boyunca yaptığı tüm seçimleri tutan state */
export interface CustomProduct {
  productId: string;
  basePrice: number;

  // Adım 1 — Renk
  selectedColor: ColorOption | null;

  // Adım 2 — Numara
  selectedSize: number | null;

  // Adım 3 — Taban & İp Türü
  selectedSole: ProductOption | null;
  selectedYarn: ProductOption | null;

  // Adım 4 — Bilek Boyu & Örgü Deseni
  selectedAnkle: ProductOption | null;
  selectedPattern: ProductOption | null;

  // Adım 5 — Aksesuarlar & Hediye & İşleme
  selectedAccessories: string[];       // aksesuar id listesi
  hasGiftBox: boolean;
  extraDetails: {
    hasInscription: boolean;
    text: string;
    addedPrice: number;
  };

  totalPrice: number;
}

// ─────────────────────────────────────────────────────────────
// Sabitler — Renk Paleti
// ─────────────────────────────────────────────────────────────

/** El emeği örgüye uygun sıcak ton renk paleti */
export const COLOR_OPTIONS: ColorOption[] = [
  { id: 'krem',        label: 'Krem',          hex: '#F5F0E8' },
  { id: 'taba',        label: 'Taba',           hex: '#C4956A' },
  { id: 'terracotta',  label: 'Terracotta',     hex: '#C4704B' },
  { id: 'adacayi',     label: 'Adaçayı Yeşil', hex: '#8FA67A' },
  { id: 'koyu-yesil',  label: 'Koyu Yeşil',    hex: '#4A6741' },
  { id: 'mavi',        label: 'Bebe Mavisi',    hex: '#7BA7BC' },
  { id: 'lacivert',    label: 'Lacivert',       hex: '#2C3E6B' },
  { id: 'gul-kurusu',  label: 'Gül Kurusu',    hex: '#D4A5A5' },
  { id: 'bordo',       label: 'Bordo',          hex: '#6B2D3E' },
  { id: 'antrasit',    label: 'Antrasit',       hex: '#3A3A3A' },
];

// ─────────────────────────────────────────────────────────────
// Sabitler — Ayak Numarası
// ─────────────────────────────────────────────────────────────

export const SIZES: number[] = [36, 37, 38, 39, 40, 41, 42, 43, 44];
export const SIZE_SURCHARGE_THRESHOLD = 40;
export const SIZE_SURCHARGE_AMOUNT = 30;

// ─────────────────────────────────────────────────────────────
// Sabitler — Taban Türü
// ─────────────────────────────────────────────────────────────

export const SOLE_OPTIONS: ProductOption[] = [
  {
    id: 'standart',
    label: 'Standart Örgü Taban',
    description: 'Geleneksel el örgüsü taban',
    surcharge: 0,
    icon: '🧶',
  },
  {
    id: 'kece',
    label: 'Keçe Taban',
    description: 'Yumuşak ve sıcak tutan keçe',
    surcharge: 30,
    icon: '🪡',
  },
  {
    id: 'kaymaz',
    label: 'Kaymaz Taban',
    description: 'Güvenli yürüyüş için özel kaplama',
    surcharge: 50,
    icon: '🛡️',
  },
];

// ─────────────────────────────────────────────────────────────
// Sabitler — İp Türü
// ─────────────────────────────────────────────────────────────

export const YARN_OPTIONS: ProductOption[] = [
  {
    id: 'pamuk',
    label: 'Mevsimlik Pamuklu',
    description: 'Nefes alan, dört mevsim konfor',
    surcharge: 0,
    icon: '🌸',
  },
  {
    id: 'tuylenmeyen',
    label: 'Tüylenmeyen İp',
    description: 'Uzun ömürlü, dayanıklı doku',
    surcharge: 20,
    icon: '✨',
  },
  {
    id: 'sicak',
    label: 'Ekstra Sıcak Tutan',
    description: 'Kış için yün/akrilik karışımı',
    surcharge: 40,
    icon: '🔥',
  },
];

// ─────────────────────────────────────────────────────────────
// Sabitler — Bilek Boyu
// ─────────────────────────────────────────────────────────────

export const ANKLE_OPTIONS: ProductOption[] = [
  {
    id: 'babet',
    label: 'Babet Kesim',
    description: 'Topuğa kadar, minimal tasarım',
    surcharge: 0,
    icon: '🩴',
  },
  {
    id: 'bilekte',
    label: 'Bilekte',
    description: 'Bileği örten klasik boy',
    surcharge: 20,
    icon: '🧦',
  },
  {
    id: 'bot',
    label: 'Bot Tarzı',
    description: 'Baldıra uzanan, şık ve sıcak',
    surcharge: 60,
    icon: '👢',
  },
];

// ─────────────────────────────────────────────────────────────
// Sabitler — Örgü Deseni
// ─────────────────────────────────────────────────────────────

export const PATTERN_OPTIONS: ProductOption[] = [
  {
    id: 'duz',
    label: 'Düz Örgü',
    description: 'Sade, temiz ve modern',
    surcharge: 0,
    icon: '▬',
  },
  {
    id: 'selanik',
    label: 'Selanik',
    description: 'Geleneksel dokulu balıksırtı',
    surcharge: 20,
    icon: '◈',
  },
  {
    id: 'sac',
    label: 'Saç Örgüsü',
    description: 'El işçiliğinin zirvesi, örgülü desen',
    surcharge: 30,
    icon: '♾',
  },
];

// ─────────────────────────────────────────────────────────────
// Sabitler — Ekstra Aksesuarlar
// ─────────────────────────────────────────────────────────────

export const ACCESSORY_OPTIONS: AccessoryOption[] = [
  {
    id: 'deri-etiket',
    label: 'İsme Özel Deri Etiket',
    surcharge: 30,
  },
  {
    id: 'ahsap-dugme',
    label: 'Ahşap Düğme Detayı',
    surcharge: 15,
  },
];

// ─────────────────────────────────────────────────────────────
// Sabitler — Hediye Paketi
// ─────────────────────────────────────────────────────────────

export const GIFT_BOX_SURCHARGE = 40;

// ─────────────────────────────────────────────────────────────
// Sabitler — Kişiselleştirme (İşleme)
// ─────────────────────────────────────────────────────────────

export const INSCRIPTION_SURCHARGE = 50;

// ─────────────────────────────────────────────────────────────
// Boş başlangıç state'i
// ─────────────────────────────────────────────────────────────

export const INITIAL_STATE: CustomProduct = {
  productId: 'CUSTOM-CORAP',
  basePrice: 0,
  selectedColor: null,
  selectedSize: null,
  selectedSole: SOLE_OPTIONS[0],   // Varsayılan: Standart Örgü Taban
  selectedYarn: YARN_OPTIONS[0],   // Varsayılan: Mevsimlik Pamuklu
  selectedAnkle: ANKLE_OPTIONS[0], // Varsayılan: Babet Kesim
  selectedPattern: PATTERN_OPTIONS[0], // Varsayılan: Düz Örgü
  selectedAccessories: [],
  hasGiftBox: false,
  extraDetails: {
    hasInscription: false,
    text: '',
    addedPrice: 0,
  },
  totalPrice: 0,
};

// ─────────────────────────────────────────────────────────────
// Fiyat Hesaplama Yardımcısı
// ─────────────────────────────────────────────────────────────

export function calculateTotalPrice(product: CustomProduct): number {
  const sizeExtra =
    product.selectedSize && product.selectedSize >= SIZE_SURCHARGE_THRESHOLD
      ? SIZE_SURCHARGE_AMOUNT
      : 0;
  const soleExtra = product.selectedSole?.surcharge ?? 0;
  const yarnExtra = product.selectedYarn?.surcharge ?? 0;
  const ankleExtra = product.selectedAnkle?.surcharge ?? 0;
  const patternExtra = product.selectedPattern?.surcharge ?? 0;
  const accessoryExtra = product.selectedAccessories.reduce((sum, id) => {
    const acc = ACCESSORY_OPTIONS.find((a) => a.id === id);
    return sum + (acc?.surcharge ?? 0);
  }, 0);
  const giftExtra = product.hasGiftBox ? GIFT_BOX_SURCHARGE : 0;
  const inscExtra = product.extraDetails.hasInscription ? INSCRIPTION_SURCHARGE : 0;

  return (
    product.basePrice +
    sizeExtra +
    soleExtra +
    yarnExtra +
    ankleExtra +
    patternExtra +
    accessoryExtra +
    giftExtra +
    inscExtra
  );
}
