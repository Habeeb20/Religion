import React from 'react';
import re from "../assets/religion/Rectangle 9.png"
import im from "../assets/religion/sc.png"
import LeaderCount from '../components/LandingPageComponents/LeaderCount';
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#F5F5DC] text-gray-800">
      {/* Header */}
      <header className="bg-[#001f3f] text-white py-4 px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold">e-religion</div>
          <nav className="space-x-6 hidden md:flex">
            <a href="#" className="hover:text-[#C0C0C0]">Home</a>
            <a href="#" className="hover:text-[#C0C0C0]">About us</a>
            <a href="#" className="hover:text-[#C0C0C0]">Religions</a>
            <a href="#" className="hover:text-[#C0C0C0]">Report</a>
            <a href="#" className="hover:text-[#C0C0C0]">Profile</a>
          </nav>
          <button className="md:hidden text-2xl">&#9776;</button>
        </div>
      </header>

      {/* About Section */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">ABOUT US</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">About E-Religion</h2>
            <p className="text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas urna eu mauris ultricies, ac facilisis nunc varius. Suspendisse potenti. Cras in ante a metus ornare cursus. Integer quis leo dolor.
            </p>
          </div>
          <div className="flex justify-center h-25">
            <img src={im} alt="Placeholder" className="rounded-lg" />
          </div>
        </div>

     {/* Stats Section */}
<div className="relative flex items-center py-6 rounded-lg mb-8">
  {/* Image on the left */}
  <div className="w-1/3 hidden md:block">
    <img
      src={re}
      alt="Religious Image"
      className="rounded-lg"
    />
  </div>

  
  <div className="w-full md:w-2/3 flex justify-around text-center px-4">
    <div>
      <h3 className="text-2xl font-bold">3M+</h3>
      <p className="text-gray-600">Religious Ministers of God</p>
    </div>
    <div>
      <h3 className="text-2xl font-bold">3000</h3>
      <p className="text-gray-600">Christian Denominations</p>
    </div>
    <div>
      <h3 className="text-2xl font-bold">3000</h3>
      <p className="text-gray-600">Islamic Communities</p>
    </div>
    <div>
      <h3 className="text-2xl font-bold">3000</h3>
      <p className="text-gray-600">Traditional Followers</p>
    </div>
  </div>
</div>


        <div className="text-center mb-8">
          <button className="bg-[#001f3f] text-white px-6 py-3 rounded-lg">Report a Scam</button>
        </div>

        {/* Ministries Section */}
        <h2 className="text-xl font-bold text-center mb-4">We are all over Nigeria</h2>
        {/* <p className="text-center text-gray-600 mb-6">Below are some of the most popular religions in Nigeria</p> */}
        {/* <LeaderCount /> */}
        {/* <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center mb-8">
          <div className="bg-white shadow p-4 rounded-lg">Ministries in Lagos</div>
          <div className="bg-white shadow p-4 rounded-lg">Ministries in Abuja</div>
          <div className="bg-white shadow p-4 rounded-lg">Ministries in Port Harcourt</div>
          <div className="bg-white shadow p-4 rounded-lg">Ministries in Ibadan</div>
          <div className="bg-white shadow p-4 rounded-lg">Ministries in Kaduna</div>
          <div className="bg-white shadow p-4 rounded-lg">Ministries in Ilorin</div>
        </div> */}

        {/* Bottom Image and Text Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex justify-center">
            <img src={im} alt="Placeholder" className="rounded-lg" />
          </div>
          <div>
            <p className="text-lg leading-relaxed">
              Quisque fringilla est vel felis lobortis, nec posuere risus efficitur. Fusce auctor bibendum orci, in scelerisque eros. Pellentesque vehicula neque in felis dictum, at dictum lorem varius. Nam sed purus non nisi faucibus vestibulum ac.
            </p>
          </div>
        </div>

        <div className="text-lg leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Cras in ante a metus ornare cursus. Integer quis leo dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
          </p>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-[#001f3f] text-white py-4 mt-8">
        <div className="flex justify-center space-x-6">
          <span>e-religion</span>
          <span>&copy; copyright 2024</span>
          <a href="#" className="text-white hover:text-[#C0C0C0]">Contact us</a>
        </div>
      </footer> */}
    </div>
  );
};

export default AboutUs;
