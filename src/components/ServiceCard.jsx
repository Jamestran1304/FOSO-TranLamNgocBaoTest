import React, { useState } from 'react';

export default function ServiceCard({
  item,
  onBook = () => {},
  compact = false,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className='border-b border-white/10 pb-3 transition-colors hover:bg-white/2 rounded-sm'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex-1 min-w-0'>
          <div className='font-medium truncate'>{item.name}</div>
          <div className='text-sm text-white/70 truncate'>
            {item.description}
          </div>
        </div>

        <div className='text-right flex items-center gap-3'>
          <div className='text-sm font-semibold'>{item.price}</div>

          <button
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition'
            aria-label={open ? 'Thu gọn' : 'Mở rộng'}
          >
            <span
              className={`transform transition ${open ? 'rotate-45' : 'rotate-0'}`}
            >
              +
            </span>
          </button>

          {!compact && (
            <button
              onClick={() => onBook(item)}
              className='ml-2 px-3 py-1 bg-rose-500 text-white rounded text-sm hover:bg-rose-600 transition'
              aria-label={`Đặt lịch ${item.name}`}
            >
              Đặt lịch
            </button>
          )}
        </div>
      </div>

      <div
        className={`mt-3 text-sm text-white/70 overflow-hidden transition-all duration-300 ${open ? 'max-h-40' : 'max-h-0'}`}
      >
        <p>{open ? 'Chi tiết: ' + item.description : ''}</p>
      </div>
    </div>
  );
}
