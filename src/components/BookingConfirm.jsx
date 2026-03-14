import React, { useState } from 'react';
import { useCartState, useCartDispatch } from '../context/CartContext';

export default function BookingConfirm() {
  const state = useCartState();
  const dispatch = useCartDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  if (!state.confirmOpen) return null;

  function close() {
    dispatch({ type: 'CLOSE_CONFIRM' });
  }

  function submit() {
    // simple submit flow
    dispatch({ type: 'CLEAR' });
    setShowSuccess(true);
  }

  function closeSuccess() {
    setShowSuccess(false);
    dispatch({ type: 'CLOSE_CONFIRM' });
    dispatch({ type: 'SET_OPEN', open: false });
  }

  return (
    <div className='fixed inset-0 flex'>
      <div className='flex-1' onClick={close} />
      <div className='w-80 bg-white p-4 shadow-lg'>
        <div className='flex items-center justify-between mb-3'>
          <div className='font-semibold'>Xác nhận</div>
          <button onClick={close}>✕</button>
        </div>

        <div className='mb-3'>
          <label className='text-sm'>Tên</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full border rounded px-2 py-1 mt-1'
          />
        </div>

        <div className='mb-3'>
          <label className='text-sm'>Số điện thoại</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='w-full border rounded px-2 py-1 mt-1'
          />
        </div>

        <button
          onClick={submit}
          className='w-full py-2 bg-gray-800 text-white rounded'
        >
          Đặt lịch
        </button>
      </div>

      {showSuccess && (
        <div className='fixed inset-0 flex items-center justify-center'>
          <div
            className='absolute inset-0 bg-black/30'
            onClick={closeSuccess}
          />
          <div className='bg-white p-6 rounded shadow'>
            <div className='font-semibold text-lg mb-2'>
              Gửi yêu cầu thành công!
            </div>
            <div className='text-sm text-gray-600 mb-4'>
              Chúng tôi sẽ liên hệ lại với bạn sớm nhất.
            </div>
            <button
              onClick={closeSuccess}
              className='px-4 py-2 bg-gray-800 text-white rounded'
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
