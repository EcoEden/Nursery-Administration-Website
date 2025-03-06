import React, { useState, useEffect } from 'react';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Link } from 'react-router-dom';

const Home = () => {
  const images = [
    "/main_page_img/main.webp",
    "/main_page_img/main1.webp",
    "/main_page_img/Gardening.jpg",
    "/main_page_img/indoor.jpg",
    "/main_page_img/outdoor.jpg",
    "/main_page_img/plantcare.jpg",

  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const services = [

    { id: 1, title: "Gardening", img: "/main_page_img/Gardening.jpg", link: "/gardening" },
    { id: 2, title: "Indoor Plants", img: "/main_page_img/indoor.jpg", link: "/indoor-plants" },
    { id: 3, title: "Outdoor Plants", img: "/main_page_img/outdoor.jpg", link: "/outdoor-plants" },
    { id: 4, title: "Plant Care", img: "/main_page_img/plantcare.jpg", link: "/plant-care" },
    { id: 5, title: "Herbs", img: "/main_page_img/herbs.jpg", link: "/herbs" },
    { id: 6, title: "Decor Pots", img: "/main_page_img/main2.jpg", link: "/decor-pots" },

  ];

  return (
    <>
      {/* Slider */}
      <div className="relative w-full h-[55vh] overflow-hidden m-2 select-none cursor-default">
        <img
          src={images[currentIndex]}
          alt="Slider"
          className="w-full h-full object-cover"
        />
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-secondary text-white p-3 rounded-full hover:bg-green-700"
          onClick={prevSlide}
        >
          <GrLinkPrevious size={20} />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-secondary text-white p-3 rounded-full hover:bg-green-700"
          onClick={nextSlide}
        >
          <GrLinkNext size={20} />
        </button>
      </div>

      {/* Services */}
      <section className="py-16 bg-green-50">
        <h2 className="text-4xl font-bold text-center text-secondary mb-12">
        EcoCart
        </h2>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {services.map((service) => (
            <Link to={service.link} key={service.id}>
              <div className="flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-2xl transition p-6">
                <img
                  src={service.img}
                  alt={service.title}
                  className="h-40 w-40 rounded-full object-cover mb-4"
                />
                <p className="text-xl font-semibold text-primary">
                  {service.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
