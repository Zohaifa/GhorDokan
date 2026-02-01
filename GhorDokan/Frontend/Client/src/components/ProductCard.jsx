import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productImage from '../assets/product.png';
import { toast } from 'react-toastify';

const ProductCard = () => {
  const [quantity, setQuantity] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleDecrease = () => setQuantity((prev) => Math.max(0, prev - 1));
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleNavigate = () => navigate('/product/1');

  const handleToggleFavorite = (event) => {
    event.stopPropagation();
    setIsFavorite((prev) => !prev);
    toast.info(`Product ${!isFavorite ? 'added to' : 'removed from'} favorites`);
  };

  const handleQuickView = (event) => {
    event.stopPropagation();
    navigate('/product/1');
  };

  return (
    /* On mobile: full slider width minus padding/gaps for single card view
       On tablet: 2 cards side by side
       On desktop: 4 cards in view
    */
    <div
      className="group relative flex w-[calc(100%-2rem)] min-w-[240px] flex-shrink-0 flex-col rounded-[20px] border border-gray-100 bg-white p-3 shadow-md transition duration-300 ease-out hover:shadow-xl sm:w-[48%] sm:min-w-[260px] lg:w-[22%] lg:min-w-[265px] overflow-visible"
    >
      <div className="absolute right-3 top-3 z-20 flex translate-y-1 flex-col items-center gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <button
          type="button"
          onClick={handleQuickView}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-amber-600 hover:text-white"
          aria-label="Quick view"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 0 0-2 2v3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 3h3a2 2 0 0 1 2 2v3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 21H5a2 2 0 0 1-2-2v-3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 21h3a2 2 0 0 0 2-2v-3" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleToggleFavorite}
          className={`flex h-9 w-9 items-center justify-center rounded-full shadow-md transition ${
            isFavorite ? 'bg-rose-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-rose-500 hover:text-white'
          }`}
          aria-label="Add to favorites"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
            />
          </svg>
        </button>
      </div>
      
      {/* Image Container */}
      <div 
        className="flex justify-center rounded-xl bg-[#f8f8f8] py-4 transition duration-300 group-hover:scale-[1.02] cursor-pointer"
        onClick={handleNavigate}
      >
        <img 
          src={productImage} 
          alt="Honey" 
          className="h-28 w-auto object-contain mix-blend-multiply sm:h-32 lg:h-40" 
        />
      </div>

      {/* Product Details */}
      <div className="mt-3 flex-grow px-1">
        <h3 className="text-lg font-bold text-[#0a2351]">Honey</h3>
        <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">100% natural organic honey</p>
        
        <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 font-semibold text-l">
                Price: 100 BDT
              </p>
              <p className="text-sm text-gray-500">Quantity: 1 Kg</p>
              </div>
              <div className="space-x-2">
              <button
                className="bg-gray-200 px-2 py-1 rounded text-gray-700 font-bold"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDecrease();
                }}
              >
                −
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                className="bg-gray-200 px-2 py-1 rounded text-gray-700 font-bold"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleIncrease();
                }}
              >
                +
              </button>
              </div>
          </div>
        </div>
      </div>

      {/* Quantity Selector */}
      {/* <div className="mt-3 flex items-center justify-between rounded-xl bg-[#f1f3f6] px-4 py-1.5">
        <button
          type="button"
          onClick={handleDecrease}
          className="text-xl font-bold text-gray-600 transition hover:text-black"
        >
          &minus;
        </button>
        <span className="text-lg font-semibold text-gray-800">{quantity}</span>
        <button
          type="button"
          onClick={handleIncrease}
          className="text-lg font-bold text-gray-600 transition hover:text-black"
        >
          &#43;
        </button>
      </div> */}

      {/* Add to Cart Button */}
      <button
        type="button"
        className="mt-2 w-full rounded-xl bg-[#e67e00] py-2 text-sm font-bold text-white transition hover:bg-[#cf7100] active:scale-[0.95]"
        onClick={(event) => {
          event.stopPropagation();
          handleIncrease();
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;