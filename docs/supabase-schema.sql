-- ─────────────────────────────────────────────────────────────
-- Supabase — custom_orders tablosu
-- Supabase Dashboard > SQL Editor'da bu scripti çalıştırın
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS custom_orders (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      timestamptz DEFAULT now() NOT NULL,
  order_date      timestamptz DEFAULT now() NOT NULL,

  -- PayTR
  paytr_order_id  text,

  -- Müşteri bilgileri (isteğe bağlı — checkout sırasında doldurulabilir)
  customer_name   text DEFAULT 'Anonim',
  customer_email  text,
  customer_phone  text,

  -- Ürün
  product_id      text NOT NULL,
  base_price      integer NOT NULL,
  total_price     integer NOT NULL,   -- kuruş değil, TL olarak saklanır

  -- Renk
  color_label     text,
  color_hex       text,

  -- Numara
  size            integer,

  -- Taban & İp
  sole_type       text,
  yarn_type       text,

  -- Bilek & Desen
  ankle_height    text,
  knit_pattern    text,

  -- Aksesuarlar & Hediye
  accessories     text[] DEFAULT '{}',
  gift_box        boolean DEFAULT false,

  -- Kişiselleştirme
  has_inscription boolean DEFAULT false,
  inscription_text text,

  -- Durum
  status          text DEFAULT 'pending'
                  CHECK (status IN ('pending', 'in_production', 'ready_for_shipping', 'shipped')),

  -- Kargo (isteğe bağlı)
  cargo_company         text,
  cargo_tracking_number text,
  notes                 text
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_custom_orders_status     ON custom_orders(status);
CREATE INDEX IF NOT EXISTS idx_custom_orders_order_date ON custom_orders(order_date DESC);
CREATE INDEX IF NOT EXISTS idx_custom_orders_paytr_id   ON custom_orders(paytr_order_id);

-- Row Level Security (RLS)
ALTER TABLE custom_orders ENABLE ROW LEVEL SECURITY;

-- Yalnızca service_role key ile yazma/okuma — frontend anon kullanıcılar erişemez
CREATE POLICY "service_role_full_access" ON custom_orders
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ─────────────────────────────────────────────────────────────
-- Örnek veri (isteğe bağlı — test için)
-- ─────────────────────────────────────────────────────────────

-- INSERT INTO custom_orders (
--   product_id, base_price, total_price,
--   color_label, color_hex, size,
--   sole_type, yarn_type, ankle_height, knit_pattern,
--   accessories, gift_box, has_inscription, inscription_text,
--   status
-- ) VALUES (
--   'CUSTOM-CORAP-001', 300, 550,
--   'Gül Kurusu', '#D4A5A5', 37,
--   'Kaymaz Taban', 'Ekstra Sıcak Tutan', 'Bilekte', 'Saç Örgüsü',
--   ARRAY['İsme Özel Deri Etiket'], true, true, 'AY',
--   'pending'
-- );
