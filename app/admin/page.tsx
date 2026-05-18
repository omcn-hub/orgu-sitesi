import AdminDashboard from '@/components/AdminDashboard';

export const metadata = {
  title: 'Sipariş Paneli — ÖRGÜHOME',
  description: 'Sipariş ve üretim takip paneli',
  robots: 'noindex, nofollow', // Arama motorlarından gizle
};

export default function AdminPage() {
  return <AdminDashboard />;
}
