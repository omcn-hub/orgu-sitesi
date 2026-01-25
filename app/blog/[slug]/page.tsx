import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog';
import Image from 'next/image';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Blog Yazısı Bulunamadı',
    };
  }

  return {
    title: `${post.title} | Örgü Home Blog`,
    description: post.description,
    keywords: post.keywords,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section with Featured Image */}
        <div className="relative h-[50vh] lg:h-[60vh] bg-stone-900">
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 to-stone-900/80 z-10" />
          <Image
            src="/images/blog-gelin-bohcasi.png"
            alt={post.title}
            fill
            className="object-cover opacity-40"
          />
          
          {/* Title Overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
            <div className="max-w-4xl mx-auto text-center">
              <time className="text-warm-gold text-sm lg:text-base font-semibold tracking-wide mb-4 block">
                {post.date}
              </time>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
                {post.title}
              </h1>
              <p className="text-stone-200 text-lg lg:text-xl max-w-2xl mx-auto">
                {post.description}
              </p>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <article className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          {/* Author Info */}
          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-stone-200">
            <div className="w-12 h-12 bg-gradient-to-br from-warm-gold to-terracotta rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">Ö</span>
            </div>
            <div>
              <p className="font-semibold text-stone-900">{post.author}</p>
              <p className="text-sm text-stone-600">{post.date}</p>
            </div>
          </div>

          {/* Content */}
          <div 
            className="blog-content prose prose-lg prose-stone max-w-none
              prose-headings:font-heading prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6
              prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4
              prose-p:leading-relaxed prose-p:text-stone-700 prose-p:mb-6
              prose-a:text-warm-gold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-stone-900 prose-strong:font-bold
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:mb-2 prose-li:text-stone-700
              prose-blockquote:border-l-4 prose-blockquote:border-warm-gold 
              prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-stone-600
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Section */}
          <div className="mt-16 pt-8 border-t border-stone-200">
            <h3 className="font-heading text-xl font-bold text-stone-900 mb-4">
              Bu yazıyı paylaşın
            </h3>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-stone-100 hover:bg-stone-200 rounded-xl font-semibold text-stone-800 transition-colors">
                WhatsApp
              </button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 lg:p-12 glass-card-strong rounded-none text-center">
            <h3 className="font-heading text-2xl lg:text-3xl font-bold text-stone-900 mb-4">
              Koleksiyonumuzu Keşfedin
            </h3>
            <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
              El örgüsü patik modellerimizi incelemek ve sipariş vermek için mağazamızı ziyaret edin.
            </p>
            <a 
              href="/#shop"
              className="inline-block bg-stone-900 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              Ürünleri Görüntüle →
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
