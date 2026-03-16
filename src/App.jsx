import React, { useMemo } from 'react';
import Header from './components/Header';
import ServiceSection from './components/ServiceSection';
import Testimonials from './components/Testimonials';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import CartPanel from './components/CartPanel';
import BookingConfirm from './components/BookingConfirm';
import { CartProvider } from './context/CartContext';
import { fetchServices } from './lib/api';
import { useEffect, useState } from 'react';

export default function App() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
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
          (it.name + ' ' + (it.description || '')).toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [services, query]);

  return (
    <CartProvider>
      <div className='min-h-screen text-white bg-brand-900'>
        {/* Global background: image + continuous brand gradient for “liền lạc” feel */}
        <div className='relative'>
          <div className='absolute inset-0 bg-[url("/service.png")] bg-cover bg-center opacity-60' />
          <div className='absolute inset-0 bg-gradient-to-b from-brand-800/70 via-brand-700/35 to-brand-900/95' />
          <div className='absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(236,220,203,0.14)_0%,rgba(58,34,20,0)_55%)]' />

          <div className='relative backdrop-blur-[2px]'>
            <Header />
            <main className='container mx-auto px-6 py-10'>
            <section className='mb-10'>
              <h2 className='text-5xl font-light text-center mb-2'>Dịch Vụ</h2>
              <p className='text-center text-sm text-white/70'>
                Gói combo, Medicure, Pedicure — Tham khảo giá và mô tả
              </p>
            </section>

            <section className='flex flex-col md:flex-row items-center justify-between gap-4'>
              <div className='flex gap-3 overflow-x-auto pb-2'>
                {services.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCategory(c.id)}
                    className={`px-4 py-2 rounded-full text-sm transition whitespace-nowrap ${
                      activeCategory === c.id
                        ? 'bg-white/10 ring-1 ring-white/20'
                        : 'bg-white/5'
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>

              <div className='w-full md:w-1/3 flex items-center'>
                <label className='relative w-full'>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Tìm kiếm dịch vụ...'
                    className='w-full bg-white/5 placeholder-white/40 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-white/20'
                  />
                  <span className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/60'>
                    🔍
                  </span>
                </label>
              </div>
            </section>

            {loading && <div className='text-center py-10'>Đang tải...</div>}
            {error && (
              <div className='text-center py-10 text-red-300'>{error}</div>
            )}

            {!loading && !error && (
              <div className='space-y-10'>
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

            {/* Testimonials / reviews section */}
            {!loading && !error && <Testimonials />}

            {/* Booking hero (moved below testimonials) */}
            {!loading && !error && <BookingSection />}

            {/* Footer */}
            <Footer />
            </main>
          </div>
        </div>

        <CartPanel />
        <BookingConfirm />
      </div>
    </CartProvider>
  );
}
