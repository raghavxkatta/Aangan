import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Index = () => {
    const navigate = useNavigate();
    const { user, userRole, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (user) {
                if (userRole === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/home');
                }
            } else {
                navigate('/login');
            }
        }
    }, [user, userRole, loading, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-amber-600 mx-auto mb-4"></div>
                <p className="text-xl text-gray-600 dark:text-gray-300">Loading...</p>
            </div>
        </div>
    );
};

export default Index;