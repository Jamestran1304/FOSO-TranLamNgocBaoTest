import React, { useState } from 'react';
import { useCartDispatch } from '../context/CartContext';

export default function ServiceCard({ item }) {
  const [open, setOpen] = useState(false);
  const dispatch = useCartDispatch();

  function addToCart() {
    dispatch({
      type: 'ADD',
      item: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
      },
    });
  }

  return (
    <div className='border-b border-brand-800/40 pb-3 group'>
      <div className='flex items-center justify-between gap-4'>
        <div className='min-w-0'>
          <div className='font-medium text-lg truncate text-brand-50'>
            {item.name}
          </div>
          <div className='text-sm text-brand-200 truncate'>
            {item.description}
          </div>
        </div>
        <div className='text-right flex items-center gap-3'>
          <div className='text-sm font-semibold text-brand-50'>
            {item.price}
          </div>
          <button
            aria-label='Thêm vào giỏ'
            onClick={addToCart}
            className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-800/20 hover:bg-brand-700/30 transition-transform duration-200'
          >
            <span className='block transform transition-transform duration-200'>
              +
            </span>
          </button>
        </div>
      </div>

      <div
        style={{
          transition: 'max-height 260ms ease, opacity 200ms ease',
        }}
        className={`mt-3 text-sm text-white/70 overflow-hidden ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {open && (
          <div>
            <p className='mb-2'>Chi tiết dịch vụ: {item.description}</p>
            <p className='text-xs text-white/50'>
              Thời gian ước tính: 30-60 phút · Bao gồm vật tư cơ bản
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
