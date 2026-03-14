import React from 'react';
import ServiceCard from './ServiceCard';

export default function ServiceSection({ category }) {
  return (
    <section className='grid md:grid-cols-2 gap-6 items-start'>
      <div>
        <h3 className='text-xl font-semibold mb-3'>
          {category.title}{' '}
          <span className='text-sm text-gray-500'>
            · {category.items.length} dịch vụ
          </span>
        </h3>

        <ul className='space-y-3'>
          {category.items.map((s) => (
            <li key={s.id}>
              <ServiceCard item={s} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className='w-full h-64 rounded overflow-hidden bg-gray-100'>
          <img
            alt={category.title}
            src={category.image}
            className='w-full h-full object-cover'
          />
        </div>
      </div>
    </section>
  );
}
