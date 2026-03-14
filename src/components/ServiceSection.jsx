import React from 'react';
import ServiceCard from './ServiceCard';

export default function ServiceSection({ category, index = 0 }) {
  const reverse = index % 2 === 1;

  return (
    <section className='grid md:grid-cols-2 gap-8 items-start'>
      <div className={reverse ? 'order-2 md:order-1' : 'order-2'}>
        <h3 className='text-2xl font-semibold mb-4 flex items-baseline gap-4'>
          <span className='text-brand-50'>{category.title}</span>
          <span className='text-sm text-brand-200'>
            · {category.items.length} dịch vụ
          </span>
        </h3>

        <ul className='space-y-4'>
          {category.items.map((s) => (
            <li key={s.id}>
              <ServiceCard item={s} />
            </li>
          ))}
        </ul>
      </div>

      <div className={reverse ? 'order-1 md:order-2' : 'order-1'}>
        <div className='w-full h-72 md:h-96 bg-gradient-to-tr from-brand-800/30 to-brand-700/20 rounded overflow-hidden relative'>
          <img
            alt={category.title}
            src={category.image}
            className='w-full h-full object-cover transform transition-transform duration-500 hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-brand-900/40'></div>
        </div>
      </div>
    </section>
  );
}
