import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import productImage from '../assets/product.png';
import productImage2 from '../assets/product2.jpg';
import BackButton from '../components/BackButton';

const ProductDetails = ({ isAuthenticated, user, toggleAuth }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const products = useMemo(
    () => [
      {
        id: '1',
        name: 'Honey',
        price: '100 BDT',
        description: '100% natural organic honey harvested from local farms. Smooth, rich, and full of nutrients.',
        category: 'Honey',
        stock: 18,
        rating: 4.8,
        image: productImage,
      },
      {
        id: '2',
        name: 'Ata',
        price: '100 BDT',
        description: 'Teer Ata 1 kg - premium quality wheat flour for daily cooking and baking.',
        category: 'Grocery',
        stock: 42,
        rating: 4.5,
        image: productImage2,
      },
    ],
    [],
  );

  const product = products.find((item) => item.id === id) ?? products[0];

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const handlePrev = () => {
    navigate(product.id === '1' ? '/product/2' : '/product/1');
  };

  const handleNext = () => {
    navigate(product.id === '1' ? '/product/2' : '/product/1');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar isAuthenticated={isAuthenticated} user={user} toggleAuth={toggleAuth} />

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <BackButton to="/" label="Back" />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-amber-500 hover:text-amber-600"
              aria-label="Previous product"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-amber-500 hover:text-amber-600"
              aria-label="Next product"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <section className="grid gap-10 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg md:grid-cols-[1.1fr_1fr] md:p-10">
          <div className="flex items-center justify-center rounded-2xl bg-[#f8f8f8] p-6">
            <img
              src={product.image}
              alt={product.name}
              className="h-72 w-auto object-contain mix-blend-multiply md:h-96"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">{product.category}</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">{product.name}</h1>
            </div>

            <p className="text-lg text-gray-600">{product.description}</p>

            <div className="grid gap-3 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase text-gray-400">Price</p>
                <p className="text-lg font-semibold text-amber-600">{product.price}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400">In stock</p>
                <p className="text-base font-semibold">{product.stock} items</p>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400">Rating</p>
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold">{product.rating}</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill={index < Math.round(product.rating) ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3l2.7 5.5L20 9.3l-4 4 0.9 5.7L12 16.8 7.1 19l0.9-5.7-4-4 5.3-0.8L12 3z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400">Category</p>
                <p className="text-base font-semibold">{product.category}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleToggleFavorite}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition ${
                  isFavorite
                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                    : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-rose-50 hover:text-rose-600'
                }`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
                  />
                </svg>
                {isFavorite ? 'Added to favorites' : 'Add to favorites'}
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
              >
                Add to cart
              </button>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Similar products</h2>
            <span className="text-sm text-gray-500">Coming soon</span>
          </div>
          <div className="mt-6 rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            We will populate this area with recommended products once the API is ready.
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
