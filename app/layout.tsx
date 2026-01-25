import type { Metadata } from "next";
import { Libre_Baskerville, Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "ÖRGÜHOME - El Yapımı Örgü Ürünleri",
  description: "Sevgiyle ve organik yünle el emeğiyle örülmüş örgüler. Kazak, hırka, bere ve atkı koleksiyonumuzu keşfedin.",
  keywords: ["el örgüsü", "organik yün", "handmade", "örgü kazak", "yün hırka", "el yapımı örgü", "sürdürülebilir moda", "örgü ürünleri"],
  authors: [{ name: "ÖRGÜHOME" }],
  icons: {
    icon: [
      { url: '/icon.png', sizes: 'any', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://orguhome.com",
    siteName: "ÖRGÜHOME",
    title: "ÖRGÜHOME - El Yapımı Örgü Ürünleri",
    description: "Sevgiyle ve organik yünle el emeğiyle örülmüş örgüler. Kazak, hırka, bere ve atkı koleksiyonumuzu keşfedin.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ÖRGÜHOME - El Yapımı Örgü Ürünleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ÖRGÜHOME - El Yapımı Örgü Ürünleri",
    description: "Sevgiyle ve organik yünle el emeğiyle örülmüş örgüler. Kazak, hırka, bere ve atkı koleksiyonumuzu keşfedin.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://orguhome.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${libreBaskerville.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
        {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
          <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_TRACKING_ID} />
        )}
        {children}
      </body>
    </html>
  );
}
