import React, { useRef, useState } from 'react';
import { Navigation, FreeMode, Thumbs, Scrollbar, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageBook } from '../image-book';
import { BASE_URL } from '../../../redux';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const Slider = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [slider, setSlider] = useState(null);
  console.log('images', images);

  return (
    <>
      <div className='book-page__image'>
        <Swiper
          id='slider'
          onSwiper={setSlider}
          onResize={(swiper) => {
            swiper.update();
          }}
          modules={[FreeMode, Navigation, Thumbs, Pagination]}
          scrollbar={false}
          spaceBetween={50}
          initialSlide={2}
          navigation={true}
          grabCursor={true}
          observer={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          breakpoints={{
            320: {
              pagination: {
                el: '.mySwiper__pagination',
                type: 'bullets',
                clickable: 'true',
              },
            },
            769: {
              pagination: 'false',
            },
          }}
          className='mySwiper'
          data-test-id='slide-big'
        >
          {images ? (
            images.map((element, index) => (
              <SwiperSlide key={`slide${index + 1}`}>
                <ImageBook
                  src={element.url ? `${BASE_URL}${element.url}` : ''}
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
      {images && images.length > 1 ? (
        <div className='image__pagination'>
          <Swiper
            id='image-pagination'
            onSwiper={setThumbsSwiper}
            onResize={(swiper) => {
              swiper.update(swiper);
            }}
            spaceBetween={30}
            slidesPerView={5}
            width={445}
            freeMode={true}
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
              images.map((element, index) => (
                <SwiperSlide key={`slide${index + 1}`} data-test-id='slide-mini'>
                  <ImageBook
                    src={element.url ? `${BASE_URL}${element.url}` : ''}
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
      <div className='mySwiper__pagination' />
      <div className='scrollbar' />
    </>
  );
};
