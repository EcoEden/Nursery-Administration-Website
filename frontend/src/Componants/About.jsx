import React from 'react';
import { RiPlantFill } from "react-icons/ri";

const About = () => {
  return (
    <section className="bg-green-50 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            About <span className="text-secondary">EcoEden</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Nurturing nature, one plant at a time.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src="/main_page_img/main1.webp"
              alt="About EcoEden"
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-semibold text-secondary mb-4">
              Who We Are
            </h2>
            <p className="text-gray-700 text-lg leading-7 mb-6">
              EcoEden is your one-stop destination for all things green. Our mission is to
              bring nature closer to you by providing healthy plants, expert advice, and sustainable
              gardening solutions. Whether you're a seasoned gardener or just starting, we're here
              to support your journey.
            </p>
            <p className="text-gray-700 text-lg leading-7 mb-6">
              We believe every plant has a purpose, and every home deserves a touch of green.
              Join us as we work towards a healthier, greener planet!
            </p>
            <button className="mt-4 bg-secondary hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium flex items-center gap-2 transition">
              Explore Our Products <RiPlantFill className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Vision/Mission */}
        <div className="mt-20 grid md:grid-cols-2 gap-10">
          <div className="bg-[#F5F5F5] p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold text-primary mb-3">Our Vision</h3>
            <p className="text-gray-700 text-lg leading-7">
              To create a world where nature and people coexist in harmony, and every community
              thrives with greenery.
            </p>
          </div>
          <div className="bg-[#F5F5F5] p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold text-primary mb-3">Our Mission</h3>
            <p className="text-gray-700 text-lg leading-7">
              Deliver the best plants, knowledge, and eco-friendly products to help you build
              sustainable and beautiful spaces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
