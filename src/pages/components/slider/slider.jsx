import React, { useState } from 'react';
import { Navigation, FreeMode, Thumbs, Scrollbar, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ImageBook } from '../image/image-book';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const Slider = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [slider, setSlider] = useState(null);

  return (
    <>
      <div className='book-page__image'>
        <Swiper
          id='slider'
          onSwiper={setSlider}
          modules={[FreeMode, Navigation, Thumbs, Pagination]}
          scrollbar={false}
          spaceBetween={50}
          navigation={true}
          grabCursor={true}
          pagination={{
            el: '.mySwiper__pagination',
            type: 'bullets',
            clickable: 'true',
            dynamicBullets: 'true',
            dynamicMainBullets: '7',
          }}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          className='mySwiper'
          data-test-id='slide-big'
        >
          {images ? (
            images?.map((element, index) => (
              <SwiperSlide key={`slide${index + 1}`}>
                <ImageBook
                  src={element.url ? `${element.url}` : ''}
                  width='445'
                  height='593'
                  className='image__book-page'
                />
              </SwiperSlide>
            ))
          ) : (
            <ImageBook src='' width='445' height='593' className='image__book-page' />
          )}
        </Swiper>
      </div>
      {images && images?.length > 1 ? (
        <div className='image__pagination'>
          <Swiper
            id='image-pagination'
            onSwiper={setThumbsSwiper}
            spaceBetween={30}
            slidesPerView={5}
            loop={true}
            width={445}
            watchSlidesProgress={true}
            centeredSlides={true}
            loopedSlides={2}
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode, Navigation, Thumbs, Scrollbar, Pagination]}
            breakpoints={{
              320: {
                scrollbar: 'false',
              },
              769: {
                scrollbar: {
                  el: '.scrollbar',
                  hide: 'true',
                },
              },
            }}
            className='mySwiperPagination'
          >
            {images &&
              images?.map((element, index) => (
                <SwiperSlide key={`slide${index + 1}`} data-test-id='slide-mini'>
                  <ImageBook
                    src={element.url ? `${element.url}` : ''}
                    width='65'
                    height='84'
                    className='pagination-image'
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      ) : (
        ''
      )}
      <div className='my-swiper-pagination-wrapper'>
        <div className='mySwiper__pagination' />
      </div>
      <div className='scrollbar' />
    </>
  );
};
