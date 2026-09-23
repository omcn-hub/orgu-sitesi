import { NextResponse } from 'next/server';
import { ADMIN_COOKIE } from '@/lib/adminAuth';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0, // Cookie'yi sil
    path: '/',
  });
  return response;
}
