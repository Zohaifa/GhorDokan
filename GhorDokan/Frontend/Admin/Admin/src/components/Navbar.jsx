import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../lib/supabaseClient';
import logo from '../assets/logo.jpg';

const Navbar = ({ user }) => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Logout failed');
    } else {
      toast.success('Logged out successfully');
      window.location.href = '/';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-amber-600 text-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3 transition hover:opacity-80">
          <img src={logo} alt="GhorDokan logo" className="h-10 w-10 rounded-full object-cover" />
          <span className="text-xl font-bold tracking-wide">GhorDokan</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          {user && (
            <>
              <span className="text-amber-100">{user.email}</span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-white/20 px-4 py-2 transition hover:bg-white/30"
              >
                Log out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
