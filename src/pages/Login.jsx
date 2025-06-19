import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../utils/toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, userRole } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
            showToast('Logged in successfully!', 'success');

            // Navigate based on role
            if (userRole === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/home');
            }
        } catch (error) {
            showToast('Invalid email or password', 'error');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md border-4 border-amber-600"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-amber-800 dark:text-amber-300 mb-2">
                        आंगन
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Welcome back to your community
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            required
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg text-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </motion.button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or</span>
                        </div>
                    </div>

                    
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-300">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-amber-600 hover:text-amber-700 font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;