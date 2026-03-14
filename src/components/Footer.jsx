import React from 'react';

export default function Footer() {
  return (
    <footer className='mt-12 bg-[#22180f] text-white'>
      <div className='container mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
          {/* left: logo and brand */}
          <div>
            <div className='flex items-center gap-4'>
              <div className='w-14 h-14 rounded-full bg-white/5 flex items-center justify-center'>
                {/* emblem placeholder */}
                <span className='text-sm font-medium'>OM</span>
              </div>
              <div>
                <div className='text-xl font-medium'>THE OM</div>
                <div className='text-sm text-white/70'>LOUNGE</div>
              </div>
            </div>

            <div className='flex items-center gap-4 mt-6'>
              <a href='#' className='text-white/70 hover:text-white'>
                f
              </a>
              <a href='#' className='text-white/70 hover:text-white'>
                t
              </a>
              <a href='#' className='text-white/70 hover:text-white'>
                ig
              </a>
            </div>
          </div>

          {/* center: nav columns */}
          <div className='flex justify-center'>
            <div className='grid grid-cols-2 gap-8'>
              <div>
                <ul className='space-y-3 text-white/70'>
                  <li className='text-xs uppercase tracking-wider text-white/40'>
                    Sitemap
                  </li>
                  <li>
                    <a href='#' className='hover:underline'>
                      Trang chủ
                    </a>
                  </li>
                  <li>
                    <a href='#' className='hover:underline'>
                      Giới thiệu
                    </a>
                  </li>
                  <li>
                    <a href='#' className='hover:underline'>
                      Dịch vụ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <ul className='space-y-3 text-white/70'>
                  <li className='text-xs uppercase tracking-wider text-white/40'>
                    Liên hệ
                  </li>
                  <li className='text-sm'>+84 89 812 12 97</li>
                  <li className='text-sm'>6 Đường G, Phú Mỹ, Quận 7</li>
                  <li className='text-sm'>TP Hồ Chí Minh</li>
                </ul>
              </div>
            </div>
          </div>

          {/* right: contact + CTA */}
          <div className='flex flex-col items-end'>
            <div className='text-sm text-white/70 mb-4'>
              Thứ2 - Thứ6: 09:00 - 19:00
              <br />
              Thứ7 - Chủ nhật: 09:00 - 20:00
            </div>

            <div className='mt-auto'>
              <button className='rounded-full border border-yellow-400 px-10 py-4 text-sm text-yellow-300 hover:bg-yellow-400/5 transition'>
                Đặt lịch ngay
              </button>
            </div>
          </div>
        </div>

        <div className='mt-8 text-xs text-white/50 text-right'>
          © 2025 — Copyright The OM Lounge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
