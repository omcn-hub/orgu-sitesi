import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { Order, OrderStatus } from '@/lib/orderTypes';

const ADMIN_COOKIE = 'admin_session';

function checkAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get(ADMIN_COOKIE);
  return cookie?.value === process.env.ADMIN_SECRET;
}

const mapDbOrderToFrontendOrder = (dbOrder: any): Order => {
  return {
    id: dbOrder.id,
    paytrOrderId: dbOrder.paytr_order_id || '',
    customerName: dbOrder.customer_name || 'Anonim',
    customerEmail: dbOrder.customer_email || '',
    customerPhone: dbOrder.customer_phone || '',
    orderDate: dbOrder.order_date || dbOrder.created_at,
    totalPrice: dbOrder.total_price,
    status: dbOrder.status as OrderStatus,
    cargoTrackingNumber: dbOrder.cargo_tracking_number || undefined,
    cargoCompany: dbOrder.cargo_company || undefined,
    notes: dbOrder.notes || undefined,
    customization: {
      color: dbOrder.color_label || '',
      colorHex: dbOrder.color_hex || '',
      size: dbOrder.size || 0,
      soleType: dbOrder.sole_type || '',
      yarnType: dbOrder.yarn_type || '',
      ankleHeight: dbOrder.ankle_height || '',
      knitPattern: dbOrder.knit_pattern || '',
      accessories: dbOrder.accessories || [],
      giftBox: dbOrder.gift_box || false,
      inscription: dbOrder.inscription_text || '',
    }
  };
};

// ── GET: Tüm Siparişleri Getir ──
export async function GET(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('custom_orders')
      .select('*')
      .order('order_date', { ascending: false });

    if (error) {
      console.error('[Admin Orders Fetch] Supabase hatası:', error);
      return NextResponse.json({ error: 'Siparişler yüklenemedi.' }, { status: 500 });
    }

    const mappedOrders = (data || []).map(mapDbOrderToFrontendOrder);
    return NextResponse.json({ success: true, orders: mappedOrders });
  } catch (err) {
    console.error('[Admin Orders GET] Beklenmedik hata:', err);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}

// ── PATCH: Sipariş Durumu ve Kargo Bilgisi Güncelle ──
export async function PATCH(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, cargoTrackingNumber, cargoCompany } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Eksik bilgi.' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    
    const updateData: Record<string, any> = { status };
    if (cargoTrackingNumber !== undefined) {
      updateData.cargo_tracking_number = cargoTrackingNumber;
    }
    if (cargoCompany !== undefined) {
      updateData.cargo_company = cargoCompany;
    }

    const { error } = await supabase
      .from('custom_orders')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('[Admin Orders Update] Supabase hatası:', error);
      return NextResponse.json({ error: 'Sipariş güncellenemedi.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Admin Orders PATCH] Beklenmedik hata:', err);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
