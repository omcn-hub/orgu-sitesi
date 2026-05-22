// ─────────────────────────────────────────────────────────────
// POST /api/orders/save
// Sipariş tamamlandıktan sonra Supabase'e kaydeder.
// PayTR callback'ten veya frontend'den çağrılabilir.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import {
  calculateTotalPrice,
  CustomProduct,
  ACCESSORY_OPTIONS,
  SOLE_OPTIONS,
  YARN_OPTIONS,
  ANKLE_OPTIONS,
  PATTERN_OPTIONS,
  GIFT_BOX_SURCHARGE,
  INSCRIPTION_SURCHARGE,
  SIZE_SURCHARGE_THRESHOLD,
  SIZE_SURCHARGE_AMOUNT,
} from '@/lib/customProductTypes';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      product: CustomProduct;
      paytrOrderId?: string;
      customerName?: string;
      customerEmail?: string;
      customerPhone?: string;
    };

    const { product, paytrOrderId, customerName, customerEmail, customerPhone } = body;

    if (!product || !product.productId) {
      return NextResponse.json({ error: 'Eksik ürün bilgisi.' }, { status: 400 });
    }

    // ── Güvenlik: Backend'de fiyatı tekrar hesapla ──
    const calculatedPrice = calculateTotalPrice(product);
    if (Math.abs(calculatedPrice - product.totalPrice) > 1) {
      console.warn('[Order Save] Fiyat uyuşmazlığı:', {
        sent: product.totalPrice,
        calculated: calculatedPrice,
      });
      // Hesaplanan fiyatı kullan, gelen fiyatı reddet
    }

    const supabase = createServerSupabaseClient();

    const orderData = {
      paytr_order_id: paytrOrderId || null,
      customer_name: customerName || 'Anonim',
      customer_email: customerEmail || null,
      customer_phone: customerPhone || null,
      product_id: product.productId,
      base_price: product.basePrice,
      total_price: calculatedPrice,
      // Renk
      color_label: product.selectedColor?.label || null,
      color_hex: product.selectedColor?.hex || null,
      // Numara
      size: product.selectedSize || null,
      // Taban & İp
      sole_type: product.selectedSole?.label || null,
      yarn_type: product.selectedYarn?.label || null,
      // Bilek & Desen
      ankle_height: product.selectedAnkle?.label || null,
      knit_pattern: product.selectedPattern?.label || null,
      // Aksesuarlar
      accessories: product.selectedAccessories,
      gift_box: product.hasGiftBox,
      // İşleme
      has_inscription: product.extraDetails.hasInscription,
      inscription_text: product.extraDetails.text || null,
      // Durum
      status: 'pending',
      order_date: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('custom_orders')
      .insert(orderData)
      .select('id')
      .single();

    if (error) {
      console.error('[Order Save] Supabase hatası:', error);
      return NextResponse.json({ error: 'Sipariş kaydedilemedi.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      orderId: data?.id,
      verifiedPrice: calculatedPrice,
    });
  } catch (err) {
    console.error('[Order Save] Beklenmedik hata:', err);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
