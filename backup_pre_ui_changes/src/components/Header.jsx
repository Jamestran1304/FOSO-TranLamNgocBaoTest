import React from 'react';
import { useCartState, useCartDispatch } from '../context/CartContext';

function CartButton() {
  const state = useCartState();
  const dispatch = useCartDispatch();
  const count = state.items.reduce((s, i) => s + i.qty, 0);

  return (
    <button
      onClick={() => dispatch({ type: 'SET_OPEN', open: !state.open })}
      className='relative inline-flex items-center gap-2 px-3 py-2 rounded bg-brand-800/30 hover:bg-brand-800/40'
      aria-label='Open cart'
    >
      <span>🛒</span>
      <span className='text-sm text-brand-200'>Giỏ hàng</span>
      {count > 0 && (
        <span className='absolute -top-2 -right-2 bg-brand-50 text-brand-900 rounded-full w-6 h-6 flex items-center justify-center text-xs'>
          {count}
        </span>
      )}
    </button>
  );
}

export default function Header() {
  return (
    <header className='py-6'>
      <div className='container mx-auto px-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center font-semibold text-brand-50'>
            OM
          </div>
          <div>
            <div className='text-sm text-brand-100'>THE OM LOUNGE</div>
            <div className='text-xs text-brand-200'>Nails & Spa</div>
          </div>
        </div>

        <nav className='hidden md:flex gap-6 items-center text-sm'>
          <a className='text-brand-100/90 hover:text-brand-50' href='#'>
            Trang chủ
          </a>
          <a className='text-brand-100/90 hover:text-brand-50' href='#'>
            Giới thiệu
          </a>
          <a className='text-brand-100/90 hover:text-brand-50' href='#'>
            Dịch vụ
          </a>
          <a className='text-brand-100/90 hover:text-brand-50' href='#'>
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
