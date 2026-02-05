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
import CreateCategory from './pages/CreateCategory';

// Protected route component
const ProtectedRoute = ({ element, user, userRole, loading }) => {
	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-50">
				<p className="text-gray-600">Loading...</p>
			</div>
		);
	}

	if (!user || userRole !== 'admin') {
		return <Navigate to="/login" replace />;
	}

	return element;
};

const AppContent = ({ user, userRole, loading }) => {
	return (
		<Routes>
			<Route path="/login" element={<AdminLogin />} />
			<Route
				path="/"
				element={<ProtectedRoute element={<Home user={user} userRole={userRole} />} user={user} userRole={userRole} loading={loading} />}
			/>
			<Route
				path="/orders"
				element={<ProtectedRoute element={<Orders user={user} userRole={userRole} />} user={user} userRole={userRole} loading={loading} />}
			/>
			<Route
				path="/orders/:id"
				element={<ProtectedRoute element={<Order user={user} userRole={userRole} />} user={user} userRole={userRole} loading={loading} />}
			/>
			<Route
				path="/customers"
				element={<ProtectedRoute element={<Customers user={user} userRole={userRole} />} user={user} userRole={userRole} loading={loading} />}
			/>
			<Route
				path="/products"
				element={<ProtectedRoute element={<Products user={user} userRole={userRole} />} user={user} userRole={userRole} loading={loading} />}
			/>
			<Route
				path="/products/create"
				element={<ProtectedRoute element={<CreateProduct user={user} userRole={userRole} />} user={user} userRole={userRole} loading={loading} />}
			/>
			<Route
				path="/categories/create"
				element={<ProtectedRoute element={<CreateCategory user={user} userRole={userRole} />} user={user} userRole={userRole} loading={loading} />}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

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

	return (
		<Router>
			<AppContent user={user} userRole={userRole} loading={loading} />
		</Router>
	);
};

export default App;
