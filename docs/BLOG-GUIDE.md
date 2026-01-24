# Blog Sistemi Kullanım Kılavuzu

## 📝 Yeni Blog Yazısı Eklemek

### 1. Blog İçeriği Oluşturma
Blog yazılarınızı `/content/blog/` klasörüne markdown formatında kaydedin.

**Dosya Adı Formatı:** `slug-ismi.md`

**Örnek Dosya Yapısı:**
```markdown
---
title: "Blog Yazı Başlığı"
description: "SEO açıklaması"
date: "2026-01-24"
author: "Örgü Home"
keywords: "anahtar, kelimeler"
slug: "slug-ismi"
---

# Ana Başlık

İçerik buraya gelir...
```

### 2. Blog Listesine Ekleme

`components/BlogList.tsx` dosyasını açın ve `blogPosts` dizisine yeni blog yazınızı ekleyin:

```typescript
const blogPosts: BlogPost[] = [
  {
    title: 'Blog Yazı Başlığı',
    date: '24 Ocak 2026',
    excerpt: 'Kısa açıklama (150-200 karakter)',
    image: '/images/blog-gorsel.png',
    slug: 'slug-ismi',
  },
  // Diğer blog yazıları...
];
```

### 3. Görsel Ekleme

- Görseli `/public/images/` klasörüne kaydedin
- Önerilen boyut: 1200x800 px
- Format: PNG veya JPG
- Dosya adı: `blog-slug-ismi.png`

## 🎨 Blog Sayfası Özellikleri

### Tasarım Temi
- **Renk Paleti:** Quiet Luxury (stone, warm-gold, terracotta)
- **Tipografi:** Libre Baskerville (başlıklar), Inter (metin)
- **Stil:** Minimalist, zarif, premium

### Kartlar
- ✅ Öne çıkan görsel
- ✅ Tarih etiketi
- ✅ Başlık
- ✅ Özet metin (3 satır)
- ✅ "Devamını Oku" butonu
- ✅ Hover animasyonları

### Responsive Tasarım
- **Mobil:** 1 sütun
- **Tablet:** 2 sütun
- **Desktop:** 3 sütun

## 📂 Dosya Yapısı

```
knitwear-landing/
├── app/
│   └── blog/
│       └── page.tsx          # Blog ana sayfası
├── components/
│   ├── BlogCard.tsx          # Blog kartı componenti
│   └── BlogList.tsx          # Blog listesi componenti
├── content/
│   └── blog/
│       └── *.md              # Blog markdown dosyaları
└── public/
    └── images/
        └── blog-*.png        # Blog görselleri
```

## 🔗 Navigation

Blog linkine navbar'dan erişilebilir:
- Desktop: Üst menüde "Blog"
- Mobil: Hamburger menüde "Blog"

## 💡 En İyi Pratikler

### SEO İçin
- Başlıkları açıklayıcı ve anahtar kelimelerle zengin tutun
- Meta açıklamalar 150-160 karakter olmalı
- Görsellere alt text ekleyin
- İç linkleme kullanın

### İçerik İçin
- İlk paragrafta dikkat çekin
- Alt başlıklar (H2, H3) kullanın
- Listeler ve bullet pointler ekleyin
- Görseller ve örnekler ekleyin
- Sonunda CTA (Call to Action) kullanın

### Görsel İçin
- Yüksek kalite, düşük boyut
- Consistent stil ve renk paleti
- Quiet Luxury estetiğine uygun
- Ürünlerinizi gösterin

## 🚀 Yayınlama

1. Blog markdown dosyasını `/content/blog/` klasörüne kaydedin
2. Görseli `/public/images/` klasörüne ekleyin
3. `components/BlogList.tsx` dosyasını güncelleyin
4. Development server otomatik güncellenecektir
5. Değişiklikleri test edin: `http://localhost:3000/blog`

## 📊 Mevcut Blog Yazıları

1. **Gelin Bohçası Trendleri**
   - Slug: `gelin-bohcasi-el-orgusu-patikler`
   - Tarih: 24 Ocak 2026
   - Görsel: `/images/blog-gelin-bohcasi.png`

---

**Not:** İlerleyen zamanlarda blog sistemi için CMS (Content Management System) entegrasyonu düşünülebilir.
