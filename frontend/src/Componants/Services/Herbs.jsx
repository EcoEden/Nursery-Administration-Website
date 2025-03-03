import React from 'react';

const herbs = [
  {
    id: 1,
    name: 'Basil',
    price: '₹199',
    image: './main_page_img/Herbs/Basil.jpeg',
    category: 'Herb',
  },
  {
    id: 2,
    name: 'Mint',
    price: '₹149',
    image: './main_page_img/Herbs/Mint.jpeg',
    category: 'Herb',
  },
];

const Herbs = () => {
  return (
    <section className="min-h-screen bg-green-50 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-secondary text-center mb-12">
          Fresh Herbs
        </h1>
        <p className="text-lg text-gray-600 text-center mb-16">
          Grow your own kitchen garden with our fresh herbs.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {herbs.map((herb) => (
            <div
              key={herb.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center text-center"
            >
              <img
                src={herb.image}
                alt={herb.name}
                className="h-40 w-40 object-cover rounded-full mb-4"
              />
              <h3 className="text-2xl font-semibold text-primary">{herb.name}</h3>
              <p className="text-xl font-bold text-secondary mt-2">{herb.price}</p>
              <button className="mt-4 bg-secondary hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg font-medium transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Herbs;
