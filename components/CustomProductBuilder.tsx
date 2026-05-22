'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, Palette, Ruler, Sparkles, ChevronRight, ChevronLeft,
  Layers, Wind, Gift,
} from 'lucide-react';
import {
  CustomProduct,
  ColorOption,
  ProductOption,
  AccessoryOption,
  COLOR_OPTIONS,
  SIZES,
  SIZE_SURCHARGE_THRESHOLD,
  SIZE_SURCHARGE_AMOUNT,
  SOLE_OPTIONS,
  YARN_OPTIONS,
  ANKLE_OPTIONS,
  PATTERN_OPTIONS,
  ACCESSORY_OPTIONS,
  INSCRIPTION_SURCHARGE,
  GIFT_BOX_SURCHARGE,
} from '@/lib/customProductTypes';

// ─────────────────────────────────────────────────────────────
// Prop Tipleri
// ─────────────────────────────────────────────────────────────
interface CustomProductBuilderProps {
  product: CustomProduct;
  onChange: (updated: CustomProduct) => void;
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onAddToCart: () => void;
  isSubmitting: boolean;
}

// ─────────────────────────────────────────────────────────────
// Adım Tanımları (5 Gruplandırılmış)
// ─────────────────────────────────────────────────────────────
export const STEPS = [
  { icon: Palette,  label: 'Renk',         desc: 'İplik rengini belirle' },
  { icon: Ruler,    label: 'Numara',        desc: 'Ayak numaranı gir' },
  { icon: Layers,   label: 'Malzeme',       desc: 'Taban ve ip türü' },
  { icon: Wind,     label: 'Model',         desc: 'Bilek boyu ve desen' },
  { icon: Gift,     label: 'Ekstralar',     desc: 'Aksesuar, hediye ve işleme' },
];

