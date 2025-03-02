import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h2 className="text-4xl font-bold text-secondary text-center mb-8">
          Contact Us
        </h2>
        <p className="text-lg text-gray-600 text-center mb-10">
          We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <form className="space-y-6">
          <div>
            <label className="block text-xl text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-xl text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-xl text-gray-700 mb-2">Message</label>
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-secondary hover:bg-green-700 text-white py-4 rounded-lg text-xl font-semibold transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Optional - adding similar images at the bottom for design consistency */}
      <div className="mt-16 flex flex-wrap justify-evenly">
        <div className="w-[30%] flex flex-col items-center mb-6">
          <img
            className="rounded-full h-32"
            src="/public/main_page_img/gardening.webp"
            alt="Gardening"
          />
          <p className="text-lg mt-3">Gardening Tips</p>
        </div>
        <div className="w-[30%] flex flex-col items-center mb-6">
          <img
            className="rounded-full h-32"
            src="/public/main_page_img/main.webp"
            alt="Support"
          />
          <p className="text-lg mt-3">Support</p>
        </div>
        <div className="w-[30%] flex flex-col items-center mb-6">
          <img
            className="rounded-full h-32"
            src="/public/main_page_img/main1.webp"
            alt="Services"
          />
          <p className="text-lg mt-3">Our Services</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
