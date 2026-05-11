'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Shield, Lock, CreditCard } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  price: string;
  productId: string;
}

type ModalState = 'loading' | 'ready' | 'error';

const PaymentModal = ({
  isOpen,
  onClose,
  productName,
  price,
  productId,
}: PaymentModalProps) => {
  const [state, setState] = useState<ModalState>('loading');
  const [iframeToken, setIframeToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchToken = useCallback(async () => {
    setState('loading');
    setIframeToken(null);
    setErrorMessage('');

    try {
      const res = await fetch('/api/paytr/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, price, productId }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        throw new Error(data.error || 'Token alınamadı.');
      }

      setIframeToken(data.token);
      setState('ready');
    } catch (err: any) {
      setErrorMessage(err.message || 'Bir hata oluştu.');
      setState('error');
    }
  }, [productName, price, productId]);

  useEffect(() => {
    if (isOpen) {
      fetchToken();
      // Modal açıkken scroll'u kilitle
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Kapanınca state'i sıfırla
      setTimeout(() => {
        setState('loading');
        setIframeToken(null);
      }, 400);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, fetchToken]);

  // ESC tuşu ile kapat
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 w-full sm:max-w-xl bg-[var(--bg-primary)] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: '95dvh' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-[var(--border-light)]">
              <div className="flex-1 pr-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 bg-[var(--accent-terracotta)]/10 rounded-lg">
                    <ShoppingBag className="w-4 h-4 text-[var(--accent-terracotta)]" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-terracotta)]">
                    Güvenli Ödeme
                  </span>
                </div>
                <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] line-clamp-2 leading-snug">
                  {productName}
                </h2>
                <p className="text-2xl font-bold text-[var(--accent-terracotta)] mt-1">
                  {price}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)] flex-shrink-0"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {/* Loading State */}
              {state === 'loading' && (
                <div className="flex flex-col items-center justify-center py-20 px-6">
                  <div className="relative w-14 h-14 mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 rounded-full border-3 border-[var(--border-light)] border-t-[var(--accent-terracotta)]"
                      style={{ borderWidth: 3 }}
                    />
                    <div className="absolute inset-2 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-[var(--accent-terracotta)]" />
                    </div>
                  </div>
                  <p className="font-semibold text-[var(--text-primary)] text-base">
                    Ödeme formu hazırlanıyor...
                  </p>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    Lütfen bekleyin
                  </p>
                </div>
              )}

              {/* Error State */}
              {state === 'error' && (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                    <X className="w-7 h-7 text-red-400" />
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] text-base mb-2">
                    Bir sorun oluştu
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6 max-w-xs">
                    {errorMessage}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={fetchToken}
                    className="btn-primary px-8 py-3 text-sm"
                  >
                    Tekrar Dene
                  </motion.button>
                </div>
              )}

              {/* iFrame State */}
              {state === 'ready' && iframeToken && (
                <iframe
                  src={`https://www.paytr.com/odeme/guvenli/${iframeToken}`}
                  className="w-full border-none"
                  style={{ height: '520px' }}
                  title="PayTR Güvenli Ödeme"
                  allow="payment"
                />
              )}
            </div>

            {/* Footer Trust Badges */}
            <div className="px-6 py-3 border-t border-[var(--border-light)] bg-[var(--bg-secondary)]/50">
              <div className="flex items-center justify-center gap-5 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  256-bit SSL
                </span>
                <span className="w-1 h-1 rounded-full bg-[var(--border-medium)]" />
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  PayTR Güvencesi
                </span>
                <span className="w-1 h-1 rounded-full bg-[var(--border-medium)]" />
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  3D Secure
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
