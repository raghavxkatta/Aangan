import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../utils/toast';
import { Link, useNavigate } from 'react-router-dom';

const ADMIN_SECRET = "aangan@admin"; // 🔐 Change this as needed

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        adminAccessCode: '',
    });

    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword, role, adminAccessCode } = formData;

        if (password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        if (role === 'admin' && adminAccessCode !== ADMIN_SECRET) {
            showToast('Invalid admin access code', 'error');
            return;
        }

        setLoading(true);

        try {
            await signup({
                email,
                password,
                fullName: name,
                role,
            });

            showToast('Account created successfully!', 'success');
            navigate(role === 'admin' ? '/admin-dashboard' : '/home');
        } catch (error) {
            console.error('Signup failed:', error.code, error.message);
            showToast(error.message || 'Failed to create account', 'error');
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
                    <h1 className="text-4xl font-bold text-amber-800 dark:text-amber-300 mb-2">आंगन</h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">Join our community</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {formData.role === 'admin' && (
                        <div>
                            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Admin Access Code
                            </label>
                            <input
                                type="password"
                                name="adminAccessCode"
                                value={formData.adminAccessCode}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </motion.button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-300">
                        Already have an account?{' '}
                        <Link to="/login" className="text-amber-600 hover:text-amber-700 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
