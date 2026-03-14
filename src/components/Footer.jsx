import React from 'react';

export default function Footer() {
  return (
    <footer id='footer' className='mt-8 border-t'>
      <div className='container mx-auto px-6 py-8 grid md:grid-cols-3 gap-6'>
        <div>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold'>
              OM
            </div>
            <div>
              <div className='text-sm font-semibold'>THE OM LOUNGE</div>
              <div className='text-xs text-gray-600'>Nails & Spa</div>
            </div>
          </div>
          <p className='text-sm text-gray-600'>
            Không gian thư giãn dành cho bạn. Hãy đặt lịch để trải nghiệm dịch
            vụ chuyên nghiệp.
          </p>
        </div>

        <div>
          <ul className='space-y-2 text-sm text-gray-700'>
            <li className='font-semibold'>Menu</li>
            <li>Trang chủ</li>
            <li>Giới thiệu</li>
            <li>Dịch vụ</li>
            <li>Tin tức</li>
          </ul>
        </div>

        <div className='text-sm text-gray-700'>
          <div className='mb-1 font-semibold'>Liên hệ</div>
          <div>+84 90 123 4567</div>
          <div className='mt-3'>
            <div className='font-semibold'>Giờ làm việc</div>
            <div className='text-sm'>T2 - T6: 09:00 - 19:00</div>
            <div className='text-sm'>T7 - CN: 09:00 - 17:00</div>
          </div>
        </div>
      </div>

      <div className='text-center py-4 text-sm text-gray-600'>
        © 2026 The OM Lounge — All rights reserved
      </div>
    </footer>
  );
}
