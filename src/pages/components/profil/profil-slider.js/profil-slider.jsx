import React, { useState } from 'react';
import { Navigation, FreeMode, Thumbs, Scrollbar, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Book } from '../../book';

export const ProfilSlider = ({ books, style }) => {
  const [slider, setSlider] = useState(null);

  return (
    <>
      <div className={style['history-slider-wrapper']}>
        <Swiper
          id='slider'
          onSwiper={setSlider}
          modules={[FreeMode, Navigation, Pagination]}
          slidesPerView='1'
          breakpoints={{
            767: {
              slidesPerView: 3,
            },
            1439: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={30}
          navigation={true}
          grabCursor={true}
          pagination={{
            el: '.history__pagination',
            type: 'bullets',
            clickable: 'true',
          }}
          className={style.mySwiper}
          data-test-id='slide-big'
        >
          {books &&
            books.map((element, index) => (
              <SwiperSlide key={`slide${index + 1}`}>
                <div className={style['history-slider']} data-test-id='history-slide'>
                  <Book product={element} type='history' />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div className={style['history-pagination-wrapper']}>
        <div className='history__pagination' />
      </div>
    </>
  );
};
