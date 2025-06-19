
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { showToast } from '../utils/toast';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { user, userRole, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            showToast('Logged out successfully', 'success');
            navigate('/login');
        } catch (error) {
            showToast('Error logging out', 'error');
        }
    };

    const handleLogoClick = () => {
        if (userRole === 'admin') {
            navigate('/admin-dashboard');
        } else {
            navigate('/home');
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-white dark:bg-gray-800 shadow-lg border-b-4 border-amber-700"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogoClick}
                        className="cursor-pointer"
                    >
                        <h1 className="text-3xl font-bold text-amber-800 dark:text-amber-300">
                            आंगन
                        </h1>
                    </motion.div>

                    <div className="flex items-center space-x-4">
                        <ThemeToggle />

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/profile')}
                            className="p-2 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-lg font-medium"
                        >
                            Logout
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;