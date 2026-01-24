import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-heading text-6xl lg:text-8xl font-bold text-stone-900 mb-4">
          404
        </h1>
        <h2 className="font-heading text-2xl lg:text-3xl font-bold text-stone-700 mb-6">
          Blog Yazısı Bulunamadı
        </h2>
        <p className="text-stone-600 text-lg mb-8">
          Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.
        </p>
        <Link 
          href="/blog"
          className="inline-block bg-stone-900 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
        >
          ← Blog Sayfasına Dön
        </Link>
      </div>
    </div>
  );
}
