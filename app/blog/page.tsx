import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'Blog | Örgü Home - El Örgüsü Dünyasından Haberler',
  description: 'El örgüsü patik modelleri, gelin bohçası önerileri ve örgü dünyasından trendler. Örgü Home blog sayfasında ilham verici içerikler keşfedin.',
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <BlogList />
      </main>
      <Footer />
    </>
  );
}
