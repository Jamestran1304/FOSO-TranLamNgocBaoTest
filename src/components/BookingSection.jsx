import React from 'react';

export default function BookingSection() {
  return (
    <section id='booking' className='mt-16'>
      <div className='w-full rounded overflow-hidden relative'>
        <img
          src='/assets/booking.png'
          alt='booking background'
          className='w-full h-96 md:h-[420px] object-cover'
        />

        {/* warm gold overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-brand-700/55 to-brand-900/55'></div>

        <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-6'>
          <h2 className='text-3xl md:text-5xl font-light text-brand-50 mb-3 leading-tight'>
            Đặt lịch hẹn chữa lành
          </h2>

          <p className='text-sm text-brand-200 max-w-2xl mb-6'>
            Đến The OM Lounge để xả stress và làm mới mình. Vẻ đẹp bắt đầu từ
            những điều nhỏ nhất và lan tỏa đến cả tâm hồn.
          </p>

          <div className='flex gap-3'>
            {/* Primary CTA: scroll to footer */}
            <button
              onClick={() => {
                const el = document.getElementById('footer');
                if (el)
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className='px-6 py-2 rounded text-sm bg-white text-brand-900 border border-brand-300 shadow-sm hover:shadow-md transition'
            >
              TRẢI NGHIỆM NGAY
            </button>

            {/* Secondary CTA: scroll to footer as well (keeps behavior consistent) */}
            <button
              onClick={() => {
                const el = document.getElementById('footer');
                if (el)
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className='px-5 py-2 rounded text-sm bg-transparent text-brand-50 border border-brand-50/40 hover:bg-brand-800/20 transition'
            >
              Gọi đặt lịch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
