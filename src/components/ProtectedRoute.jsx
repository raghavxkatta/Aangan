import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, userRole, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-amber-600 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600 dark:text-gray-300">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Role-based redirection
    const currentPath = window.location.pathname;

    if (userRole === 'admin' && currentPath === '/home') {
        return <Navigate to="/admin-dashboard" replace />;
    }

    if (userRole === 'user' && currentPath === '/admin-dashboard') {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default ProtectedRoute;