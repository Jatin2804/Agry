import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Home.css';

// Import required modules
import { Pagination, Navigation, Parallax, Autoplay } from 'swiper/modules';

// Import other components
import Products from './Products';
import Footer from './Footer';
import Header from './Header';

export default function App() {
  return (
    <>
      <Header />
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          height: '70vh',
        }}
        parallax={true}
        speed={600}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true} // Enable looping
        autoplay={{
          delay: 3000, // Delay in milliseconds (3 seconds)
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        modules={[Parallax, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {/* Set the parallax background globally */}
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            backgroundImage: `url('main.jpg')`,
          }}
          data-swiper-parallax="-23%"
        ></div>

        {/* Transparent black overlay */}
        <div className="overlay"></div>

        {/* Slide 1 */}
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            We are Agry
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
            Knowledge & Farming
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              We provide information to farmers to develop knowledge and improve
              farming techniques. Learn how to better your crops, enhance yield, and
              sustain your farming practices with the right tools and tips.
            </p>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            Selling
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
            Sell Your Produce
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              As a farmer, you can sell your produce directly to buyers through
              our platform. Gain access to a wide market and sell your goods at
              the best prices.
            </p>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            Buying
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
            Buy Farm Essentials
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              We also provide a marketplace for farmers to buy essential
              farming products and equipment. Find what you need to boost your
              farming operations and grow your business.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
      <Products />
      <Footer />
    </>
  );
}