// ─────────────────────────────────────────────────────────────
// Yardımcı: Seçenek Kartı
// ─────────────────────────────────────────────────────────────
function OptionCard({
  option,
  isSelected,
  onSelect,
}: {
  option: ProductOption;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
        isSelected
          ? 'border-[var(--accent-terracotta)] bg-[var(--accent-terracotta)]/5 shadow-sm'
          : 'border-[var(--border-light)] bg-[var(--bg-primary)] hover:border-[var(--border-medium)] hover:bg-[var(--bg-secondary)]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {option.icon && (
            <span className="text-2xl leading-none flex-shrink-0">{option.icon}</span>
          )}
          <div>
            <p className={`font-semibold text-sm ${isSelected ? 'text-[var(--accent-terracotta)]' : 'text-[var(--text-primary)]'}`}>
              {option.label}
            </p>
            {option.description && (
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{option.description}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          {option.surcharge > 0 ? (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isSelected
                ? 'bg-[var(--accent-terracotta)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--accent-terracotta)]'
            }`}>
              +{option.surcharge}₺
            </span>
          ) : (
            <span className="text-xs font-medium text-[var(--accent-sage)]">Dahil</span>
          )}
          {isSelected && (
            <Check className="w-4 h-4 text-[var(--accent-terracotta)]" />
          )}
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Aksesuar Checkbox Kartı
// ─────────────────────────────────────────────────────────────
function AccessoryCard({
  option,
  isChecked,
  onToggle,
}: {
  option: AccessoryOption;
  isChecked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
        isChecked
          ? 'border-[var(--accent-terracotta)] bg-[var(--accent-terracotta)]/5'
          : 'border-[var(--border-light)] bg-[var(--bg-primary)] hover:border-[var(--border-medium)]'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            isChecked
              ? 'bg-[var(--accent-terracotta)] border-[var(--accent-terracotta)]'
              : 'border-[var(--border-medium)] bg-white'
          }`}>
            {isChecked && <Check className="w-3 h-3 text-white" />}
          </div>
          <span className={`font-medium text-sm ${isChecked ? 'text-[var(--accent-terracotta)]' : 'text-[var(--text-primary)]'}`}>
            {option.label}
          </span>
        </div>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
          isChecked
            ? 'bg-[var(--accent-terracotta)] text-white'
            : 'bg-[var(--bg-secondary)] text-[var(--accent-terracotta)]'
        }`}>
          +{option.surcharge}₺
        </span>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Adım 1 — Renk Seçimi
// ─────────────────────────────────────────────────────────────
function StepColor({ product, onChange }: { product: CustomProduct; onChange: (u: CustomProduct) => void }) {
  const select = (color: ColorOption) => onChange({ ...product, selectedColor: color });

  return (
    <div>
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">İplik Rengi</h3>
      <p className="text-sm text-[var(--text-muted)] mb-6">El boyası, doğal ipliklerden oluşan renk paletimiz</p>

      <div className="grid grid-cols-5 gap-3">
        {COLOR_OPTIONS.map((color) => {
          const isSelected = product.selectedColor?.id === color.id;
          const needsBorder = color.id === 'krem';
          return (
            <button
              key={color.id}
              title={color.label}
              onClick={() => select(color)}
              className={`relative flex flex-col items-center gap-2 p-2 rounded-2xl transition-all duration-200 ${
                isSelected
                  ? 'bg-[var(--bg-secondary)] ring-2 ring-[var(--accent-terracotta)]'
                  : 'hover:bg-[var(--bg-secondary)]'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full shadow-sm transition-transform duration-200 ${
                  isSelected ? 'scale-110' : 'hover:scale-105'
                } ${needsBorder ? 'border border-[var(--border-medium)]' : ''}`}
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && (
                  <div className="w-full h-full rounded-full flex items-center justify-center bg-black/20">
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  </div>
                )}
              </div>
              <span className="text-[10px] font-medium text-[var(--text-secondary)] text-center leading-tight">
                {color.label}
              </span>
            </button>
          );
        })}
      </div>

      {product.selectedColor && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-xl"
        >
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 border border-[var(--border-light)]"
            style={{ backgroundColor: product.selectedColor.hex }}
          />
          <div>
            <p className="text-xs text-[var(--text-muted)]">Seçilen renk</p>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{product.selectedColor.label}</p>
          </div>
          <Check className="w-4 h-4 text-[var(--accent-sage)] ml-auto" />
        </motion.div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Adım 2 — Numara Seçimi
// ─────────────────────────────────────────────────────────────
function StepSize({ product, onChange }: { product: CustomProduct; onChange: (u: CustomProduct) => void }) {
  const select = (size: number) => onChange({ ...product, selectedSize: size });

  return (
    <div>
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">Ayak Numarası</h3>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        <span className="text-[var(--accent-terracotta)] font-medium">40 ve üzeri numaralar</span> için +{SIZE_SURCHARGE_AMOUNT}₺ ek ücret uygulanır.
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {SIZES.map((size) => {
          const isSelected = product.selectedSize === size;
          const hasSurcharge = size >= SIZE_SURCHARGE_THRESHOLD;
          return (
            <button
              key={size}
              onClick={() => select(size)}
              className={`relative flex flex-col items-center justify-center h-16 rounded-2xl font-bold text-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'bg-[var(--accent-terracotta)] text-white border-[var(--accent-terracotta)] shadow-lg scale-105'
                  : 'bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--border-light)] hover:border-[var(--accent-terracotta)] hover:bg-[var(--bg-secondary)]'
              }`}
            >
              {size}
              {hasSurcharge && (
                <span className={`text-[9px] font-semibold mt-0.5 ${isSelected ? 'text-white/80' : 'text-[var(--accent-terracotta)]'}`}>
                  +{SIZE_SURCHARGE_AMOUNT}₺
                </span>
              )}
            </button>
          );
        })}
      </div>

      {product.selectedSize && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-xl"
        >
          <div className="w-8 h-8 rounded-full bg-[var(--accent-terracotta)] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
            {product.selectedSize}
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)]">Seçilen numara</p>
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {product.selectedSize} Numara
              {product.selectedSize >= SIZE_SURCHARGE_THRESHOLD && (
                <span className="text-[var(--accent-terracotta)] ml-2">+{SIZE_SURCHARGE_AMOUNT}₺</span>
              )}
            </p>
          </div>
          <Check className="w-4 h-4 text-[var(--accent-sage)] ml-auto" />
        </motion.div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Adım 3 — Taban Türü + İp Türü
// ─────────────────────────────────────────────────────────────
function StepMaterial({ product, onChange }: { product: CustomProduct; onChange: (u: CustomProduct) => void }) {
  return (
    <div className="space-y-6">
      {/* Taban Türü */}
      <div>
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Taban Türü</h3>
        <p className="text-xs text-[var(--text-muted)] mb-3">Patik tabanının yapısını belirleyin</p>
        <div className="space-y-2.5">
          {SOLE_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.id}
              option={opt}
              isSelected={product.selectedSole?.id === opt.id}
              onSelect={() => onChange({ ...product, selectedSole: opt })}
            />
          ))}
        </div>
      </div>

      {/* İp Türü */}
      <div>
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">İp Türü</h3>
        <p className="text-xs text-[var(--text-muted)] mb-3">Kullanılacak ipliği seçin</p>
        <div className="space-y-2.5">
          {YARN_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.id}
              option={opt}
              isSelected={product.selectedYarn?.id === opt.id}
              onSelect={() => onChange({ ...product, selectedYarn: opt })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Adım 4 — Bilek Boyu + Örgü Deseni
// ─────────────────────────────────────────────────────────────
function StepModel({ product, onChange }: { product: CustomProduct; onChange: (u: CustomProduct) => void }) {
  return (
    <div className="space-y-6">
      {/* Bilek Boyu */}
      <div>
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Bilek Boyu</h3>
        <p className="text-xs text-[var(--text-muted)] mb-3">Patiğin uzunluğunu belirleyin</p>
        <div className="space-y-2.5">
          {ANKLE_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.id}
              option={opt}
              isSelected={product.selectedAnkle?.id === opt.id}
              onSelect={() => onChange({ ...product, selectedAnkle: opt })}
            />
          ))}
        </div>
      </div>

      {/* Örgü Deseni */}
      <div>
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Örgü Deseni</h3>
        <p className="text-xs text-[var(--text-muted)] mb-3">Patik dokusunu seçin</p>
        <div className="space-y-2.5">
          {PATTERN_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.id}
              option={opt}
              isSelected={product.selectedPattern?.id === opt.id}
              onSelect={() => onChange({ ...product, selectedPattern: opt })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Adım 5 — Aksesuarlar + Hediye Paketi + Kişiselleştirme
// ─────────────────────────────────────────────────────────────
function StepExtras({ product, onChange }: { product: CustomProduct; onChange: (u: CustomProduct) => void }) {
  const toggleAccessory = (id: string) => {
    const current = product.selectedAccessories;
    const next = current.includes(id)
      ? current.filter((a) => a !== id)
      : [...current, id];
    onChange({ ...product, selectedAccessories: next });
  };

  const toggleGiftBox = () => onChange({ ...product, hasGiftBox: !product.hasGiftBox });

  const toggleInscription = () => {
    const next = !product.extraDetails.hasInscription;
    onChange({
      ...product,
      extraDetails: {
        hasInscription: next,
        text: next ? product.extraDetails.text : '',
        addedPrice: next ? INSCRIPTION_SURCHARGE : 0,
      },
    });
  };

  const setText = (text: string) => {
    onChange({ ...product, extraDetails: { ...product.extraDetails, text } });
  };

  return (
    <div className="space-y-6">
      {/* Ekstra Aksesuarlar */}
      <div>
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Ekstra Aksesuarlar</h3>
        <p className="text-xs text-[var(--text-muted)] mb-3">İstediğiniz kadar seçebilirsiniz</p>
        <div className="space-y-2.5">
          {ACCESSORY_OPTIONS.map((opt) => (
            <AccessoryCard
              key={opt.id}
              option={opt}
              isChecked={product.selectedAccessories.includes(opt.id)}
              onToggle={() => toggleAccessory(opt.id)}
            />
          ))}
        </div>
      </div>

      {/* Hediye Paketi */}
      <div>
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Sipariş Konsepti</h3>
        <button
          onClick={toggleGiftBox}
          className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
            product.hasGiftBox
              ? 'border-[var(--accent-terracotta)] bg-[var(--accent-terracotta)]/5'
              : 'border-[var(--border-light)] bg-[var(--bg-primary)] hover:border-[var(--border-medium)]'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎁</span>
              <div>
                <p className={`font-semibold text-sm ${product.hasGiftBox ? 'text-[var(--accent-terracotta)]' : 'text-[var(--text-primary)]'}`}>
                  Özel Hediye Kutusu + Not
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">Hediye notu ekle, özel kutuyla gönder</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                product.hasGiftBox
                  ? 'bg-[var(--accent-terracotta)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--accent-terracotta)]'
              }`}>
                +{GIFT_BOX_SURCHARGE}₺
              </span>
              {/* Switch */}
              <div className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors duration-200 ${
                product.hasGiftBox ? 'bg-[var(--accent-terracotta)]' : 'bg-[var(--border-medium)]'
              }`}>
                <motion.div
                  animate={{ x: product.hasGiftBox ? 16 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Kişiselleştirme — İsim İşleme */}
      <div>
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Kişiselleştirme</h3>
        <button
          onClick={toggleInscription}
          className={`w-full text-left p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
            product.extraDetails.hasInscription
              ? 'border-[var(--accent-terracotta)] bg-[var(--accent-terracotta)]/5'
              : 'border-[var(--border-light)] bg-[var(--bg-primary)] hover:border-[var(--border-medium)]'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sparkles className={`w-5 h-5 ${product.extraDetails.hasInscription ? 'text-[var(--accent-terracotta)]' : 'text-[var(--text-muted)]'}`} />
              <div>
                <p className="font-semibold text-[var(--text-primary)] text-sm">İsim / Harf İşlensin</p>
                <p className="text-xs text-[var(--text-muted)]">El emeğiyle özel işçilik — +{INSCRIPTION_SURCHARGE}₺</p>
              </div>
            </div>
            <div className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors duration-200 ${
              product.extraDetails.hasInscription ? 'bg-[var(--accent-terracotta)]' : 'bg-[var(--border-medium)]'
            }`}>
              <motion.div
                animate={{ x: product.extraDetails.hasInscription ? 16 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </div>
          </div>
        </button>

        <AnimatePresence>
          {product.extraDetails.hasInscription && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-3">
                <input
                  type="text"
                  maxLength={20}
                  placeholder="Örn: Elif, AY, ❤"
                  value={product.extraDetails.text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border-light)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-terracotta)] transition-colors text-base"
                />
                <p className="text-xs text-[var(--text-muted)] mt-1.5">{product.extraDetails.text.length}/20 karakter</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bilgi */}
      <div className="p-4 bg-[var(--bg-secondary)] rounded-2xl">
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          🧶 Tüm özelleştirmeler siparişle birlikte atölyemize iletilir. El emeğiyle üretim süresi 3–7 iş günüdür.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Ana Wizard Bileşeni
// ─────────────────────────────────────────────────────────────
export default function CustomProductBuilder({
  product,
  onChange,
  currentStep,
  onNext,
  onBack,
  onAddToCart,
  isSubmitting,
}: CustomProductBuilderProps) {

  // Adıma göre devam edebilme kontrolü
  const canProceed = (() => {
    switch (currentStep) {
      case 0: return product.selectedColor !== null;
      case 1: return product.selectedSize !== null;
      case 2: return true; // Taban & İp — varsayılan seçili
      case 3: return true; // Bilek & Desen — varsayılan seçili
      case 4: return !product.extraDetails.hasInscription || product.extraDetails.text.trim().length > 0;
      default: return true;
    }
  })();

  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* ── Adım Göstergesi (Stepper) ── */}
      <div className="flex items-center mb-8">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isDone = index < currentStep;
          const isActive = index === currentStep;
          return (
            <div key={index} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDone
                      ? 'bg-[var(--accent-sage)] text-white'
                      : isActive
                      ? 'bg-[var(--accent-terracotta)] text-white shadow-md shadow-[var(--accent-terracotta)]/30'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-[9px] font-semibold mt-1.5 whitespace-nowrap ${isActive ? 'text-[var(--accent-terracotta)]' : 'text-[var(--text-muted)]'}`}>
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 mb-4 rounded-full transition-colors duration-500 ${index < currentStep ? 'bg-[var(--accent-sage)]' : 'bg-[var(--border-light)]'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Adım İçeriği ── */}
      <div className="bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-3xl p-6 shadow-sm min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {currentStep === 0 && <StepColor product={product} onChange={onChange} />}
            {currentStep === 1 && <StepSize product={product} onChange={onChange} />}
            {currentStep === 2 && <StepMaterial product={product} onChange={onChange} />}
            {currentStep === 3 && <StepModel product={product} onChange={onChange} />}
            {currentStep === 4 && <StepExtras product={product} onChange={onChange} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigasyon Butonları ── */}
      <div className="flex items-center justify-between mt-4 gap-3">
        <button
          onClick={onBack}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all ${
            currentStep === 0
              ? 'opacity-0 pointer-events-none'
              : 'btn-outline'
          }`}
        >
          <ChevronLeft className="w-4 h-4" /> Geri
        </button>

        {isLastStep ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAddToCart}
            disabled={!canProceed || isSubmitting}
            className="flex-1 btn-primary py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Sepete Ekleniyor...
              </>
            ) : (
              <>
                <Gift className="w-4 h-4" />
                Sepete Ekle — {product.totalPrice.toLocaleString('tr-TR')}₺
              </>
            )}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            disabled={!canProceed}
            className="flex-1 btn-primary py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Devam Et <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
