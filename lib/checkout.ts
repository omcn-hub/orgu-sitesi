// ─────────────────────────────────────────────────────────────
// Ödeme — Ortak tipler ve sunucu tarafı fiyat hesabı
// İstemciden yalnızca ürün kimliği, adet ve seçenek id'leri gelir.
// Fiyat her zaman buradaki katalog ve seçenek listelerinden hesaplanır.
// ─────────────────────────────────────────────────────────────

import { CATALOG_PRODUCTS } from './catalog';
import {
  CustomSelection,
  CUSTOM_PRODUCT,
  COLOR_OPTIONS,
  SIZES,
  SOLE_OPTIONS,
  YARN_OPTIONS,
  ANKLE_OPTIONS,
  PATTERN_OPTIONS,
  ACCESSORY_OPTIONS,
  INSCRIPTION_MAX_LENGTH,
  INITIAL_STATE,
  calculateTotalPrice,
} from './customProductTypes';

export interface CheckoutItem {
  productId: string;
  quantity: number;
  customSelection?: CustomSelection;
}

export interface CheckoutCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const MAX_QUANTITY = 20;

/** Sunucunun fiyatladığı sepet satırı */
export interface PricedLine {
  productId: string;
  name: string;
  unitPrice: number;   // TL
  quantity: number;
  custom?: {
    colorLabel: string;
    colorHex: string;
    size: number;
    sole: string;
    yarn: string;
    ankle: string;
    pattern: string;
    accessories: string[];
    giftBox: boolean;
    inscription: string;
  };
}

export class CheckoutError extends Error {}

function findOption<T extends { id: string }>(list: T[], id: string, what: string): T {
  const found = list.find((o) => o.id === id);
  if (!found) throw new CheckoutError(`Geçersiz seçim: ${what}.`);
  return found;
}

function priceCustom(sel: CustomSelection): PricedLine['custom'] & { unitPrice: number } {
  const color = findOption(COLOR_OPTIONS, sel.colorId, 'renk');
  if (!SIZES.includes(sel.size)) throw new CheckoutError('Geçersiz seçim: numara.');
  const sole = findOption(SOLE_OPTIONS, sel.soleId, 'taban');
  const yarn = findOption(YARN_OPTIONS, sel.yarnId, 'ip');
  const ankle = findOption(ANKLE_OPTIONS, sel.ankleId, 'bilek boyu');
  const pattern = findOption(PATTERN_OPTIONS, sel.patternId, 'desen');
  const accessoryIds = Array.isArray(sel.accessoryIds) ? [...new Set(sel.accessoryIds)] : [];
  const accessories = accessoryIds.map((id) => findOption(ACCESSORY_OPTIONS, id, 'aksesuar'));
  const inscription = String(sel.inscription ?? '').trim();
  if (inscription.length > INSCRIPTION_MAX_LENGTH) throw new CheckoutError('İşleme metni çok uzun.');

  const unitPrice = calculateTotalPrice({
    ...INITIAL_STATE,
    productId: CUSTOM_PRODUCT.id,
    basePrice: CUSTOM_PRODUCT.basePrice,
    selectedColor: color,
    selectedSize: sel.size,
    selectedSole: sole,
    selectedYarn: yarn,
    selectedAnkle: ankle,
    selectedPattern: pattern,
    selectedAccessories: accessoryIds,
    hasGiftBox: sel.giftBox === true,
    extraDetails: { hasInscription: inscription !== '', text: inscription, addedPrice: 0 },
  });

  return {
    unitPrice,
    colorLabel: color.label,
    colorHex: color.hex,
    size: sel.size,
    sole: sole.label,
    yarn: yarn.label,
    ankle: ankle.label,
    pattern: pattern.label,
    accessories: accessories.map((a) => a.label),
    giftBox: sel.giftBox === true,
    inscription,
  };
}

/** Sepeti sunucu tarafında fiyatlar. Geçersiz girdide CheckoutError fırlatır. */
export function priceItems(items: unknown): PricedLine[] {
  if (!Array.isArray(items) || items.length === 0) throw new CheckoutError('Sepet boş.');
  if (items.length > 50) throw new CheckoutError('Sepette çok fazla ürün var.');

  return items.map((raw: CheckoutItem) => {
    const quantity = Number(raw?.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
      throw new CheckoutError('Geçersiz adet.');
    }

    if (raw.productId === CUSTOM_PRODUCT.id) {
      if (!raw.customSelection) {
        throw new CheckoutError('Özel tasarım ürün bilgisi eksik. Lütfen ürünü sepetten çıkarıp yeniden ekleyin.');
      }
      const { unitPrice, ...custom } = priceCustom(raw.customSelection);
      return { productId: CUSTOM_PRODUCT.id, name: CUSTOM_PRODUCT.name, unitPrice, quantity, custom };
    }

    const product = CATALOG_PRODUCTS.find((p) => p.productId === raw.productId);
    if (!product) throw new CheckoutError('Sepette artık satılmayan bir ürün var.');
    return { productId: product.productId, name: product.name, unitPrice: product.price, quantity };
  });
}

/** Müşteri bilgilerini temizler ve doğrular. */
export function validateCustomer(raw: unknown): CheckoutCustomer {
  const c = (raw ?? {}) as Partial<CheckoutCustomer>;
  const name = String(c.name ?? '').trim().slice(0, 100);
  const email = String(c.email ?? '').trim().toLowerCase().slice(0, 150);
  const phone = String(c.phone ?? '').replace(/\D/g, '');
  const address = String(c.address ?? '').trim().slice(0, 400);

  if (name.length < 3) throw new CheckoutError('Lütfen ad soyad girin.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new CheckoutError('Lütfen geçerli bir e-posta girin.');
  if (phone.length < 10 || phone.length > 12) throw new CheckoutError('Lütfen geçerli bir telefon numarası girin.');
  if (address.length < 10) throw new CheckoutError('Lütfen teslimat adresini eksiksiz girin.');

  return { name, email, phone, address };
}
