'use client';

import { motion } from 'framer-motion';
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="w-full px-4 lg:px-8">
          <div className={`glass-nav px-6 py-4 transition-all duration-300 ${
            isScrolled ? 'shadow-lg' : 'shadow-md'
          }`}>
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl overflow-hidden shadow-md">
                  <Image 
                    src="/images/logo.png" 
                    alt="ÖRGÜHOME Logo" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-col">
                  <span className="font-heading text-xl lg:text-2xl font-bold text-white">
                    ÖRGÜHOME
                  </span>
                  <span className="hidden lg:block text-[10px] text-white/70 font-medium">
                    El Yapımı Örgü Ürünleri
                  </span>
                </div>
              </Link>

              {/* Center Links */}
              <div className="hidden md:flex items-center gap-1 lg:gap-3 xl:gap-6 flex-1 justify-center mx-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 lg:px-5 py-2 text-white/80 hover:text-white font-semibold text-sm lg:text-base transition-colors rounded-xl hover:bg-white/10 whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden md:block flex-shrink-0">
                <Link href="https://www.shopier.com/orguhome27" target="_blank">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-luxury-gold text-black px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl font-bold text-sm lg:text-base hover:bg-white transition-all duration-300"
                  >
                    Hemen Al →
                  </motion.button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Menu Panel */}
          <div className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm glass-dark shadow-premium p-6">
            <div className="flex items-center justify-between mb-8 pt-16">
              <h3 className="font-heading text-2xl font-bold text-white">
                Menü
              </h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-5 py-4 text-white/90 font-semibold text-lg rounded-xl hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <Link href="https://www.shopier.com/orguhome27" target="_blank" className="mt-4 w-full">
                <button className="w-full bg-luxury-gold text-black px-6 py-4 rounded-xl font-bold hover:bg-white transition-all duration-300">
                  Hemen Al →
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
