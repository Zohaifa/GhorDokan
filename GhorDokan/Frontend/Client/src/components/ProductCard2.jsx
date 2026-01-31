import { useState } from 'react';
import productImage from '../assets/product2.jpg';

const ProductCard2 = () => {
  const [quantity, setQuantity] = useState(0);

  const handleDecrease = () => setQuantity((prev) => Math.max(0, prev - 1));
  const handleIncrease = () => setQuantity((prev) => prev + 1);

  return (
    /* On mobile: full slider width minus padding/gaps for single card view
       On tablet: 2 cards side by side
       On desktop: 4 cards in view
    */
    <div className="flex w-[calc(100%-2rem)] min-w-[240px] flex-shrink-0 flex-col rounded-[20px] border border-gray-100 bg-white p-3 shadow-md sm:w-[48%] sm:min-w-[260px] lg:w-[22%] lg:min-w-[265px]">
      
      {/* Image Container */}
      <div className="flex justify-center rounded-xl bg-[#f8f8f8] py-4">
        <img 
          src={productImage} 
          alt="Honey" 
          className="h-28 w-auto object-contain mix-blend-multiply sm:h-32 lg:h-40" 
        />
      </div>

      {/* Product Details */}
      <div className="mt-3 flex-grow px-1">
        <h3 className="text-lg font-bold text-[#0a2351]">Ata</h3>
        <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">Teer Ata 1 kg</p>
        
        <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 font-semibold text-l">
                Price: 100 BDT
              </p>
              <p className="text-sm text-gray-500">Quantity: 1 Kg</p>
              </div>
              <div className="space-x-2">
              <button className="bg-gray-200 px-2 py-1 rounded text-gray-700 font-bold" type="button" onClick={handleDecrease}>−</button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button className="bg-gray-200 px-2 py-1 rounded text-gray-700 font-bold" type="button" onClick={handleIncrease}>+</button>
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
        onClick={handleIncrease}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard2;