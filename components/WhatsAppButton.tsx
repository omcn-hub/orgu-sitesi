'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = '905510774112';
  const message = encodeURIComponent('Merhaba! Ürünleriniz hakkında bilgi almak istiyorum.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-7 right-7 z-50 flex items-center gap-3"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {/* Tooltip label */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-2xl shadow-xl border border-gray-100 whitespace-nowrap"
              >
                💬 Bize WhatsApp&apos;tan yazın
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile iletişime geçin"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="relative w-[58px] h-[58px] rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(37,211,102,0.45)] cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
          >
            {/* Ripple ping ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />

            {/* Official WhatsApp SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="30"
              height="30"
              className="relative z-10 drop-shadow-sm"
            >
              <path
                fill="#fff"
                d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7C17.1 42.9 20.5 44 24 44c11 0 20-9 20-20S35 4 24 4z"
              />
              <path
                fill="#25D366"
                d="M24 7c-9.4 0-17 7.6-17 17 0 3.2.9 6.2 2.5 8.8l-1.7 6.2 6.4-1.7C16.8 38.8 20.3 40 24 40c9.4 0 17-7.6 17-17S33.4 7 24 7z"
              />
              <path
                fill="#fff"
                d="M19.3 16.8c-.4-1-.8-1-1.2-1h-1c-.3 0-.9.1-1.4.7s-1.8 1.8-1.8 4.3 1.9 5 2.1 5.4 3.7 5.8 9 8c1.2.5 2.2.8 2.9 1 1.2.4 2.4.3 3.2.2 1-.1 3-1.2 3.5-2.4.4-1.2.4-2.2.3-2.4-.1-.2-.5-.3-1-.6s-3-1.5-3.5-1.7-.8-.2-1.2.2c-.3.4-1.3 1.7-1.6 2s-.6.3-1.1.1c-.5-.2-2.1-.8-4-2.5-1.5-1.3-2.5-3-2.8-3.5-.3-.5 0-.8.2-1.1.2-.3.5-.6.7-.9.2-.3.3-.5.5-.9.2-.4.1-.7 0-1z"
              />
            </svg>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton;
