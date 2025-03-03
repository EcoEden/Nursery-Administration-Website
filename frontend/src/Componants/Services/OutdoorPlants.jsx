import React from 'react';

const outdoorPlants = [
  {
    id: 1,
    name: 'Areca Palm',
    price: '₹799',
    image: './main_page_img/OutdoorPlants/ArecaPalm.jpeg',
    category: 'Outdoor Plant',
  },
  {
    id: 2,
    name: 'Bougainvillea',
    price: '₹599',
    image: './main_page_img/OutdoorPlants/Bougainvillea.jpeg',
    category: 'Outdoor Plant',
  },
];

const OutdoorPlants = () => {
  return (
    <section className="min-h-screen bg-green-50 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-secondary text-center mb-12">
          Outdoor Plants
        </h1>
        <p className="text-lg text-gray-600 text-center mb-16">
          Enhance your outdoor spaces with our vibrant collection.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {outdoorPlants.map((plant) => (
            <div
              key={plant.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center text-center"
            >
              <img
                src={plant.image}
                alt={plant.name}
                className="h-40 w-40 object-cover rounded-full mb-4"
              />
              <h3 className="text-2xl font-semibold text-primary">{plant.name}</h3>
              <p className="text-xl font-bold text-secondary mt-2">{plant.price}</p>
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

export default OutdoorPlants;
