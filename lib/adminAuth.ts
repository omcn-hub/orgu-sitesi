// ─────────────────────────────────────────────────────────────
// Admin Oturumu — imzalı, süreli çerez
// Çerez değeri: "<bitiş_ms>.<HMAC-SHA256(bitiş_ms, ADMIN_SECRET)>"
// Gizli anahtarın kendisi tarayıcıya hiç gitmez.
// Web Crypto kullanır; proxy ve API route'larında aynı şekilde çalışır.
// ─────────────────────────────────────────────────────────────

export const ADMIN_COOKIE = 'admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 saat (saniye)

const encoder = new TextEncoder();

function toBase64Url(bytes: ArrayBuffer): string {
  let bin = '';
  for (const b of new Uint8Array(bytes)) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(value: string, secret: string): Promise<ArrayBuffer> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return crypto.subtle.sign('HMAC', key, encoder.encode(value));
}

/** Uzunluktan bağımsız, sabit süreli karşılaştırma (iki tarafın özeti karşılaştırılır) */
export async function safeEqual(a: string, b: string): Promise<boolean> {
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(a)),
    crypto.subtle.digest('SHA-256', encoder.encode(b)),
  ]);
  const va = new Uint8Array(ha);
  const vb = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];
  return diff === 0;
}

export async function createSessionToken(secret: string): Promise<string> {
  const expires = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${expires}.${toBase64Url(await hmac(expires, secret))}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET;
  if (!token || !secret) return false;

  const [expires, signature] = token.split('.');
  if (!expires || !signature || !/^\d+$/.test(expires)) return false;
  if (Number(expires) < Date.now()) return false;

  const expected = toBase64Url(await hmac(expires, secret));
  return safeEqual(signature, expected);
}
