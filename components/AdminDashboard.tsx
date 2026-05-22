'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Truck, Scissors, CheckCircle2,
  ChevronDown, ChevronUp, Phone, Mail, Hash,
  Filter, BarChart3, AlertCircle, X, LogOut
} from 'lucide-react';
import { Order, OrderStatus, STATUS_META, CustomizationDetails } from '@/lib/orderTypes';

// ─────────────────────────────────────────────────────────────
// Filtre sekmeleri
// ─────────────────────────────────────────────────────────────
const TABS: { key: OrderStatus | 'all'; label: string; icon: string }[] = [
  { key: 'all',                label: 'Tümü',          icon: '📋' },
  { key: 'pending',            label: 'Bekleyenler',   icon: '⏳' },
  { key: 'in_production',      label: 'Örülenler',     icon: '🧶' },
  { key: 'ready_for_shipping', label: 'Hazır Olanlar', icon: '📦' },
  { key: 'shipped',            label: 'Kargolananlar', icon: '🚚' },
];

// ─────────────────────────────────────────────────────────────
// Hammadde Özeti
// ─────────────────────────────────────────────────────────────
function MaterialSummary({ orders }: { orders: Order[] }) {
  const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'in_production');

  const colorCounts = useMemo(() => {
    const map: Record<string, { count: number; hex: string }> = {};
    activeOrders.forEach(o => {
      const key = o.customization.color;
      if (!map[key]) map[key] = { count: 0, hex: o.customization.colorHex };
      map[key].count++;
    });
    return Object.entries(map).sort((a, b) => b[1].count - a[1].count);
  }, [activeOrders]);

  if (colorCounts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-[var(--border-light)] shadow-sm p-5 mb-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-[var(--accent-terracotta)]/10 rounded-xl">
          <BarChart3 className="w-5 h-5 text-[var(--accent-terracotta)]" />
        </div>
        <div>
          <h2 className="font-bold text-[var(--text-primary)] text-base">Hammadde Planlaması</h2>
          <p className="text-xs text-[var(--text-muted)]">Aktif siparişler için gereken iplik renkleri</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {colorCounts.map(([color, { count, hex }]) => (
          <div
            key={color}
            className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]"
          >
            <div
              className="w-8 h-8 rounded-full flex-shrink-0 border-2 border-white shadow-sm"
              style={{ backgroundColor: hex }}
            />
            <div>
              <p className="font-bold text-[var(--text-primary)] text-lg leading-none">{count}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{color}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700">
          <strong>{activeOrders.length} aktif sipariş</strong> için toplam hammadde hazırlayın.
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Kargo input modalı
// ─────────────────────────────────────────────────────────────
interface CargoModalProps {
  onConfirm: (trackingNo: string, company: string) => void;
  onClose: () => void;
}

function CargoModal({ onConfirm, onClose }: CargoModalProps) {
  const [trackingNo, setTrackingNo] = useState('');
  const [company, setCompany] = useState('Yurtiçi Kargo');

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative z-10 w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[var(--accent-terracotta)]" />
            <h3 className="font-bold text-[var(--text-primary)] text-lg">Kargo Bilgisi</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors">
            <X className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
              Kargo Firması
            </label>
            <select
              value={company}
              onChange={e => setCompany(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-medium)] bg-white text-[var(--text-primary)] text-base focus:outline-none focus:border-[var(--accent-terracotta)] transition-colors"
            >
              {['Yurtiçi Kargo', 'Aras Kargo', 'MNG Kargo', 'PTT Kargo', 'UPS', 'DHL'].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
              Takip Numarası
            </label>
            <input
              type="text"
              value={trackingNo}
              onChange={e => setTrackingNo(e.target.value)}
              placeholder="Örn: 1234567890"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-medium)] bg-white text-[var(--text-primary)] text-base focus:outline-none focus:border-[var(--accent-terracotta)] transition-colors"
            />
          </div>
        </div>

        <button
          onClick={() => { if (trackingNo.trim()) onConfirm(trackingNo.trim(), company); }}
          disabled={!trackingNo.trim()}
          className="w-full mt-6 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 disabled:opacity-40"
          style={{ background: trackingNo.trim() ? 'var(--accent-terracotta)' : undefined, backgroundColor: !trackingNo.trim() ? 'var(--border-medium)' : undefined }}
        >
          Kargoya Ver ✓
        </button>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Özelleştirme Detay Pill'leri
// ─────────────────────────────────────────────────────────────
function CustomizationBadges({ c }: { c: CustomizationDetails }) {
  return (
    <div className="flex flex-wrap gap-2 my-3">
      {/* Renk */}
      <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border border-[var(--border-medium)] bg-white">
        <span className="w-4 h-4 rounded-full inline-block border border-white/60 shadow-sm" style={{ backgroundColor: c.colorHex }} />
        {c.color}
      </span>
      {/* Numara */}
      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border border-[var(--border-medium)] bg-white text-[var(--text-primary)]">
        👣 {c.size} No
      </span>
      {/* İşleme */}
      {c.inscription && (
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold border border-purple-200 bg-purple-50 text-purple-700">
          ✏️ İşleme: &ldquo;{c.inscription}&rdquo;
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Aksiyon Butonları
// ─────────────────────────────────────────────────────────────
interface ActionButtonsProps {
  order: Order;
  onStatusChange: (id: string, status: OrderStatus, extra?: Partial<Order>) => void;
}

function ActionButtons({ order, onStatusChange }: ActionButtonsProps) {
  const [showCargo, setShowCargo] = useState(false);

  return (
    <>
      <div className="mt-4 space-y-2">
        {order.status === 'pending' && (
          <button
            onClick={() => onStatusChange(order.id, 'in_production')}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-base transition-all duration-200 active:scale-95"
            style={{ backgroundColor: '#8FA67A' }}
          >
            <Scissors className="w-5 h-5" />
            🧶 Örgüye Başla
          </button>
        )}

        {order.status === 'in_production' && (
          <button
            onClick={() => onStatusChange(order.id, 'ready_for_shipping')}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-base transition-all duration-200 active:scale-95"
            style={{ backgroundColor: '#5B7FA6' }}
          >
            <Package className="w-5 h-5" />
            📦 Örgü Bitti / Paketleniyor
          </button>
        )}

        {order.status === 'ready_for_shipping' && (
          <button
            onClick={() => setShowCargo(true)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-base transition-all duration-200 active:scale-95"
            style={{ backgroundColor: 'var(--accent-terracotta)' }}
          >
            <Truck className="w-5 h-5" />
            🚚 Kargoya Ver
          </button>
        )}

        {order.status === 'shipped' && (
          <div className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-base bg-[var(--text-muted)]">
            <CheckCircle2 className="w-5 h-5" />
            ✅ Teslim Edildi
          </div>
        )}
      </div>

      <AnimatePresence>
        {showCargo && (
          <CargoModal
            onClose={() => setShowCargo(false)}
            onConfirm={(trackingNo, company) => {
              onStatusChange(order.id, 'shipped', {
                cargoTrackingNumber: trackingNo,
                cargoCompany: company,
              });
              setShowCargo(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Sipariş Kartı
// ─────────────────────────────────────────────────────────────
interface OrderCardProps {
  order: Order;
  onStatusChange: (id: string, status: OrderStatus, extra?: Partial<Order>) => void;
}

function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);
  const meta = STATUS_META[order.status];

  const orderDate = new Date(order.orderDate);
  const dateStr = orderDate.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeStr = orderDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="bg-white rounded-2xl border border-[var(--border-light)] shadow-sm overflow-hidden"
    >
      {/* Durum şeridi */}
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: meta.color }}
      />

      <div className="p-5">
        {/* Üst satır — Durum + Tarih */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold"
            style={{ color: meta.color, backgroundColor: meta.bg }}
          >
            <span>{meta.icon}</span>
            {meta.label}
          </span>
          <div className="text-right flex-shrink-0">
            <p className="text-xs font-semibold text-[var(--text-secondary)]">{dateStr}</p>
            <p className="text-xs text-[var(--text-muted)]">{timeStr}</p>
          </div>
        </div>

        {/* 🔑 Özelleştirme — En büyük, en belirgin alan */}
        <div className="py-3 px-4 rounded-2xl mb-2" style={{ backgroundColor: meta.bg }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: meta.color }}>
            Sipariş Detayı
          </p>
          <CustomizationBadges c={order.customization} />
          {order.customization.inscription && (
            <p className="text-2xl font-bold mt-1" style={{ color: meta.color }}>
              ✏️ &ldquo;{order.customization.inscription}&rdquo;
            </p>
          )}
        </div>

        {/* Müşteri adı + fiyat */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-lg font-bold text-[var(--text-primary)]">{order.customerName}</p>
            <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
              <Hash className="w-3 h-3" />
              {order.paytrOrderId}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold" style={{ color: meta.color }}>
              {order.totalPrice}₺
            </p>
          </div>
        </div>

        {/* Kargo takip bilgisi (eğer kargodaysa) */}
        {order.status === 'shipped' && order.cargoTrackingNumber && (
          <div className="mt-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)] flex items-center gap-2">
            <Truck className="w-4 h-4 text-[var(--text-secondary)]" />
            <div>
              <p className="text-xs font-semibold text-[var(--text-secondary)]">{order.cargoCompany}</p>
              <p className="text-sm font-bold text-[var(--text-primary)]">{order.cargoTrackingNumber}</p>
            </div>
          </div>
        )}

        {/* Aksiyon Butonları */}
        <ActionButtons order={order} onStatusChange={onStatusChange} />

        {/* Detay aç/kapat */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="w-full mt-3 flex items-center justify-center gap-1 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          {expanded ? <><ChevronUp className="w-4 h-4" /> Gizle</> : <><ChevronDown className="w-4 h-4" /> Müşteri Detayları</>}
        </button>

        {/* Genişleyen alan — müşteri iletişim */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="border-t border-[var(--border-light)] pt-4 mt-2 space-y-2">
                <a
                  href={`tel:${order.customerPhone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--border-light)] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[var(--accent-sage)]" />
                  <span className="font-semibold text-[var(--text-primary)]">{order.customerPhone}</span>
                </a>
                <a
                  href={`mailto:${order.customerEmail}`}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--border-light)] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[var(--accent-terracotta)]" />
                  <span className="font-semibold text-[var(--text-primary)] text-sm truncate">{order.customerEmail}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Ana Admin Panel Bileşeni
// ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all');
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        setError(data.error || 'Siparişler yüklenirken bir hata oluştu.');
      }
    } catch (err) {
      setError('Ağ bağlantı hatası oluştu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  const handleStatusChange = async (id: string, status: OrderStatus, extra: Partial<Order> = {}) => {
    try {
      // Optimistic update
      setOrders(prev =>
        prev.map(o => o.id === id ? { ...o, status, ...extra } : o)
      );

      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          status,
          cargoTrackingNumber: extra.cargoTrackingNumber,
          cargoCompany: extra.cargoCompany
        })
      });
      const data = await res.json();
      if (!data.success) {
        fetchOrders();
        alert('Hata: ' + (data.error || 'Sipariş güncellenemedi.'));
      }
    } catch (err) {
      fetchOrders();
      alert('Sipariş güncellenirken ağ hatası oluştu.');
      console.error(err);
    }
  };

  const filteredOrders = useMemo(() =>
    activeTab === 'all' ? orders : orders.filter(o => o.status === activeTab),
    [orders, activeTab]
  );

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { all: orders.length };
    orders.forEach(o => { counts[o.status] = (counts[o.status] || 0) + 1; });
    return counts;
  }, [orders]);

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      {/* ── Sabit Header ─────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white border-b border-[var(--border-light)] shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
                🧶 Sipariş Paneli
              </h1>
              <p className="text-xs text-[var(--text-muted)]">{orders.length} sipariş</p>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 ml-4 px-3 py-2 rounded-xl text-sm font-semibold text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 transition-all duration-200 disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{loggingOut ? 'Çıkılıyor...' : 'Çıkış'}</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-sm text-[var(--text-secondary)]">
              {activeTab === 'all' ? 'Tümü' : STATUS_META[activeTab as OrderStatus].label}
            </span>
          </div>
        </div>

        {/* ── Filtre Sekmeleri ── */}
        <div className="max-w-2xl mx-auto px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {TABS.map(tab => {
              const count = tabCounts[tab.key] || 0;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--accent-terracotta)] text-white shadow-sm'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border-light)]'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {count > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[var(--border-medium)] text-[var(--text-secondary)]'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Ana İçerik ───────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 py-5">
        {/* Yükleniyor Durumu */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-[var(--accent-terracotta)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[var(--text-muted)]">Siparişler yükleniyor...</p>
          </div>
        )}

        {/* Hata Durumu */}
        {!loading && error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center my-6">
            <p className="text-rose-700 font-semibold mb-2">{error}</p>
            <button
              onClick={fetchOrders}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl text-xs transition-all"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {/* Hammadde Özeti — sadece tümü veya aktif sekmelerde göster */}
        {!loading && !error && orders.length > 0 && (activeTab === 'all' || activeTab === 'pending' || activeTab === 'in_production') && (
          <MaterialSummary orders={orders} />
        )}

        {/* Sipariş Listesi */}
        {!loading && !error && (
          orders.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[var(--border-light)] p-8 shadow-sm text-center">
              <div className="text-5xl mb-4">🧶</div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">Henüz Sipariş Yok!</h2>
              <p className="text-sm text-[var(--text-muted)] mb-6 max-w-sm mx-auto">
                Supabase veritabanınız başarıyla bağlandı. Sipariş panelini test etmek için aşağıdaki adımları takip edebilirsiniz:
              </p>
              
              <div className="text-left space-y-4 max-w-md mx-auto bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-light)] text-sm text-[var(--text-secondary)]">
                <p className="font-bold text-[var(--text-primary)] mb-2">🧪 Test Adımları:</p>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-terracotta)]/10 text-[var(--accent-terracotta)] flex-shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">1</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">Özel Ürün Tasarlayın</p>
                    <p className="text-xs text-[var(--text-muted)]">Yeni bir sekmede <Link href="/custom-builder" className="text-[var(--accent-terracotta)] underline hover:text-[var(--accent-terracotta)]/80">Kendi Ürününü Tasarla</Link> sayfasına gidin, seçeneklerinizi belirleyip "Sepete Ekle" deyin.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-terracotta)]/10 text-[var(--accent-terracotta)] flex-shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">2</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">Test Ödemesi Yapın</p>
                    <p className="text-xs text-[var(--text-muted)]">Sepette "Ödeme Yap" diyerek PayTR ekranını açın. Test kartı bilgileriyle (Kart No: <code className="bg-white px-1 py-0.5 rounded border font-mono">4111 1111 1111 1111</code>) ödeme yapın.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-terracotta)]/10 text-[var(--accent-terracotta)] flex-shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">3</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">Siparişi Burada Görün</p>
                    <p className="text-xs text-[var(--text-muted)]">Ödeme tamamlandığında bu sayfaya geri dönün. Sipariş anında veritabanından çekilip burada listelenecektir.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent-terracotta)]/10 text-[var(--accent-terracotta)] flex-shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">4</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">Süreçleri Yönetin</p>
                    <p className="text-xs text-[var(--text-muted)]">Sipariş kartındaki "Örgüye Başla", "Paketlendi" ve "Kargoya Ver" butonlarına tıklayarak durum güncellemelerini test edin.</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={fetchOrders}
                className="mt-6 px-6 py-2.5 bg-[var(--accent-terracotta)] hover:bg-[var(--accent-terracotta)]/90 text-white font-semibold rounded-xl text-sm transition-all shadow-sm"
              >
                🔄 Siparişleri Yenile
              </button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-xl font-bold text-[var(--text-primary)]">Bu grupta sipariş yok</p>
              <p className="text-[var(--text-muted)] mt-1">Seçtiğiniz filtreye uygun sipariş bulunmuyor.</p>
            </div>
          ) : (
            <motion.div layout className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredOrders.map(order => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
