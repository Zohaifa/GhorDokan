import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { supabase } from "./lib/supabaseClient";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import CreateCategory from "./pages/CreateCategory";

// 1. Helper function to fetch role (Clean separation of concerns)
const fetchUserRole = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (error) {
      console.warn("Profile fetch warning:", error.message);
      return null;
    }
    return data?.role || null;
  } catch (err) {
    console.error("Unexpected profile error:", err);
    return null;
  }
};

// 2. Protected Route Component
const ProtectedRoute = ({ element, user, userRole, loading }) => {
  // While global loading is true, show spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  // Redirect if invalid
  if (!user || userRole !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return element;
};

// 3. Main Routes
const AppContent = ({ user, userRole, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
        <p className="ml-4 text-gray-600">Loading system...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user && userRole === "admin" ? (
            <Navigate to="/" replace />
          ) : (
            <AdminLogin />
          )
        }
      />
      <Route
        path="/"
        element={
          !user ? (
            <Navigate to="/login" replace />
          ) : userRole === "admin" ? (
            <Home user={user} userRole={userRole} />
          ) : (
            // Fallback for logged in user with no role
            <div className="flex flex-col items-center justify-center min-h-screen">
              <p className="text-xl font-semibold">Verifying Access...</p>
              <button
                onClick={() => supabase.auth.signOut()}
                className="mt-4 text-blue-600 underline"
              >
                Sign Out
              </button>
            </div>
          )
        }
      />

      {/* Protected Routes */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute
            element={<Orders user={user} userRole={userRole} />}
            user={user}
            userRole={userRole}
            loading={loading}
          />
        }
      />
      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute
            element={<Order user={user} userRole={userRole} />}
            user={user}
            userRole={userRole}
            loading={loading}
          />
        }
      />
      <Route
        path="/customers"
        element={
          <ProtectedRoute
            element={<Customers user={user} userRole={userRole} />}
            user={user}
            userRole={userRole}
            loading={loading}
          />
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute
            element={<Products user={user} userRole={userRole} />}
            user={user}
            userRole={userRole}
            loading={loading}
          />
        }
      />
      <Route
        path="/products/create"
        element={
          <ProtectedRoute
            element={<CreateProduct user={user} userRole={userRole} />}
            user={user}
            userRole={userRole}
            loading={loading}
          />
        }
      />
      <Route
        path="/categories/create"
        element={
          <ProtectedRoute
            element={<CreateCategory user={user} userRole={userRole} />}
            user={user}
            userRole={userRole}
            loading={loading}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// 4. Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          if (mounted) setUser(session.user);

          // STOP loading immediately after session check
          if (mounted) setLoading(false);

          // Fetch role async (non-blocking)
          fetchUserRole(session.user.id).then((role) => {
            if (mounted) setUserRole(role);
          });
        } else {
          if (mounted) setLoading(false);
        }
      } catch (error) {
        console.error("Init error:", error);
        if (mounted) setLoading(false);
      }
    };

    // Run initialization
    initializeAuth();

    // C. Setup Listener for FUTURE updates (Sign In / Sign Out)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // IGNORE INITIAL_SESSION: We already handled it in initializeAuth()
      if (event === "INITIAL_SESSION") return;

      if (event === "SIGNED_IN") {
        if (mounted) {
          setUser(session.user);
          setLoading(false);

          fetchUserRole(session.user.id).then((role) => {
            if (mounted) setUserRole(role);
          });
        }
      } else if (event === "SIGNED_OUT") {
        if (mounted) {
          setUser(null);
          setUserRole(null);
          setLoading(false); // Ensure we aren't stuck loading
        }
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <AppContent user={user} userRole={userRole} loading={loading} />
    </Router>
  );
};

export default App;
