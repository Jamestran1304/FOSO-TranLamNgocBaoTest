import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import ServiceSection from './components/ServiceSection';
import BookingSection from './components/BookingSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartPanel from './components/CartPanel';
import BookingConfirm from './components/BookingConfirm';
import { CartProvider } from './context/CartContext';
import { fetchServices } from './lib/api';

export default function App() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchServices()
      .then((data) => {
        if (!mounted) return;
        setServices(data);
        setActiveCategory(data[0]?.id ?? null);
      })
      .catch((err) => setError(err.message || 'Failed to load'))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const filtered = useMemo(() => {
    if (!query) return services;
    const q = query.trim().toLowerCase();
    return services
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((it) =>
          (it.name + ' ' + it.description).toLowerCase().includes(q),
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [services, query]);

  return (
    <CartProvider>
      <div className='min-h-screen bg-white text-gray-900'>
        <Header />

        <main className='container mx-auto px-6 py-8'>
          <section className='mb-6 text-center'>
            <h2 className='text-3xl font-semibold mb-1'>Dịch Vụ</h2>
            <p className='text-sm text-gray-600'>
              Gói combo, Medicure, Pedicure — Tham khảo giá và mô tả
            </p>
          </section>

          <section className='flex flex-col md:flex-row items-center justify-between gap-4 mb-6'>
            <div className='flex gap-3 overflow-x-auto pb-2'>
              {services.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1 rounded-full text-sm transition whitespace-nowrap ${
                    activeCategory === c.id ? 'bg-gray-200' : 'bg-gray-100'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>

            <div className='w-full md:w-1/3'>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Tìm kiếm dịch vụ...'
                className='w-full border rounded px-3 py-2'
              />
            </div>
          </section>

          {loading && <div className='text-center py-8'>Đang tải...</div>}
          {error && (
            <div className='text-center py-8 text-red-500'>{error}</div>
          )}

          {!loading && !error && (
            <div className='space-y-6'>
              {filtered
                .filter((c) =>
                  activeCategory ? c.id === activeCategory : true,
                )
                .map((category, idx) => (
                  <ServiceSection
                    key={category.id}
                    category={category}
                    index={idx}
                  />
                ))}
            </div>
          )}

          <Testimonials />
          <BookingSection />
          <Footer />
        </main>

        <CartPanel />
        <BookingConfirm />
      </div>
    </CartProvider>
  );
}
