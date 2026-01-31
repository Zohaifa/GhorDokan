import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import ProductCard from "../components/ProductCard";
import ProductCard2 from "../components/ProductCard2";

const AllProducts = () => {
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeToggles, setActiveToggles] = useState({
    discounted: false,
    mostBought: false,
    grocery: false,
    honey: false,
  });

  const handleToggle = (toggleName) => {
    setActiveToggles((prev) => ({
      ...prev,
      [toggleName]: !prev[toggleName],
    }));
  };

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Navbar />

      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BackButton />

          <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
            All Products
          </h1>

          {/* Filter, Search, and Sort Section */}
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Filter Dropdown */}
            <div className="flex-shrink-0 lg:w-56">
              <label
                htmlFor="filter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filter by Category
              </label>
              <select
                id="filter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-white rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
              >
                <option value="">All Categories</option>
                <option value="honey">Honey</option>
                <option value="oil">Oil</option>
                <option value="spices">Spices</option>
                <option value="ghee">Ghee</option>
                <option value="grocery">Grocery</option>
                <option value="new-arrivals">New Arrivals</option>
              </select>
            </div>

            {/* Search Bar */}
            <div className="flex-grow lg:mx-6">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search Products
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full rounded-lg border border-gray-300 pl-4 pr-12 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-amber-600 hover:bg-amber-200 transition-colors"
                  aria-label="Search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex-shrink-0 lg:w-56">
              <label
                htmlFor="sort"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sort by
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full bg-white rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
              >
                <option value="">Default</option>
                <option value="most-rated">Most Rated</option>
                <option value="price-high-low">Price: High → Low</option>
                <option value="price-low-high">Price: Low → High</option>
                <option value="qty-small-large">Qty: Smallest → Largest</option>
                <option value="qty-large-small">Qty: Largest → Smallest</option>
              </select>
            </div>
          </div>

          {/* Smart Toggles */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleToggle("discounted")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeToggles.discounted
                  ? "bg-amber-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Discounted Products
            </button>
            <button
              type="button"
              onClick={() => handleToggle("mostBought")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeToggles.mostBought
                  ? "bg-amber-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Most Bought
            </button>
            <button
              type="button"
              onClick={() => handleToggle("grocery")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeToggles.grocery
                  ? "bg-amber-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Grocery
            </button>
            <button
              type="button"
              onClick={() => handleToggle("honey")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeToggles.honey
                  ? "bg-amber-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Honey
            </button>
          </div>

          {/* Products Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCard key={index} />
            ))}
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCard2 key={index} />
            ))}
          </div>
        </div>
      </main>

      <Footer />


      {showScrollTop && (
        <button
          type="button"
          onClick={handleScrollTop}
          className="fixed bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-amber-600/70 text-white shadow transition hover:bg-amber-600"
          aria-label="Scroll to top"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>
      )}

    </div>
  );
};

export default AllProducts;
