"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "@styles/index.scss";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const page = () => {
  return (
    <div className="container">
      <h1 className="heading">Flower Gallery</h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          enabled: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {[0, 1, 2, 3, 4].map((num) => (
          <SwiperSlide>
            <div className="border-2 rounded-xl flex items-center text-2xl font-bold justify-center border-gray-400 bg-white opacity-90 mx-2 w-[30rem] h-[30rem] lg:w-[40rem] lg:h-[40rem]">
              {num}
            </div>
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            {/* <ion-icon name="arrow-back-outline"></ion-icon> */}
          </div>
          <div className="swiper-button-next slider-arrow">
            {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default page;
