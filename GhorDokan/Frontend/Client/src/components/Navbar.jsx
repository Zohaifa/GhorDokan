import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Navbar = ({ isAuthenticated, user, toggleAuth }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-amber-600 text-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="GhorDokan logo" className="h-10 w-10 rounded-full object-cover" />
          <span className="text-xl font-bold tracking-wide">GhorDokan</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link to="/" className="transition hover:opacity-80">Home</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="transition hover:opacity-80">Dashboard</Link>
              <Link to="/products" className="transition hover:opacity-80">Products</Link>
              <Link to="/orders" className="transition hover:opacity-80">Orders</Link>
              <Link
                to="/favorites"
                className="relative flex items-center justify-center transition hover:opacity-80"
                title="Favorites"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </Link>
              <Link
                to="/cart"
                className="relative flex items-center justify-center transition hover:opacity-80"
                title="Shopping Cart"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold">
                  0
                </span>
              </Link>
              <button
                onClick={toggleAuth}
                className="rounded-lg bg-white/20 px-4 py-2 font-semibold transition hover:bg-white/30"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/products" className="transition hover:opacity-80">Products</Link>
              <Link to="/signin" className="transition hover:opacity-80">Sign In</Link>
              <Link to="/registration" className="rounded-lg bg-white/20 px-4 py-2 font-semibold transition hover:bg-white/30">Sign Up</Link>
              <Link
                to="/cart"
                className="relative flex items-center justify-center transition hover:opacity-80"
                title="Shopping Cart"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold">
                  0
                </span>
              </Link>
            </>
          )}
        </nav>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 transition hover:bg-white/30 md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="border-t border-white/20 bg-amber-600/95 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 pb-4 pt-3 text-sm font-medium">
            <Link to="/products" className="rounded-lg px-3 py-2 text-left transition hover:bg-white/10">Products</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="rounded-lg px-3 py-2 text-left transition hover:bg-white/10 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4" />
                  </svg>
                  Dashboard
                </Link>
                <Link to="/orders" className="rounded-lg px-3 py-2 text-left transition hover:bg-white/10">Orders</Link>
                <Link to="/favorites" className="rounded-lg px-3 py-2 text-left transition hover:bg-white/10 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  Favorites
                </Link>
                <Link to="/cart" className="rounded-lg px-3 py-2 text-left transition hover:bg-white/10 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Cart
                </Link>
                <button
                  onClick={toggleAuth}
                  className="rounded-lg px-3 py-2 text-left transition hover:bg-white/10 text-red-300 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="rounded-lg px-3 py-2 text-left transition hover:bg-white/10">Sign In</Link>
                <Link to="/registration" className="rounded-lg px-3 py-2 text-left transition hover:bg-white/10 text-white/80 font-semibold">Sign Up</Link>
                <Link to="/cart" className="rounded-lg px-3 py-2 text-left transition hover:bg-white/10 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Cart
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
