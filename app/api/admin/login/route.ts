import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_COOKIE = 'admin_session';
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 saat

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    const correctPassword = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SECRET;

    if (!correctPassword || !secret) {
      return NextResponse.json(
        { error: 'Sunucu yapılandırması eksik.' },
        { status: 500 }
      );
    }

    if (password !== correctPassword) {
      // Brute-force önlemi — küçük gecikme
      await new Promise(r => setTimeout(r, 500));
      return NextResponse.json(
        { error: 'Şifre hatalı.' },
        { status: 401 }
      );
    }

    // Başarılı giriş — httpOnly cookie set et
    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE, secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 });
  }
}
