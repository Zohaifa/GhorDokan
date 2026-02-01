import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const Checkout = ({ isAuthenticated, user, toggleAuth }) => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    roadNo: '',
    houseNo: '',
    apartmentName: '',
    flatNo: ''
  });

  const cartItems = [
    { id: 1, name: 'Organic Honey', price: 500, quantity: 2 },
    { id: 2, name: 'Pure Rice', price: 200, quantity: 5 },
    { id: 3, name: 'Natural Oil', price: 500, quantity: 1 }
  ];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.addressLine1 || !formData.roadNo || !formData.houseNo || !formData.apartmentName || !formData.flatNo) {
      toast.error('Please fill in all required fields');
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmOrder = () => {
    setShowConfirmModal(false);
    toast.success('Order placed successfully! Thank you for your purchase!');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const cancelOrder = () => {
    setShowConfirmModal(false);
    toast.info('Order not placed');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Navbar isAuthenticated={isAuthenticated} user={user} toggleAuth={toggleAuth} />

      <main className="flex-grow px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <BackButton to="/cart" label="Back" />

          <div className="mt-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600 mb-8">Enter your billing details to complete your order</p>

            {/* Confirmation Modal */}
            {showConfirmModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                  <h4 className="mb-4 text-xl font-bold text-gray-900">Confirm Order</h4>
                  <p className="mb-2 text-gray-600">
                    Order Total: <span className="font-bold text-amber-600">₹{calculateTotal()}</span>
                  </p>
                  <p className="mb-6 text-gray-600">
                    Are you sure you want to place this order?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={confirmOrder}
                      className="flex-1 rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition hover:bg-amber-700"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={cancelOrder}
                      className="flex-1 rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Billing Details Form */}
              <div className="lg:col-span-2">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Details</h2>
                  
                  <form onSubmit={handlePlaceOrder} className="space-y-6">
                    <div>
                      <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        id="addressLine1"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        placeholder="Enter street address"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        id="addressLine2"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                        placeholder="Apartment, suite, etc."
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                      />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="roadNo" className="block text-sm font-medium text-gray-700 mb-2">
                          Road No. *
                        </label>
                        <input
                          type="text"
                          id="roadNo"
                          name="roadNo"
                          value={formData.roadNo}
                          onChange={handleInputChange}
                          placeholder="Road number"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700 mb-2">
                          House No. *
                        </label>
                        <input
                          type="text"
                          id="houseNo"
                          name="houseNo"
                          value={formData.houseNo}
                          onChange={handleInputChange}
                          placeholder="House number"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="apartmentName" className="block text-sm font-medium text-gray-700 mb-2">
                          Apartment Name *
                        </label>
                        <input
                          type="text"
                          id="apartmentName"
                          name="apartmentName"
                          value={formData.apartmentName}
                          onChange={handleInputChange}
                          placeholder="Apartment name"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="flatNo" className="block text-sm font-medium text-gray-700 mb-2">
                          Flat No. *
                        </label>
                        <input
                          type="text"
                          id="flatNo"
                          name="flatNo"
                          value={formData.flatNo}
                          onChange={handleInputChange}
                          placeholder="Flat number"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-amber-600 px-6 py-3 text-white font-semibold transition hover:bg-amber-700"
                    >
                      Place Order
                    </button>
                  </form>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
                  <div className="space-y-3 border-b border-gray-200 pb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-gray-600">
                        <span>{item.name} × {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600 font-semibold">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-amber-600">₹{calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
