'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Ana Sayfa' },
    { href: '#shop', label: 'Mağaza' },
    { href: '/blog', label: 'Blog' },
    { href: '#about', label: 'Hakkımızda' },
    { href: '#contact', label: 'İletişim' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`rounded-2xl px-6 py-3.5 transition-all duration-500 ${
            isScrolled 
              ? 'nav-glass shadow-md' 
              : 'bg-transparent'
          }`}>
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
                <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl overflow-hidden shadow-sm transition-shadow group-hover:shadow-md">
                  <Image 
                    src="/images/logo.png" 
                    alt="ÖRGÜHOME Logo" 
                    width={44} 
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-col">
                  <span className={`font-heading text-xl lg:text-[22px] font-bold transition-colors duration-500 ${
                    isScrolled ? 'text-[var(--text-primary)]' : 'text-white'
                  }`}>
                    ÖRGÜHOME
                  </span>
                  <span className={`hidden lg:block text-[10px] font-medium transition-colors duration-500 ${
                    isScrolled ? 'text-[var(--text-muted)]' : 'text-white/60'
                  }`}>
                    El Yapımı Örgü Ürünleri
                  </span>
                </div>
              </Link>

              {/* Center Links */}
              <div className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center mx-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 lg:px-5 py-2 font-medium text-sm lg:text-[15px] transition-all duration-300 rounded-full whitespace-nowrap ${
                      isScrolled 
                        ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden md:block flex-shrink-0">
                <Link href="https://www.shopier.com/orguhome27" target="_blank">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary px-7 py-2.5 text-sm lg:text-[15px]"
                  >
                    Hemen Al →
                  </motion.button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2.5 rounded-xl transition-colors ${
                  isScrolled 
                    ? 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />
            
            {/* Menu Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[var(--bg-primary)] shadow-xl p-6"
            >
              <div className="flex items-center justify-between mb-10 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm">
                    <Image 
                      src="/images/logo.png" 
                      alt="ÖRGÜHOME" 
                      width={36} 
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-heading text-lg font-bold text-[var(--text-primary)]">
                    ÖRGÜHOME
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-[var(--bg-secondary)] rounded-xl transition-colors text-[var(--text-secondary)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3.5 text-[var(--text-primary)] font-medium text-[17px] rounded-xl hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <Link href="https://www.shopier.com/orguhome27" target="_blank" className="block">
                    <button className="w-full btn-primary px-6 py-4 text-base">
                      Hemen Al →
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
