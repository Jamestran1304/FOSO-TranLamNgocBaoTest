import React from 'react';
import { useCartState, useCartDispatch } from '../context/CartContext';

function parsePriceToNumber(p) {
  if (typeof p === 'number') return p;
  if (typeof p === 'string') {
    const trimmed = p.trim();
    if (trimmed.endsWith('k')) {
      const n = Number(trimmed.replace('k', ''));
      return isNaN(n) ? 0 : n * 1000;
    }
    const digits = trimmed.replace(/[^0-9]/g, '');
    return Number(digits) || 0;
  }
  return 0;
}

function formatCurrency(n) {
  return n.toLocaleString('vi-VN') + ' đ';
}

export default function CartPanel() {
  const state = useCartState();
  const dispatch = useCartDispatch();

  const total = state.items.reduce(
    (acc, it) => acc + parsePriceToNumber(it.price) * (it.qty || 1),
    0,
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition ${state.open ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className='flex flex-col h-full'>
        <div className='p-4 border-b flex items-center justify-between'>
          <div className='font-semibold'>Giỏ Hàng</div>
          <button onClick={() => dispatch({ type: 'SET_OPEN', open: false })}>
            ✕
          </button>
        </div>

        <div className='flex-1 overflow-auto p-4'>
          {state.items.length === 0 ? (
            <div className='text-sm text-gray-600'>Giỏ hàng trống.</div>
          ) : (
            state.items.map((it) => (
              <div key={it.id} className='flex items-start gap-3 mb-3'>
                <div className='flex-1'>
                  <div className='font-medium'>{it.name}</div>
                  <div className='text-sm text-gray-600'>{it.description}</div>
                </div>
                <div className='text-sm'>
                  {formatCurrency(parsePriceToNumber(it.price))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className='p-4 border-t'>
          <div className='flex items-center justify-between mb-3'>
            <div className='text-sm text-gray-600'>Tổng</div>
            <div className='font-semibold'>{formatCurrency(total)}</div>
          </div>
          <button
            onClick={() => {
              dispatch({ type: 'SET_OPEN', open: false });
              dispatch({ type: 'OPEN_CONFIRM' });
            }}
            className='w-full py-2 bg-gray-800 text-white rounded'
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
}
