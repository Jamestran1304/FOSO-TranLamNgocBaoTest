import React from 'react';
import { useCartState, useCartDispatch } from '../context/CartContext';

function CartButton() {
  const state = useCartState();
  const dispatch = useCartDispatch();
  const count = state.items.reduce((s, i) => s + i.qty, 0);

  return (
    <button
      onClick={() => dispatch({ type: 'SET_OPEN', open: !state.open })}
      className='relative inline-flex items-center gap-2 px-3 py-2 rounded bg-gray-100'
      aria-label='Open cart'
    >
      <span>🛒</span>
      <span className='text-sm'>Giỏ hàng</span>
      {count > 0 && (
        <span className='absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs'>
          {count}
        </span>
      )}
    </button>
  );
}

export default function Header() {
  return (
    <header className='py-4 border-b'>
      <div className='container mx-auto px-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold'>
            OM
          </div>
          <div>
            <div className='text-sm font-semibold'>THE OM LOUNGE</div>
            <div className='text-xs text-gray-600'>Nails & Spa</div>
          </div>
        </div>

        <nav className='hidden md:flex gap-6 items-center text-sm'>
          <a className='text-gray-700' href='#'>
            Trang chủ
          </a>
          <a className='text-gray-700' href='#'>
            Giới thiệu
          </a>
          <a className='text-gray-700' href='#'>
            Dịch vụ
          </a>
          <a className='text-gray-700' href='#'>
            Tin tức
          </a>
        </nav>

        <div className='flex items-center gap-3'>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
