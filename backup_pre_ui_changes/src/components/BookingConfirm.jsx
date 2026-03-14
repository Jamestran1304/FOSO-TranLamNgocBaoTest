import React, { useState } from 'react';
import { useCartState, useCartDispatch } from '../context/CartContext';

const DAYS = [
  { id: 'd1', label: 'Thứ 5', date: '04/09' },
  { id: 'd2', label: 'Thứ 6', date: '05/09' },
  { id: 'd3', label: 'Thứ 7', date: '06/09' },
  { id: 'd4', label: 'Chủ Nhật', date: '07/09' },
];

const TIMES = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
  '06:30 PM',
];

export default function BookingConfirm() {
  const state = useCartState();
  const dispatch = useCartDispatch();

  const [name, setName] = useState('Thuỳ Đỗ');
  const [phone, setPhone] = useState('0969-886-969');
  const [selectedDay, setSelectedDay] = useState(DAYS[2].id);
  const [selectedTime, setSelectedTime] = useState(TIMES[2]);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!state.confirmOpen) return null;

  function close() {
    dispatch({ type: 'CLOSE_CONFIRM' });
  }

  function submit() {
    const payload = {
      customer: { name, phone },
      items: state.items,
      day: DAYS.find((d) => d.id === selectedDay),
      time: selectedTime,
    };
    console.log('Booking payload', payload);
    // clear cart, then show success modal. Keep confirm panel mounted until user closes success.
    dispatch({ type: 'CLEAR' });
    setShowSuccess(true);
  }

  function closeSuccess() {
    setShowSuccess(false);
    // close panels after success acknowledged
    dispatch({ type: 'CLOSE_CONFIRM' });
    dispatch({ type: 'SET_OPEN', open: false });
  }

  return (
    <div className='fixed inset-0 z-60 flex items-stretch'>
      <div className='flex-1' onClick={close} />
      <div className='w-[360px] h-full bg-brand-50 text-brand-900 shadow-2xl overflow-auto'>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-2xl font-serif'>Xác Nhận Đặt Lịch</h3>
            <button onClick={close} aria-label='Đóng' className='text-lg'>
              ✕
            </button>
          </div>

          <div className='mb-4'>
            <label className='block text-xs text-brand-700'>
              Tên khách hàng
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full bg-transparent border-b border-brand-200 py-2'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-xs text-brand-700'>
              Số điện thoại
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='w-full bg-transparent border-b border-brand-200 py-2'
            />
          </div>

          <div className='mb-3'>
            <div className='text-sm text-brand-700 mb-2'>Chọn ngày</div>
            <div className='flex gap-2'>
              {DAYS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDay(d.id)}
                  className={`py-2 px-3 rounded w-full text-sm ${selectedDay === d.id ? 'bg-yellow-400/80 text-brand-900' : 'bg-white/60 text-brand-700'}`}
                >
                  <div className='text-xs'>{d.label}</div>
                  <div className='text-sm font-medium'>{d.date}</div>
                </button>
              ))}
            </div>
          </div>

          <div className='mb-4'>
            <div className='text-sm text-brand-700 mb-2'>Chọn khung giờ</div>
            <div className='grid grid-cols-3 gap-2'>
              {TIMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-3 text-sm rounded ${selectedTime === t ? 'bg-brand-700 text-brand-50' : 'bg-white/60 text-brand-700'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className='mt-6'>
            <button
              onClick={submit}
              className='w-full py-3 rounded bg-brand-700 text-white'
            >
              Đặt Lịch
            </button>
          </div>
        </div>
      </div>

      {/* Success modal shown on top of confirm panel */}
      {showSuccess && (
        <div className='fixed inset-0 flex items-center justify-center z-70'>
          <div
            className='absolute inset-0 bg-black/30'
            onClick={closeSuccess}
          />
          <div className='relative bg-brand-50 text-brand-900 rounded-lg w-[560px] p-8 shadow-xl'>
            <button
              className='absolute top-3 right-3 text-brand-700 text-xl'
              onClick={closeSuccess}
            >
              ✕
            </button>
            <div className='flex flex-col items-center gap-4'>
              <div className='w-20 h-20 rounded-full bg-white/60 flex items-center justify-center shadow-md'>
                <div className='w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M4 12l4 4L20 4'
                      stroke='#16a34a'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </div>
              <h4 className='text-2xl font-medium'>Gửi Yêu Cầu Thành Công!</h4>
              <p className='text-sm text-brand-700 text-center max-w-[44ch]'>
                Cảm ơn bạn đã đặt dịch vụ tại The OM Lounge. Chúng tôi đã nhận
                được thông tin đặt lịch từ bạn và sẽ liên hệ lại trong thời gian
                sớm nhất.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
