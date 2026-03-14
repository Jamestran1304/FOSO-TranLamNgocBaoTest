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
    // remove non-digit
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

  const total = state.items.reduce((acc, it) => {
    const p = parsePriceToNumber(it.price);
    return acc + p * (it.qty || 1);
  }, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[360px] bg-brand-50 text-brand-900 shadow-2xl transform transition-transform z-50 ${
        state.open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className='flex flex-col h-full'>
        <div className='px-6 py-6 border-b border-brand-200'>
          <div className='flex items-center justify-between'>
            <h4 className='text-2xl font-serif text-brand-700'>Giỏ Hàng</h4>
            <button
              aria-label='Đóng giỏ hàng'
              onClick={() => dispatch({ type: 'SET_OPEN', open: false })}
              className='text-brand-700 text-xl'
            >
              ✕
            </button>
          </div>
        </div>

        <div className='flex-1 overflow-auto px-4 py-4'>
          {state.items.length === 0 && (
            <div className='text-sm text-brand-700'>Giỏ hàng trống.</div>
          )}

          <div className='space-y-3'>
            {state.items.map((it) => (
              <div
                key={it.id}
                className='bg-transparent rounded-md p-2 flex flex-col border-b border-brand-200/60'
              >
                <div className='flex items-start gap-3'>
                  <img
                    src={it.photo || '/assets/thumb-placeholder.png'}
                    alt={it.name}
                    className='w-16 h-16 rounded object-cover flex-shrink-0'
                  />

                  <div className='flex-1'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <div className='font-medium text-sm text-brand-900'>
                          {it.name}
                        </div>
                        <div className='text-xs text-brand-700'>
                          {it.description}
                        </div>
                      </div>
                      <button
                        onClick={() => dispatch({ type: 'REMOVE', id: it.id })}
                        className='text-brand-700 ml-2'
                        aria-label={`Xóa ${it.name}`}
                      >
                        ✕
                      </button>
                    </div>

                    <div className='mt-3 flex items-center justify-between'>
                      <div className='text-sm text-brand-700'>
                        {formatCurrency(parsePriceToNumber(it.price))}
                      </div>

                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() =>
                            dispatch({ type: 'DECREMENT', id: it.id })
                          }
                          className='w-8 h-8 rounded-full border border-brand-300 bg-white text-brand-700 flex items-center justify-center'
                          aria-label='Giảm số lượng'
                        >
                          −
                        </button>
                        <div className='w-10 text-center'>{it.qty || 1}</div>
                        <button
                          onClick={() =>
                            dispatch({ type: 'INCREMENT', id: it.id })
                          }
                          className='w-8 h-8 rounded-full border border-brand-300 bg-white text-brand-700 flex items-center justify-center'
                          aria-label='Tăng số lượng'
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* support for small variant lines (optional) */}
                {it.variants && it.variants.length > 0 && (
                  <div className='mt-3 space-y-2'>
                    {it.variants.map((v) => (
                      <div
                        key={v.id}
                        className='flex items-center justify-between'
                      >
                        <div className='flex items-center gap-2'>
                          <img
                            src={v.photo}
                            alt=''
                            className='w-8 h-8 rounded object-cover'
                          />
                          <div className='text-sm text-brand-700'>
                            {v.label}
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <button className='w-8 h-6 rounded-full border border-brand-300 bg-white text-brand-700'>
                            −
                          </button>
                          <div className='w-6 text-center'>{v.qty || 1}</div>
                          <button className='w-8 h-6 rounded-full border border-brand-300 bg-white text-brand-700'>
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className='px-6 pb-6'>
          <div className='flex items-center justify-between bg-brand-50 p-3 rounded border border-brand-200'>
            <div className='flex items-center gap-3'>
              <div className='text-sm text-brand-700'>Kỹ thuật viên</div>
              <div className='flex items-center gap-2'>
                <img
                  src='/assets/avatar1.png'
                  alt=''
                  className='w-8 h-8 rounded-full'
                />
                <div className='text-sm text-brand-900'>Võ Thị Bích Phượng</div>
              </div>
            </div>
            <div className='text-brand-700'>›</div>
          </div>

          <div className='mt-4 flex items-center justify-between'>
            <div className='text-sm text-brand-700'>Tổng thanh toán</div>
            <div className='text-2xl font-semibold text-pink-600'>
              {formatCurrency(total)}
            </div>
          </div>

          <button
            onClick={() => {
              // open booking confirm and close cart
              dispatch({ type: 'SET_OPEN', open: false });
              dispatch({ type: 'OPEN_CONFIRM' });
            }}
            className='mt-4 w-full py-3 rounded bg-brand-700 text-brand-50 flex items-center justify-center gap-2'
          >
            Tiếp Tục
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
