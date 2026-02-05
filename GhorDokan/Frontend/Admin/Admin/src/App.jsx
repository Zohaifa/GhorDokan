import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Order from './pages/Order';
import Customers from './pages/Customers';
import Products from './pages/Products';
import CreateProduct from './pages/CreateProduct';

const App = () => {
	const [user, setUser] = useState(null);
	const [userRole, setUserRole] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;

		const getSession = async () => {
			const { data } = await supabase.auth.getSession();
			if (!mounted) return;

			if (data?.session?.user) {
				setUser(data.session.user);
				
				// Fetch user role from profiles
				const { data: profile } = await supabase
					.from('profiles')
					.select('role')
					.eq('id', data.session.user.id)
					.single();
				
				setUserRole(profile?.role);
			} else {
				setUser(null);
				setUserRole(null);
			}
			setLoading(false);
		};

		getSession();

		const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
			if (session?.user) {
				setUser(session.user);
				
				const { data: profile } = await supabase
					.from('profiles')
					.select('role')
					.eq('id', session.user.id)
					.single();
				
				setUserRole(profile?.role);
			} else {
				setUser(null);
				setUserRole(null);
			}
		});

		return () => {
			mounted = false;
			listener?.subscription?.unsubscribe?.();
		};
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-50">
				<p className="text-gray-600">Loading...</p>
			</div>
		);
	}

	// If not authenticated or not admin, show login page
	if (!user || userRole !== 'admin') {
		return <AdminLogin />;
	}

	// Protect all routes - user is authenticated and is admin
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home user={user} userRole={userRole} />} />
				<Route path="/orders" element={<Orders user={user} userRole={userRole} />} />
				<Route path="/orders/:id" element={<Order user={user} userRole={userRole} />} />
				<Route path="/customers" element={<Customers user={user} userRole={userRole} />} />
				<Route path="/products" element={<Products user={user} userRole={userRole} />} />
				<Route path="/products/create" element={<CreateProduct user={user} userRole={userRole} />} />
			</Routes>
		</Router>
	);
};

export default App;
