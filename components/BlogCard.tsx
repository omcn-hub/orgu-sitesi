'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  slug: string;
  index: number;
}

const BlogCard = ({ title, date, excerpt, image, slug, index }: BlogCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${slug}`} className="block">
        <div className="glass-card overflow-hidden simple-hover rounded-none h-full flex flex-col">
          {/* Featured Image */}
          <div className="relative h-64 lg:h-72 overflow-hidden bg-stone-100">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="p-8 lg:p-10 flex-1 flex flex-col">
            {/* Date */}
            <time className="text-sm text-stone-500 tracking-wide font-body mb-4 block">
              {date}
            </time>

            {/* Title */}
            <h3 className="font-heading text-2xl lg:text-3xl font-bold text-stone-900 mb-4 tracking-tight group-hover:text-warm-gold transition-colors duration-300">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-stone-600 leading-relaxed mb-6 flex-1 line-clamp-3">
              {excerpt}
            </p>

            {/* Read More Button */}
            <div className="flex items-center gap-2 text-stone-900 font-semibold group-hover:gap-4 transition-all duration-300">
              <span>Devamını Oku</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
