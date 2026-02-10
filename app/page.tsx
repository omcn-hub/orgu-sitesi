import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ProductShowcase from '@/components/ProductShowcase';
import ArtisanStory from '@/components/ArtisanStory';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <Hero />
      <Features />
      <ProductShowcase />
      <ArtisanStory />
      <Testimonials />
      <Footer />
    </div>
  );
}
