'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import BlogCard from './BlogCard';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    title: '2026 Gelin Bohçası Trendleri: Neden El Örgüsü İncili Patik Tercih Etmelisiniz?',
    date: '24 Ocak 2026',
    excerpt: 'Gelin bohçasının vazgeçilmezi el örgüsü patikler. İncili, tüylü ve kristal taşlı çeyizlik modeller ile zarafeti yakalayın. Özel tasarım el emeği patiklerimizi keşfedin.',
    image: '/images/blog-gelin-bohcasi.png',
    slug: 'gelin-bohcasi-el-orgusu-patikler',
  },
  // Add more blog posts here
];

const BlogList = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-20 lg:py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-4 tracking-tight">
            Blog
          </h1>
          
          <p className="text-lg lg:text-xl text-stone-600 max-w-2xl mx-auto">
            El örgüsü dünyasından haberler, trendler ve ilham verici hikayeler
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.slug}
              {...post}
              index={index}
            />
          ))}
        </div>

        {/* Empty State - if no posts */}
        {blogPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <p className="text-stone-500 text-lg">
              Yakında yeni içerikler paylaşılacak...
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
