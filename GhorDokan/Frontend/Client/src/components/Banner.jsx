import { useEffect, useMemo, useState } from 'react';
import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';

const Banner = () => {
  const banners = useMemo(() => [banner1, banner2, banner3], []);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [banners.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-4">
      <div className="relative overflow-hidden rounded-2xl shadow">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={banner} className="min-w-full">
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="h-[220px] w-full object-cover sm:h-[280px] lg:h-[300px]"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition hover:shadow-xl sm:left-4 sm:h-12 sm:w-12"
          aria-label="Previous slide"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition hover:shadow-xl sm:right-4 sm:h-12 sm:w-12"
          aria-label="Next slide"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
          {banners.map((_, index) => (
            <span
              key={`dot-${index}`}
              className={`h-2 w-2 rounded-full ${
                index === activeIndex ? 'bg-white' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
