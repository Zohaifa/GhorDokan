import { useState } from 'react';
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

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

	const toggleAuth = () => {
		if (isAuthenticated) {
			setIsAuthenticated(false);
			setUser(null);
			toast.info('Logged out successfully');
		} else {
			const dummyUser = { name: 'Ahmed Khan', email: 'ahmed@example.com' };
			setUser(dummyUser);
			setIsAuthenticated(true);
			toast.success(`Welcome, ${dummyUser.name}!`);
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
		</Routes>
		</>
	);
};

export default App;
