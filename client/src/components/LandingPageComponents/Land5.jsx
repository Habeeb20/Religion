import React from 'react';
import im from '../../assets/religion/Container (1).png';
import im1 from '../../assets/religion/Container (2).png';
import im2 from '../../assets/religion/Container (3).png';
import im3 from '../../assets/religion/Container (4).png';
import im4 from '../../assets/religion/Container (5).png';
import im5 from '../../assets/religion/Container.png';

const cities = [
  {
    name: 'Lagos Religious leaders',
    count: '8,496',
    image: im, 
  },
  {
    name: 'Abuja  Religious leaders',
    count: '1,189',
    image: im1,
  },
  {
    name: 'Calabar  Religious leaders',
    count: '887',
    image: im2,
  },
  {
    name: 'Port-Harcourt  Religious leaders',
    count: '424',
    image: im3,
  },
  {
    name: 'Owerri  Religious leaders',
    count: '246',
    image: im4,
  },
  {
    name: 'Uyo  Religious leaders',
    count: '207',
    image: im5,
  },
];

const CityCard = ({ city }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
      <img
        src={city.image} 
        alt={city.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-semibold">{city.count}</h2>
        <p className="text-lg">{city.name}</p>
      </div>
    </div>
  );
};

const Land5 = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Popular cities with Popular Ministers
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          See the top destinations people are finding the top ministers
        </p>
        <div className="mt-4 w-24 h-1 bg-blue-500 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city, index) => (
          <CityCard key={index} city={city} />
        ))}
      </div>
    </div>
  );
};

export default Land5;
