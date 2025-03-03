import React from 'react';

const plantCareServices = [
  {
    id: 1,
    name: 'Organic Fertilizer',
    price: '₹299',
    image: './main_page_img/PlantCare/OrganicFertilizer.jpeg',
    category: 'Fertilizer',
  },
  {
    id: 2,
    name: 'Pesticide Spray',
    price: '₹349',
    image: './main_page_img/PlantCare/Pesticide Spray.jpeg',
    category: 'Medicine',
  },
  {
    id: 3,
    name: 'Neem Oil Extract',
    price: '₹399',
    image: './main_page_img/PlantCare/Neem Oil Extract.jpeg',
    category: 'Organic Medicine',
  },
  {
    id: 4,
    name: 'Growth Booster',
    price: '₹449',
    image: './main_page_img/PlantCare/Growth Booster.jpeg',
    category: 'Fertilizer',
  },
  {
    id: 5,
    name: 'Fungicide Powder',
    price: '₹299',
    image: './main_page_img/PlantCare/Fungicide Powder.jpeg',
    category: 'Medicine',
  },
];


const PlantCare = () => {
  return (
    <section className="min-h-screen bg-green-50 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-secondary text-center mb-12">
          Plant Care Services
        </h1>
        <p className="text-lg text-gray-600 text-center mb-16">
          Keep your plants healthy with our expert care services.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {plantCareServices.map((service) => (
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
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlantCare;
