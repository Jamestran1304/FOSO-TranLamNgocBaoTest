import React from 'react';
import { useCartState, useCartDispatch } from '../context/CartContext';

function parsePriceToNumber(p) {
  if (typeof p === 'number') return p;
  if (typeof p === 'string') {
    const trimmed = p.trim();
    if (trimmed.endsWith('k')) {
      const n = Number(trimmed.replace('k', ''));
      return Number.isNaN(n) ? 0 : n * 1000;
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

  if (!state.open && state.items.length === 0) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition ${
        state.open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div
        className={`flex-1 bg-black/40 transition-opacity ${
          state.open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => dispatch({ type: 'SET_OPEN', open: false })}
      />

      <div
        className={`relative h-full w-[360px] md:w-[400px] bg-[#FFF6EB] text-brand-900 shadow-2xl transform transition-transform duration-300 ${
          state.open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col h-full'>
          {/* header */}
          <div className='px-6 py-5 border-b border-white/40 flex items-center justify-between bg-[#FDF0E0]'>
            <h3 className='text-xl font-serif tracking-wide text-[#9B6A37]'>
              Giỏ Hàng
            </h3>
            <button
              onClick={() => dispatch({ type: 'SET_OPEN', open: false })}
              className='text-sm text-[#9B6A37]'
              aria-label='Đóng giỏ hàng'
            >
              ✕
            </button>
          </div>

          {/* items */}
          <div className='flex-1 overflow-auto px-6 py-4 space-y-4'>
            {state.items.length === 0 ? (
              <div className='text-sm text-gray-600'>Giỏ hàng trống.</div>
            ) : (
              state.items.map((it) => (
                <div
                  key={it.id}
                  className='flex gap-3 pb-4 border-b border-white/40 last:border-0'
                >
                  <div className='w-16 h-16 rounded-md overflow-hidden bg-white/70 flex-shrink-0'>
                    <img
                      src={it.image || '/assets/medicure.png'}
                      alt={it.name}
                      className='w-full h-full object-cover'
                    />
                  </div>

                  <div className='flex-1'>
                    <div className='flex items-start justify-between gap-2'>
                      <div>
                        <div className='font-medium text-sm text-[#5B3A22]'>
                          {it.name}
                        </div>
                        {it.description && (
                          <div className='text-xs text-[#9A826A]'>
                            {it.description}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() =>
                          dispatch({ type: 'REMOVE', id: it.id })
                        }
                        className='text-[11px] text-[#C08A58]'
                        aria-label='Xoá dịch vụ'
                      >
                        ✕
                      </button>
                    </div>

                    <div className='mt-2 flex items-center justify-between'>
                      <div className='flex items-center text-xs text-[#9A826A] gap-2'>
                        <span className='inline-flex items-center gap-1'>
                          <span className='w-1.5 h-1.5 rounded-full bg-[#C08A58]' />
                          <span>Ước tính</span>
                        </span>
                        <span>10 phút</span>
                      </div>

                      <div className='flex items-center gap-2'>
                        <div className='flex items-center border border-[#E2C8A5] rounded-full text-xs overflow-hidden'>
                          <button
                            onClick={() =>
                              dispatch({ type: 'DECREMENT', id: it.id })
                            }
                            className='px-2 py-1 text-[#9B6A37]'
                          >
                            −
                          </button>
                          <span className='px-3 py-1 bg-white/70 text-[#5B3A22]'>
                            {it.qty || 1}
                          </span>
                          <button
                            onClick={() =>
                              dispatch({ type: 'INCREMENT', id: it.id })
                            }
                            className='px-2 py-1 text-[#9B6A37]'
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className='mt-2 text-sm font-medium text-[#5B3A22]'>
                      {formatCurrency(parsePriceToNumber(it.price) * (it.qty || 1))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className='px-6 py-4 border-t border-white/50 bg-[#FDF0E0] space-y-3'>
            <div className='flex items-center justify-between text-xs text-[#9A826A]'>
              <span>Kỹ thuật viên</span>
              <button className='flex items-center gap-2'>
                <div className='w-7 h-7 rounded-full bg-white/80 overflow-hidden flex items-center justify-center'>
                  <span className='text-[10px] text-[#C08A58]'>VP</span>
                </div>
                <span className='text-[13px] text-[#5B3A22] font-medium'>
                  Võ Thị Bích Phượng
                </span>
              </button>
            </div>

            <div className='flex items-center justify-between text-sm'>
              <span className='text-[#9A826A]'>Tổng thanh toán</span>
              <span className='font-semibold text-[#C0392B]'>
                {formatCurrency(total)}
              </span>
            </div>

            <button
              disabled={state.items.length === 0}
              onClick={() => {
                if (state.items.length === 0) return;
                dispatch({ type: 'SET_OPEN', open: false });
                dispatch({ type: 'OPEN_CONFIRM' });
              }}
              className='mt-2 w-full py-3 rounded bg-[#9B6A37] text-white text-sm font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Tiếp Tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
