import React from 'react';
import { RiPlantFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col select-none cursor-default">

    

      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-3 pb-1 text-xs text-gray-500">
        Home &rsaquo; <span className="text-green-700 font-medium">About Us</span>
      </div>

      {/* ── Main ── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 flex flex-col gap-4">

        {/* ── Page Title Banner ── */}
        <div className="bg-white border border-gray-200 rounded shadow-sm px-6 py-5 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            About <span className="text-secondary">EcoEden</span>
          </h1>
          <p className="text-gray-500 text-base">Nurturing nature, one plant at a time.</p>
        </div>

        {/* ── Who We Are ── */}
        <div className="bg-white border border-gray-200 rounded shadow-sm p-6 md:p-8">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8">
            {/* Image */}
            <div className="w-full md:w-1/2">
              <img
                src="/main_page_img/aboutpage.jpg"
                alt="About EcoEden"
                className="rounded w-full h-72 md:h-80 object-cover shadow border border-gray-100"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1 h-6 bg-secondary rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-secondary">Who We Are</h2>
              </div>
              <p className="text-gray-700 text-base leading-7 mb-4">
                EcoEden is your one-stop destination for all things green. Our mission is to
                bring nature closer to you by providing healthy plants, expert advice, and sustainable
                gardening solutions. Whether you're a seasoned gardener or just starting, we're here
                to support your journey.
              </p>
              <p className="text-gray-700 text-base leading-7 mb-6">
                We believe every plant has a purpose, and every home deserves a touch of green.
                Join us as we work towards a healthier, greener planet!
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-secondary hover:bg-green-700 text-white px-6 py-2.5 rounded text-sm font-semibold flex items-center gap-2 transition shadow-sm"
              >
                Explore Our Products <RiPlantFill className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div className="bg-white border border-gray-200 rounded shadow-sm px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "1000+", label: "Plant Varieties" },
              { value: "25K+", label: "Happy Customers" },
              { value: "50+", label: "Expert Gardeners" },
              { value: "4.8★", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="border-r border-gray-100 last:border-0 px-2">
                <p className="text-2xl font-extrabold text-secondary">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Vision & Mission ── */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-5 bg-primary rounded-full inline-block" />
              <h3 className="text-xl font-bold text-primary">Our Vision</h3>
            </div>
            <p className="text-gray-600 text-sm leading-7">
              To create a world where nature and people coexist in harmony, and every community
              thrives with greenery.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-5 bg-primary rounded-full inline-block" />
              <h3 className="text-xl font-bold text-primary">Our Mission</h3>
            </div>
            <p className="text-gray-600 text-sm leading-7">
              Deliver the best plants, knowledge, and eco-friendly products to help you build
              sustainable and beautiful spaces.
            </p>
          </div>
        </div>

        {/* ── Why Choose Us ── */}
        <div className="bg-white border border-gray-200 rounded shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1 h-5 bg-secondary rounded-full inline-block" />
            <h3 className="text-xl font-bold text-gray-800">Why Choose EcoEden?</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🌿", title: "100% Authentic", desc: "All plants sourced from trusted nurseries." },
              { icon: "🚚", title: "Free Delivery", desc: "Free delivery on orders above ₹499." },
              { icon: "↩️", title: "Easy Returns", desc: "7-day hassle-free return policy." },
              { icon: "💬", title: "Expert Support", desc: "Plant care advice from our specialists." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 border border-gray-100 rounded p-4 text-center hover:shadow transition">
                <p className="text-3xl mb-2">{item.icon}</p>
                <p className="text-sm font-bold text-gray-800 mb-1">{item.title}</p>
                <p className="text-xs text-gray-500 leading-5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Promo Banner ── */}
        <div className="bg-yellow-50 border border-yellow-200 rounded shadow-sm p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-base font-bold text-gray-800">🎁 First Order Offer</p>
            <p className="text-sm text-gray-600 mt-0.5">
              Use code <span className="font-bold text-green-700">GREEN10</span> for 10% off your first order!
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="shrink-0 bg-yellow-400 hover:bg-yellow-500 font-semibold text-gray-900 text-sm px-5 py-2 rounded transition"
          >
            Shop Now
          </button>
        </div>

      </main>

    

    </div>
  );
};

export default About;