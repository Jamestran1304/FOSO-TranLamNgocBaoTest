import React from 'react';

export default function BookingSection() {
  return (
    <section id='booking' className='my-8'>
      <div className='container mx-auto px-6 text-center'>
        <h2 className='text-2xl font-semibold mb-2'>Đặt lịch hẹn chữa lành</h2>
        <p className='text-sm text-gray-600 max-w-2xl mx-auto mb-4'>
          Đến The OM Lounge để xả stress và làm mới mình.
        </p>
        <div className='flex justify-center gap-3'>
          <button
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
              })
            }
            className='px-4 py-2 bg-gray-800 text-white rounded'
          >
            Trải nghiệm ngay
          </button>
          <button
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
              })
            }
            className='px-4 py-2 border rounded'
          >
            Gọi đặt lịch
          </button>
        </div>
      </div>
    </section>
  );
}
