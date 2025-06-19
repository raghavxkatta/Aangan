import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Surprise from "./pages/Surprise";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "./context/ThemeContext";
import { useAuth } from './context/AuthContext';
import './App.css';

function ProtectedRoute({ children, adminOnly }) {
  const { user, role } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (adminOnly && role !== 'admin') return <Navigate to="/home" />;
  if (!adminOnly && role !== 'user') return <Navigate to="/admin-dashboard" />;

  return children;
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="min-h-screen bg-beige text-maroon dark:bg-gray-900 dark:text-beige">
          <Navbar />
          <main className="p-4 sm:p-6">
            <Routes>
              {/* Public or shared route (Home) */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />

              <Route path="/home" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />

              {/* Profile: user-only */}
              <Route path="/profile" element={
                <ProtectedRoute adminOnly={false}>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Admin dashboard: admin-only */}
              <Route path="/admin-dashboard" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              {/* Surprise popup: any logged-in user */}
              <Route path="/surprise" element={
                <ProtectedRoute>
                  <Surprise />
                </ProtectedRoute>
              } />
            </Routes>
          </main>

          <footer className="text-center p-4 text-sm text-mustard">
            Built by Binary Brains @ BrandIT 2.0
          </footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
