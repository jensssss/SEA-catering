// components/Hero.tsx

import React from 'react';

const Hero = () => {
  const heroImageUrl = '/hero-background.jpg';

  return (
    <section
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${heroImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          SEA Catering
        </h1>
        <p className="mt-4 text-lg md:text-xl font-medium text-teal-300">
          "Healthy Meals, Anytime, Anywhere"
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-base text-slate-200">
          Welcome to SEA Catering, your partner in healthy living. We provide customizable healthy meal plans with delivery across all of Indonesia, making it easier than ever to eat well.
        </p>
        <div className="mt-8">
          <a
            href="/menu"
            className="bg-teal-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105"
          >
            Explore Our Plans
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;