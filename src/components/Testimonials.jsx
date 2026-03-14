import React from 'react';

const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Thuỳ Đỗ',
    photo: '/assets/cust2.png',
    text: 'Không gian rất đẹp và nhân viên thân thiện.',
  },
  {
    id: 't2',
    name: 'Lan Phạm',
    photo: '/assets/cust1.png',
    text: 'Chất lượng dịch vụ ổn, sẽ quay lại.',
  },
  {
    id: 't3',
    name: 'John Doe',
    photo: '/assets/cust3.png',
    text: 'Trải nghiệm tốt, khuyên mọi người thử.',
  },
];

export default function Testimonials() {
  return (
    <section className='my-10'>
      <div className='container mx-auto px-6 text-center'>
        <h3 className='text-2xl font-semibold mb-4'>Khách Hàng</h3>
        <div className='grid md:grid-cols-3 gap-4'>
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className='bg-gray-50 p-4 rounded'>
              <img
                src={t.photo}
                alt={t.name}
                className='w-full h-40 object-cover rounded'
              />
              <div className='mt-3 font-medium'>{t.name}</div>
              <p className='text-sm text-gray-600 mt-1'>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
