import React from 'react';

export default function Footer() {
  return (
    <footer id='footer' className='mt-12 bg-brand-900 text-brand-50'>
      <div className='container mx-auto px-6 py-12 grid md:grid-cols-3 gap-8'>
        <div>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center font-semibold text-brand-50'>
              OM
            </div>
            <div>
              <div className='text-base'>THE OM LOUNGE</div>
              <div className='text-xs text-brand-200'>Nails & Spa</div>
            </div>
          </div>

          <p className='text-sm text-brand-200 max-w-sm'>
            Không gian thư giãn dành cho bạn. Hãy đặt lịch để trải nghiệm dịch
            vụ chuyên nghiệp và tận hưởng phút giây thư thái.
          </p>
        </div>

        <div className='flex justify-between md:justify-center'>
          <ul className='space-y-2 text-sm text-brand-200'>
            <li className='font-semibold text-brand-50 mb-2'>Menu</li>
            <li>Trang chủ</li>
            <li>Giới thiệu</li>
            <li>Dịch vụ</li>
            <li>Tin tức</li>
          </ul>
        </div>

        <div className='text-sm text-brand-200'>
          <div className='mb-3 font-semibold text-brand-50'>Liên hệ</div>
          <div>+84 90 123 4567</div>
          <div className='mt-3'>
            <div className='font-semibold text-brand-50'>Giờ làm việc</div>
            <div className='text-sm'>T2 - T6: 09:00 - 19:00</div>
            <div className='text-sm'>T7 - CN: 09:00 - 17:00</div>
          </div>
        </div>

        {/* Floating CTA oval - positioned via relative container */}
        <div className='md:col-span-3 relative'>
          <div className='absolute right-6 top-0 transform translate-y-1/2'>
            <button
              onClick={() => {
                const el = document.getElementById('booking');
                if (el)
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className='px-8 py-4 rounded-full border-2 border-brand-50 text-brand-50 bg-transparent hover:bg-brand-700/40 transition'
            >
              Đặt lịch ngay
            </button>
          </div>
        </div>
      </div>

      <div className='text-center py-6 text-sm text-brand-200 bg-brand-800/40'>
        © 2026 The OM Lounge — All rights reserved
      </div>
    </footer>
  );
}
