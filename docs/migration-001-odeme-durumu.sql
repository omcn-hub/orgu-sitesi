-- ─────────────────────────────────────────────────────────────
-- Migration 001 — Ödeme durumu, teslimat adresi, çoklu ürün
-- Supabase Dashboard > SQL Editor'da, yeni kod canlıya çıkmadan ÖNCE çalıştırın.
-- ─────────────────────────────────────────────────────────────

-- Ödeme durumu: awaiting (ödeme bekleniyor) · paid (ödendi) · failed (başarısız)
-- Eski kayıtlar NULL kalır; bunlar ödeme takibi yokken oluşmuş kayıtlardır.
ALTER TABLE custom_orders ADD COLUMN IF NOT EXISTS payment_status text
  CHECK (payment_status IN ('awaiting', 'paid', 'failed'));

ALTER TABLE custom_orders ADD COLUMN IF NOT EXISTS customer_address text;
ALTER TABLE custom_orders ADD COLUMN IF NOT EXISTS product_name text;
ALTER TABLE custom_orders ADD COLUMN IF NOT EXISTS quantity integer NOT NULL DEFAULT 1;

CREATE INDEX IF NOT EXISTS idx_custom_orders_payment_status ON custom_orders(payment_status);
