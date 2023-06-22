import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

import slider_1 from "../../../assets/images/top-slider-image/slider-1.jpg";
import slider_2 from "../../../assets/images/top-slider-image/slider-2.jpg";
import slider_3 from "../../../assets/images/top-slider-image/slider-3.jpg";
import slider_4 from "../../../assets/images/top-slider-image/slider-4.jpg";
import slider_5 from "../../../assets/images/top-slider-image/slider-5.jpg";
import slider_6 from "../../../assets/images/top-slider-image/slider-6.jpg";

const TopSlider = () => {
  return (
    <div className="">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img  src={slider_1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider_2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider_3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider_4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider_5} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider_6} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default TopSlider;
