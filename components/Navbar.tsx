'use client';

import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-8 py-3"
    >
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-md bg-white/80 rounded-lg shadow-sm px-6 py-3 border border-stone-200/50">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <ShoppingBag className="w-5 h-5 text-stone-700 group-hover:scale-110 transition-transform" />
              <span className="font-heading text-xl font-bold text-stone-900 tracking-tight">
                ÖRGÜHOME
              </span>
            </Link>

            {/* Center Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#home"
                className="text-stone-800 hover:text-stone-900 transition-colors font-medium text-sm hover:underline underline-offset-4 decoration-1"
              >
                Ana Sayfa
              </Link>
              <Link
                href="#shop"
                className="text-stone-800 hover:text-stone-900 transition-colors font-medium text-sm hover:underline underline-offset-4 decoration-1"
              >
                Mağaza
              </Link>
              <Link
                href="#about"
                className="text-stone-800 hover:text-stone-900 transition-colors font-medium text-sm hover:underline underline-offset-4 decoration-1"
              >
                Hakkımızda
              </Link>
              <Link
                href="#contact"
                className="text-stone-800 hover:text-stone-900 transition-colors font-medium text-sm hover:underline underline-offset-4 decoration-1"
              >
                İletişim
              </Link>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-stone-800 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-stone-900 transition-all duration-300 shadow-sm"
            >
              Hemen Al
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
