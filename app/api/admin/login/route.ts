import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE, SESSION_MAX_AGE, createSessionToken, safeEqual } from '@/lib/adminAuth';

// ── Brute-force önlemi: IP başına hatalı deneme sayacı ──
// Bellek içi; aynı sunucu örneğine gelen denemeleri sınırlar.
const MAX_FAILURES = 5;
const LOCK_MS = 15 * 60 * 1000; // 15 dakika
const failures = new Map<string, { count: number; lockedUntil: number }>();

function clientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    const record = failures.get(ip);
    if (record && record.lockedUntil > Date.now()) {
      const minutes = Math.ceil((record.lockedUntil - Date.now()) / 60000);
      return NextResponse.json(
        { error: `Çok fazla hatalı deneme. ${minutes} dakika sonra tekrar deneyin.` },
        { status: 429 }
      );
    }

    const { password } = await request.json();

    const correctPassword = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SECRET;

    if (!correctPassword || !secret) {
      return NextResponse.json(
        { error: 'Sunucu yapılandırması eksik.' },
        { status: 500 }
      );
    }

    if (typeof password !== 'string' || !(await safeEqual(password, correctPassword))) {
      const count = (record?.count ?? 0) + 1;
      failures.set(ip, {
        count: count >= MAX_FAILURES ? 0 : count,
        lockedUntil: count >= MAX_FAILURES ? Date.now() + LOCK_MS : 0,
      });
      // Küçük gecikme — otomatik denemeleri yavaşlatır
      await new Promise(r => setTimeout(r, 500));
      return NextResponse.json(
        { error: 'Şifre hatalı.' },
        { status: 401 }
      );
    }

    failures.delete(ip);

    // Başarılı giriş — imzalı, süreli httpOnly cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE, await createSessionToken(secret), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 });
  }
}
