import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const Reg1A = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [method, setMethod] = useState(location.state?.method || 'email');
  const [firstName, setFirstName] = useState(
    location.state?.method === 'google' ? 'John' : ''
  );
  const [lastName, setLastName] = useState(
    location.state?.method === 'google' ? 'Doe' : ''
  );
  const [email, setEmail] = useState(
    location.state?.method === 'google' ? 'john.doe@gmail.com' : ''
  );
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showMethodSelector, setShowMethodSelector] = useState(false);

  const handleComplete = (e) => {
    e.preventDefault();
    
    // Show success notification and redirect
    toast.success('You have successfully signed up! Welcome to GhorDokan!');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleChangeMethod = (newMethod) => {
    setMethod(newMethod);
    // Reset method-specific fields
    if (newMethod === 'google') {
      setEmail('john.doe@gmail.com');
      setPassword('');
      setPhone('');
    } else if (newMethod === 'email') {
      setEmail('');
      setPassword('');
      setPhone('');
    } else if (newMethod === 'mobile') {
      setEmail('');
      setPassword('');
      setPhone('');
    }
    setShowMethodSelector(false);
  };

  const handleSignInInstead = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Navbar />

      <main className="flex-grow px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-2xl">
          <BackButton to="/signin" label="Back" />

          <div className="mt-6 rounded-lg bg-white p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Complete Your Registration</h1>
                <p className="mt-2 text-gray-600">Fill in your details to create your account.</p>
              </div>
              {method !== 'google' && (
                <button
                  type="button"
                  onClick={() => setShowMethodSelector(!showMethodSelector)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium text-sm"
                  title="Change registration method"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Change Method
                </button>
              )}
            </div>

            {/* Method Selector */}
            {showMethodSelector && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">Select registration method:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleChangeMethod('email')}
                    className={`py-2 px-4 rounded-lg font-semibold transition ${
                      method === 'email'
                        ? 'bg-gray-700 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-4 h-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChangeMethod('mobile')}
                    className={`py-2 px-4 rounded-lg font-semibold transition ${
                      method === 'mobile'
                        ? 'bg-green-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-4 h-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Mobile
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChangeMethod('google')}
                    className={`py-2 px-4 rounded-lg font-semibold transition ${
                      method === 'google'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-4 h-4 inline mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleComplete} className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {method === 'mobile' ? 'Phone Number' : method === 'google' ? 'Email (Auto-filled)' : 'Email'}
                </label>
                {method === 'email' && (
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    required
                  />
                )}
                {method === 'mobile' && (
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1XXXXXXXXX"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    required
                  />
                )}
                {method === 'google' && (
                  <div className="mt-2 w-full rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
                    <p className="text-gray-700 font-medium">{email}</p>
                    <p className="text-xs text-gray-500 mt-1">Your Google email</p>
                  </div>
                )}
              </div>

              {method !== 'google' && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    required
                  />
                </div>
              )}


              <button
                type="submit"
                className="w-full rounded-lg bg-amber-600 px-6 py-3 text-white font-semibold transition hover:bg-amber-700"
              >
                Complete Registration
              </button>
            </form>

            {/* Sign In Instead Link */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={handleSignInInstead}
                  className="text-amber-600 font-semibold hover:text-amber-700 transition"
                >
                  Sign in instead
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reg1A;
