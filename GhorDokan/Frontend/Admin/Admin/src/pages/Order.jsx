import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';


const Order = () => {
  const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);


    const statuses = [
  { key: 'pending', label: 'Pending', bgColor: 'bg-yellow-500', shadowColor: 'shadow-yellow-400', faintBg: 'bg-yellow-50', faintText: 'text-yellow-700', faintBorder: 'border-yellow-200' },
  { key: 'received', label: 'Received', bgColor: 'bg-blue-500', shadowColor: 'shadow-blue-400', faintBg: 'bg-blue-50', faintText: 'text-blue-700', faintBorder: 'border-blue-200' },
  { key: 'confirmed', label: 'Confirmed', bgColor: 'bg-indigo-500', shadowColor: 'shadow-indigo-400', faintBg: 'bg-indigo-50', faintText: 'text-indigo-700', faintBorder: 'border-indigo-200' },
  { key: 'delivering', label: 'Delivering', bgColor: 'bg-purple-500', shadowColor: 'shadow-purple-400', faintBg: 'bg-purple-50', faintText: 'text-purple-700', faintBorder: 'border-purple-200' },
  { key: 'delivered', label: 'Delivered', bgColor: 'bg-green-500', shadowColor: 'shadow-green-400', faintBg: 'bg-green-50', faintText: 'text-green-700', faintBorder: 'border-green-200' },
  { key: 'completed', label: 'Completed', bgColor: 'bg-emerald-600', shadowColor: 'shadow-emerald-400', faintBg: 'bg-emerald-50', faintText: 'text-emerald-700', faintBorder: 'border-emerald-200' },
  { key: 'cancelled', label: 'Cancelled', bgColor: 'bg-red-500', shadowColor: 'shadow-red-400', faintBg: 'bg-red-50', faintText: 'text-red-700', faintBorder: 'border-red-200' },
];


  const handleStatusClick = (statusKey) => {
    if (statusKey === selectedStatus) return;
    setPendingStatus(statusKey);
    setShowConfirmModal(true);
  };

  const confirmStatusChange = () => {
    setSelectedStatus(pendingStatus);
    setShowConfirmModal(false);
    toast.success(`Order status changed to "${pendingStatus}" successfully!`);
    setPendingStatus(null);
  };

  const cancelStatusChange = () => {
    setShowConfirmModal(false);
    toast.info('Status change cancelled');
    setPendingStatus(null);
  };

  const products = [
    { id: 101, name: 'Organic Honey', amount: 2, price: '₹500', category: 'Honey', subtotal: '₹1,000' },
    { id: 102, name: 'Pure Rice', amount: 5, price: '₹200', category: 'Grains', subtotal: '₹1,000' },
    { id: 103, name: 'Natural Oil', amount: 1, price: '₹500', category: 'Oil', subtotal: '₹500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-6 pt-4">
        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-md rounded-xl bg-white p-4 shadow-2xl">
              <h4 className="mb-3 text-lg font-bold text-gray-900">Confirm Status Change</h4>
              <p className="mb-4 text-gray-600">
                Are you sure you want to change the order status to{' '}
                <span className="font-semibold text-amber-600">"{pendingStatus}"</span>?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={confirmStatusChange}
                  className="flex-1 rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition hover:bg-amber-700"
                >
                  Confirm
                </button>
                <button
                  onClick={cancelStatusChange}
                  className="flex-1 rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mb-4">
          <div className=" flex gap-2 flex-wrap">
            <Link
              to="/"
              className="rounded-lg bg-gray-600 px-4 py-2 font-semibold text-white transition hover:bg-gray-700"
            >
              Back
            </Link>
            <Link
              to="/orders"
              className="rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition hover:bg-amber-700"
            >
              Manage Orders
            </Link>
            <Link
              to="/customers"
              className="rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition hover:bg-amber-700"
            >
              Manage Customers
            </Link>
            <Link
              to="/products"
              className="rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition hover:bg-amber-700"
            >
              Manage Products
            </Link>
          </div>
          <button className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700">Create Voucher</button>
        </div>
        

        {/* Order Details */}
        <div className="mb-2 rounded-lg border border-gray-200 bg-white py-2 px-4 shadow">
          <h2 className="mb-1 text-xl font-bold text-gray-900">Order Details</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="text-md font-semibold text-gray-900">{id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Client Name</p>
              <p className="text-md font-semibold text-gray-900">Ahmed Khan</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Price</p>
              <p className="text-md font-semibold text-amber-600">₹2,500</p>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mb-2 rounded-lg border border-gray-200 bg-white py-2 px-4 shadow">
          <h3 className="mb-1 text-lg font-bold text-gray-900">Customer Details</h3>
          <div className="grid gap-3 sm:grid-cols-4">
            <div>
              <p className="text-sm text-gray-600">Client ID</p>
              <p className="text-base font-semibold text-gray-900">C-1001</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-base font-semibold text-gray-900">Ahmed Khan</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-base font-semibold text-gray-900">ahmed.khan@email.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="text-base font-semibold text-gray-900">+880 1700 123456</p>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="mb-2 rounded-lg border border-gray-200 bg-white py-2 px-4 shadow">
          <h3 className="mb-3 text-lg font-bold text-gray-900">Address</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-600">Area</p>
              <p className="text-base font-semibold text-gray-900">Dhaka</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Address Line 1</p>
              <p className="text-base font-semibold text-gray-900">Gulshan</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Address Line 2</p>
              <p className="text-base font-semibold text-gray-900">Avenue 1</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Road No.</p>
              <p className="text-base font-semibold text-gray-900">45</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">House No.</p>
              <p className="text-base font-semibold text-gray-900">32</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Apartment Name</p>
              <p className="text-base font-semibold text-gray-900">Royal Plaza</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-600">Flat</p>
              <p className="text-base font-semibold text-gray-900">A-5</p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-1 rounded-lg border border-gray-200 bg-white py-2 px-4 shadow">
          <h3 className="mb-1 text-lg font-bold text-gray-900">Comments</h3>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-sm text-gray-600">
              <strong>Customer:</strong> Please deliver between 10 AM - 12 PM. Door code is 1234. Thank you!
            </p>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-2 rounded-lg border border-gray-200 bg-white py-2 px-4 shadow">
          <h3 className="mb-3 text-lg font-bold text-gray-900">Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-900">Product ID</th>
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-900">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-3 py-2 text-sm text-gray-900 font-medium">{product.id}</td>
                    <td className="px-3 py-2 text-sm text-gray-600">{product.name}</td>
                    <td className="px-3 py-2 text-sm text-gray-600">{product.amount}</td>
                    <td className="px-3 py-2 text-sm text-gray-600">{product.price}</td>
                    <td className="px-3 py-2 text-sm text-gray-600">{product.category}</td>
                    <td className="px-3 py-2 text-sm font-semibold text-amber-600">{product.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 border-t border-gray-200 pt-3">
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                Grand Total: <span className="text-amber-600">₹2,500</span>
              </p>
            </div>
          </div>
        </div>

        {/* Order Status Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow">
          <h3 className="mb-3 text-lg font-bold text-gray-900">Order Status</h3>
          <div className="grid gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {statuses.map((status) => (
              <button
  key={status.key}
  onClick={() => handleStatusClick(status.key)}
  className={`relative overflow-hidden rounded-xl px-3 py-2 text-sm font-bold transition-all duration-300 border-2 ${
    selectedStatus === status.key
      ? // SELECTED: Glowing Glass Design
        `${status.bgColor} ${status.shadowColor} text-white scale-110 z-10 
         shadow-[0_0_25px_rgba(0,0,0,0.2),0_0_50px_-10px_rgba(0,0,0,0.3)] 
         border-white/40 backdrop-blur-xl
         after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/40 after:to-transparent`
      : // UNSELECTED: Faint Tinted Design
        `${status.faintBg} ${status.faintText} ${status.faintBorder} 
         opacity-80 hover:opacity-100 hover:scale-105 hover:shadow-md border-dashed`
  }`}
>
  <span className={`relative z-20 ${selectedStatus === status.key ? 'drop-shadow-md' : ''}`}>
    {status.label}
  </span>
</button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Order;
