import React, { useState, useEffect, useRef } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";

const Home = () => {
  const slides = [
    {
      img: "/main_page_img/main.webp",
      tag: "New Arrivals",
      title: "Bring Nature Indoors",
      subtitle: "Handpicked indoor plants for every corner of your home",
      cta: "Shop Now",
      ctaLink: "/shop",
    },
    {
      img: "/main_page_img/main1.webp",
      tag: "Bestseller",
      title: "Transform Your Garden",
      subtitle: "Premium outdoor plants & essentials",
      cta: "Explore Garden",
      ctaLink: "/outdoor-plants",
    },
    {
      img: "/main_page_img/Gardening.jpg",
      tag: "Expert Tips",
      title: "Grow with Confidence",
      subtitle: "Tools & accessories for every gardener",
      cta: "View Accessories",
      ctaLink: "/gardening",
    },
  ];

  const services = [
    { id: 1, title: "Gardening", img: "/main_page_img/Gardening.jpg", link: "/gardening" },
    { id: 2, title: "Indoor Plants", img: "/main_page_img/indoor.jpg", link: "/indoor-plants" },
    { id: 3, title: "Outdoor Plants", img: "/main_page_img/outdoor.jpg", link: "/outdoor-plants" },
    { id: 4, title: "Plant Care", img: "/main_page_img/plantcare.jpg", link: "/plant-care" },
    { id: 5, title: "Herbs", img: "/main_page_img/herbs.jpg", link: "/herbs" },
    { id: 6, title: "Decor Pots", img: "/main_page_img/main2.jpg", link: "/decor-pots" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  // ✅ Auto Slider (FIXED)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timerRef.current);
  }, []);

  const slide = slides[currentIndex] || slides[0];
  if (!slide) return null;

  const nextSlide = () =>
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );

  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* TOP STRIP */}
      <div className="bg-green-700 text-white text-xs py-2 flex justify-center gap-6 flex-wrap">
        <span>🌿 100% Organic Plants</span>
        <span>🚚 Free Delivery above ₹499</span>
        <span>🌱 Live Plant Guarantee</span>
        <span>⭐ 50,000+ Happy Customers</span>
      </div>

      {/* HERO SECTION */}
      <div className="relative h-[60vh] min-h-[380px] overflow-hidden">

        {/* IMAGE */}
        <img
          src={slide.img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60 transition duration-500"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        {/* TEXT */}
        <div className="absolute inset-0 flex items-center px-10 md:px-20">
          <div className="max-w-lg text-white space-y-4">

            <span className="bg-[#fb923c] px-3 py-1 text-xs rounded-full font-bold uppercase">
              {slide.tag}
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              {slide.title}
            </h1>

            <p className="text-gray-200 text-sm md:text-base">
              {slide.subtitle}
            </p>

            {/* ✅ BUTTON WITH YOUR COLORS */}
            <Link to={slide.ctaLink}>
              <button className="bg-green-700 hover:bg-[#fb923c] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl cursor: none">
                {slide.cta} →
              </button>
            </Link>

          </div>
        </div>

        {/* NAV BUTTONS */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-700/80 hover:bg-[#fb923c] text-white w-10 h-10 rounded-full flex items-center justify-center transition"
        >
          <GrLinkPrevious />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-700/80 hover:bg-[#fb923c] text-white w-10 h-10 rounded-full flex items-center justify-center transition"
        >
          <GrLinkNext />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${i === currentIndex
                  ? "w-6 bg-[#fb923c]"
                  : "w-2 bg-white/60"
                }`}
            />
          ))}
        </div>
      </div>

      {/* CATEGORY SECTION */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((item) => (
            <Link to={item.link} key={item.id}>
              <div className="bg-white rounded-xl overflow-hidden border hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer">

                <div className="h-32 overflow-hidden">
                  <img
                    src={item.img}
                    alt=""
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                </div>

                <div className="p-3 text-center font-semibold text-gray-800">
                  {item.title}
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Why Choose Us Banner ──────────────────────────── */}
      <section className="bg-green-900 py-9 px-5">
        <div className="max-w-[1200px] mx-auto text-center">

          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-2.5">
            {/* <LeafIcon size={18} color="#86efac" /> */}
            <h2 className="text-[20px] font-extrabold text-white m-0">
              Why Choose EcoCart?
            </h2>
            {/* <LeafIcon size={18} color="#86efac" /> */}
          </div>

          <p className="text-[14px] text-green-300 mb-7">
            Pune's most trusted online plant nursery since 2020
          </p>

          {/* Stats Grid */}
          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
            {[
              { icon: "🌿", stat: "500+", label: "Plant varieties" },
              { icon: "⭐", stat: "4.8/5", label: "Average rating" },
              { icon: "👨‍🌾", stat: "50K+", label: "Happy customers" },
              { icon: "📦", stat: "2-Day", label: "Fast delivery" },
            ].map(({ icon, stat, label }) => (
              <div
                key={label}
                className="bg-white/10 rounded-xl px-3.5 py-5 border border-green-200/20 hover:bg-[#fb923c]/50 transition duration-200"
              >
                <div className="text-[26px] mb-2">{icon}</div>
                <div className="text-[24px] font-extrabold text-green-200 leading-none">
                  {stat}
                </div>
                <div className="text-[12px] text-green-300 mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;