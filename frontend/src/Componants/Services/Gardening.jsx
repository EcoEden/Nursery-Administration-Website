import React from 'react';

const gardeningServices = [
  {
    id: 1,
    name: 'Hand Tool',
    price: '₹399',
    image: './main_page_img/Gardening Equipement/HandTool.jpeg',
    category: 'Service',
  },
  {
    id: 2,
    name: 'Shovel',
    price: '₹499',
    image: './main_page_img/Gardening Equipement/Shovel.jpeg',
    category: 'Service',
  },
  {
    id: 3,
    name: 'Watering Can',
    price: '₹599',
    image: './main_page_img/Gardening Equipement/WateringCan.jpeg',
    category: 'Service',
  },
];

const Gardening = () => {
  return (
    <section className="min-h-screen bg-green-50 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-secondary text-center mb-12">
          Gardening Equipement
        </h1>
        <p className="text-lg text-gray-600 text-center mb-16">
          Professional gardening solutions to keep your garden fresh and beautiful.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {gardeningServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center text-center"
            >
              <img
                src={service.image}
                alt={service.name}
                className="h-40 w-40 object-cover rounded-full mb-4"
              />
              <h3 className="text-2xl font-semibold text-primary">{service.name}</h3>
              <p className="text-xl font-bold text-secondary mt-2">{service.price}</p>
              <button className="mt-4 bg-secondary hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg font-medium transition">
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gardening;
