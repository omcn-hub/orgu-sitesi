// ─────────────────────────────────────────────────────────────
// Admin Panel — Sipariş Tipleri (Genişletilmiş v2)
// ─────────────────────────────────────────────────────────────

export type OrderStatus = 'pending' | 'in_production' | 'ready_for_shipping' | 'shipped';
export type PaymentStatus = 'awaiting' | 'paid' | 'failed' | null;

export interface CustomizationDetails {
  // Temel
  color: string;         // Örn: "Gül Kurusu"
  colorHex: string;      // Örn: "#D4A5A5"
  size: number;          // Örn: 38

  // Yeni — Taban & İp
  soleType: string;      // Örn: "Kaymaz Taban"
  yarnType: string;      // Örn: "Ekstra Sıcak Tutan"

  // Yeni — Bilek & Desen
  ankleHeight: string;   // Örn: "Bot Tarzı"
  knitPattern: string;   // Örn: "Saç Örgüsü"

  // Yeni — Aksesuarlar & Hediye
  accessories: string[]; // Örn: ["İsme Özel Deri Etiket"]
  giftBox: boolean;      // Hediye kutusu

  // Kişiselleştirme
  inscription: string;   // Boşsa işleme yok
}

export interface Order {
  id: string;
  paytrOrderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  orderDate: string;            // ISO tarih string
  productId: string;
  productName: string;
  quantity: number;
  customization: CustomizationDetails;
  totalPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  cargoTrackingNumber?: string;
  cargoCompany?: string;
  notes?: string;
}

// ─── Durum etiketleri ve renkleri ─────────────────────────────
export const STATUS_META: Record<OrderStatus, { label: string; color: string; bg: string; icon: string }> = {
  pending:             { label: 'Bekliyor',    color: '#A85A38', bg: '#FDF0E8', icon: '⏳' },
  in_production:       { label: 'Örülüyor',    color: '#7A9166', bg: '#EEF4EC', icon: '🧶' },
  ready_for_shipping:  { label: 'Paketlendi',  color: '#5B7FA6', bg: '#EAF1FB', icon: '📦' },
  shipped:             { label: 'Kargoda',     color: '#6B5E54', bg: '#F0EBE3', icon: '🚚' },
};
