// ─────────────────────────────────────────────────────────────
// Admin Panel — Sipariş Tipleri ve Demo Verileri
// ─────────────────────────────────────────────────────────────

export type OrderStatus = 'pending' | 'in_production' | 'ready_for_shipping' | 'shipped';

export interface CustomizationDetails {
  color: string;       // Örn: "Gül Kurusu"
  colorHex: string;    // Örn: "#D4A5A5"
  size: number;        // Örn: 38
  inscription: string; // Boşsa işleme yok
}

export interface Order {
  id: string;
  paytrOrderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderDate: string;          // ISO tarih string
  customization: CustomizationDetails;
  totalPrice: number;
  status: OrderStatus;
  cargoTrackingNumber?: string;
  cargoCompany?: string;
  notes?: string;
}

// ─── Durum etiketleri ve renkleri ─────────────────────────────
export const STATUS_META: Record<OrderStatus, { label: string; color: string; bg: string; icon: string }> = {
  pending:             { label: 'Bekliyor',         color: '#A85A38', bg: '#FDF0E8', icon: '⏳' },
  in_production:       { label: 'Örülüyor',         color: '#7A9166', bg: '#EEF4EC', icon: '🧶' },
  ready_for_shipping:  { label: 'Paketlendi',        color: '#5B7FA6', bg: '#EAF1FB', icon: '📦' },
  shipped:             { label: 'Kargoda',           color: '#6B5E54', bg: '#F0EBE3', icon: '🚚' },
};

// ─── Demo sipariş verisi ───────────────────────────────────────
export const DEMO_ORDERS: Order[] = [
  {
    id: 'ord-001',
    paytrOrderId: 'PTR-20240001',
    customerName: 'Ayşe Kaya',
    customerEmail: 'ayse@example.com',
    customerPhone: '0532 111 2233',
    orderDate: '2025-05-17T09:30:00Z',
    customization: { color: 'Gül Kurusu', colorHex: '#E8B4B8', size: 37, inscription: 'A&K' },
    totalPrice: 330,
    status: 'pending',
  },
  {
    id: 'ord-002',
    paytrOrderId: 'PTR-20240002',
    customerName: 'Fatma Demir',
    customerEmail: 'fatma@example.com',
    customerPhone: '0542 222 3344',
    orderDate: '2025-05-17T11:00:00Z',
    customization: { color: 'Terracotta', colorHex: '#C4704B', size: 39, inscription: '' },
    totalPrice: 280,
    status: 'in_production',
  },
  {
    id: 'ord-003',
    paytrOrderId: 'PTR-20240003',
    customerName: 'Elif Yıldız',
    customerEmail: 'elif@example.com',
    customerPhone: '0555 333 4455',
    orderDate: '2025-05-16T14:15:00Z',
    customization: { color: 'Krem', colorHex: '#F5F0E8', size: 40, inscription: 'E' },
    totalPrice: 360,
    status: 'ready_for_shipping',
  },
  {
    id: 'ord-004',
    paytrOrderId: 'PTR-20240004',
    customerName: 'Zeynep Şahin',
    customerEmail: 'zeynep@example.com',
    customerPhone: '0533 444 5566',
    orderDate: '2025-05-15T16:45:00Z',
    customization: { color: 'Lacivert', colorHex: '#2C3E6B', size: 38, inscription: '' },
    totalPrice: 280,
    status: 'shipped',
    cargoTrackingNumber: '1234567890',
    cargoCompany: 'Yurtiçi Kargo',
  },
  {
    id: 'ord-005',
    paytrOrderId: 'PTR-20240005',
    customerName: 'Merve Arslan',
    customerEmail: 'merve@example.com',
    customerPhone: '0545 555 6677',
    orderDate: '2025-05-18T08:00:00Z',
    customization: { color: 'Adaçayı Yeşili', colorHex: '#8FA67A', size: 41, inscription: 'Merve' },
    totalPrice: 360,
    status: 'pending',
  },
  {
    id: 'ord-006',
    paytrOrderId: 'PTR-20240006',
    customerName: 'Hande Çelik',
    customerEmail: 'hande@example.com',
    customerPhone: '0544 666 7788',
    orderDate: '2025-05-18T10:30:00Z',
    customization: { color: 'Bordo', colorHex: '#6B2D3E', size: 36, inscription: '' },
    totalPrice: 280,
    status: 'in_production',
  },
];
