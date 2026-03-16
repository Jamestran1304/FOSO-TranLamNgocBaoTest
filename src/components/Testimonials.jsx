import React, { useEffect, useState, useRef } from 'react';

const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Thuỳ Đỗ',
    avatar: '/assets/avatar1.png',
    photo: '/assets/cust2.png',
    text: 'Mỗi lần ghé The OM Lounge là một lần mình tự thưởng cho bản thân. Mình rất thích không gian ở đây, vừa sang trọng vừa ấm cúng.',
  },
  {
    id: 't2',
    name: 'Thuỳ Đỗ',
    avatar: '/assets/avatar2.png',
    photo: '/assets/cust1.png',
    text: 'Bộ nail thì khỏi chê luôn, tay nghề giữ màu rất tốt. Nhân viên thân thiện, mình sẽ quay lại.',
  },
  {
    id: 't3',
    name: 'John Doe',
    avatar: '/assets/avatar3.png',
    photo: '/assets/cust3.png',
    text: 'Dịch vụ nhanh chóng và chất lượng. Mình rất ấn tượng với không gian và phong cách phục vụ.',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const AUTO_PLAY_INTERVAL = 4500;

  const n = TESTIMONIALS.length;

  useEffect(() => {
    if (isPaused || n <= 1) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = setTimeout(() => {
      setActive((a) => (a + 1) % n);
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [active, isPaused, n]);

  const idx = (offset) => (active + offset + n) % n;

  return (
    <section className='mt-0 mb-0'>
      <div
        className='relative'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background */}
        <div
          className='w-full h-[620px] md:h-[660px] bg-cover bg-center overflow-hidden'
          style={{ backgroundImage: "url('/assets/reviews.png')" }}
        />

        {/* Overlay and content */}
        <div className='absolute inset-0 flex flex-col items-center'>
          <div className='pt-12 text-center z-10'>
            <div className='text-xs md:text-sm text-brand-200 tracking-[0.3em] mb-1 uppercase'>
              NHẬN XÉT TỪ
            </div>
            <h3 className='text-[32px] md:text-[40px] font-light text-brand-50 mb-6 leading-tight'>
              Khách Hàng
            </h3>
          </div>

          <div className='container mx-auto px-6 z-10'>
            <div className='relative mt-4 md:mt-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-end'>
                {[-1, 0, 1].map((offset) => {
                  const t = TESTIMONIALS[idx(offset)];
                  const isCenter = offset === 0;
                  const cardClass = isCenter
                    ? 'translate-y-0 scale-[1.02] z-20'
                    : 'translate-y-4 scale-[0.96] opacity-90 z-10';
                  const w = isCenter ? 'w-80 md:w-96' : 'w-64 md:w-64';

                  return (
                    <div key={t.id} className='flex justify-center'>
                      <div
                        className={`${w} bg-transparent transition-all duration-400 ${cardClass}`}
                      >
                        <div
                          className={`overflow-hidden rounded-md ${isCenter ? 'shadow-2xl' : 'shadow-lg'}`}
                        >
                          <img
                            src={t.photo}
                            alt={t.name}
                            className={`${isCenter ? 'w-full h-64 md:h-80' : 'w-full h-44'} object-cover`}
                          />
                        </div>
                        <div className='mt-4 text-brand-50'>
                          <div className='flex items-center gap-3'>
                            <img
                              src={t.avatar}
                              alt=''
                              className={`${isCenter ? 'w-12 h-12' : 'w-10 h-10'} rounded-full object-cover`}
                            />
                            <div>
                              <div
                                className={`${isCenter ? 'font-semibold text-lg' : 'font-semibold'}`}
                              >
                                {t.name}
                              </div>
                              <div className='text-xs text-brand-200'>
                                Xem thêm
                              </div>
                            </div>
                          </div>
                          <p className='mt-3 text-sm text-brand-200 leading-relaxed'>
                            {isCenter ? t.text : t.text.slice(0, 120) + '...'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-brand-900/40'></div>
        </div>
      </div>
    </section>
  );
}
