// ─────────────────────────────────────────────────────────────
// Custom Product Builder — Tip Tanımları & Sabitler
// ─────────────────────────────────────────────────────────────

/** Kullanıcının wizard boyunca yaptığı tüm seçimleri tutan state */
export interface CustomProduct {
  productId: string;
  basePrice: number;
  selectedColor: ColorOption | null;
  selectedSize: number | null;
  extraDetails: {
    hasInscription: boolean; // İsim/harf işlensin mi?
    text: string;            // İşlenecek metin
    addedPrice: number;      // Kişiselleştirme ücreti (50₺)
  };
  totalPrice: number;
}

/** Renk seçeneği */
export interface ColorOption {
  id: string;
  label: string;    // Türkçe isim (örn: "Krem Beyaz")
  hex: string;      // CSS renk kodu
}

// ─────────────────────────────────────────────────────────────
// Sabitler
// ─────────────────────────────────────────────────────────────

/** Ayak numara seçenekleri — 40 ve üzeri +30₺ ek ücret */
export const SIZES: number[] = [36, 37, 38, 39, 40, 41, 42, 43, 44];
export const SIZE_SURCHARGE_THRESHOLD = 40;
export const SIZE_SURCHARGE_AMOUNT = 30;

/** Kişiselleştirme (isim işleme) ek ücreti */
export const INSCRIPTION_SURCHARGE = 50;

/** Mevcut renk paleti — el emeği örgüye uygun sıcak tonlar */
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

/** Boş başlangıç state'i */
export const INITIAL_STATE: CustomProduct = {
  productId: 'CUSTOM-CORAP',
  basePrice: 0, // Sayfa açılırken dışarıdan prop ile gelecek
  selectedColor: null,
  selectedSize: null,
  extraDetails: {
    hasInscription: false,
    text: '',
    addedPrice: 0,
  },
  totalPrice: 0,
};
