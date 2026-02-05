import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Registration from './pages/Registration';
import AllProducts from './pages/AllProducts';
import Reg1A from './pages/Reg1A';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';
import ProductDetails from './pages/ProductDetails';
import DebugSupabase from './pages/DebugSupabase';
import { supabase } from './lib/supabaseClient'

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		let mounted = true;

		const getSession = async () => {
			const { data } = await supabase.auth.getSession();
			if (!mounted) return;
			if (data?.session) {
				setIsAuthenticated(true);
				setUser(data.session.user);
			} else {
				setIsAuthenticated(false);
				setUser(null);
			}
		};

		getSession();

		const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
			if (session?.user) {
				setIsAuthenticated(true);
				setUser(session.user);
			} else {
				setIsAuthenticated(false);
				setUser(null);
			}
		});

		return () => {
			mounted = false;
			listener?.subscription?.unsubscribe?.();
		};
	}, []);

	const toggleAuth = async () => {
		if (isAuthenticated) {
			await supabase.auth.signOut();
			setIsAuthenticated(false);
			setUser(null);
			toast.info('Logged out successfully');
		}
	};

	return (
		<>
		<ScrollToTop />
		<Routes>
			<Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} toggleAuth={toggleAuth} />} />
			<Route path="/home" element={<Home isAuthenticated={isAuthenticated} user={user} toggleAuth={toggleAuth} />} />
			<Route path="/signin" element={<SignIn />} />
			<Route path="/registration" element={<Registration />} />
			<Route path="/products" element={<AllProducts isAuthenticated={isAuthenticated} user={user} toggleAuth={toggleAuth} />} />
			<Route path="/product/:id" element={<ProductDetails isAuthenticated={isAuthenticated} user={user} toggleAuth={toggleAuth} />} />
			<Route path="/reg1a" element={<Reg1A />} />
			<Route path="/cart" element={<Cart isAuthenticated={isAuthenticated} user={user} toggleAuth={toggleAuth} />} />
			<Route path="/checkout" element={<Checkout isAuthenticated={isAuthenticated} user={user} toggleAuth={toggleAuth} />} />
			<Route path="/dashboard" element={<Dashboard isAuthenticated={isAuthenticated} user={user} toggleAuth={toggleAuth} />} />
			<Route path="/orders" element={<Orders isAuthenticated={isAuthenticated} user={user} toggleAuth={toggleAuth} />} />
			<Route path="/favorites" element={<Favorites isAuthenticated={isAuthenticated} user={user} toggleAuth={toggleAuth} />} />
			<Route path="/debug" element={<DebugSupabase />} />
		</Routes>
		</>
	);
};

export default App;
