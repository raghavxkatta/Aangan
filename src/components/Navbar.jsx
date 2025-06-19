import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, User, LogOut, Menu, X } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { toast } from '@/hooks/use-toast';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const { user, userProfile } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
            toast({
                title: "Logged out successfully",
                description: "Take care, see you soon!",
            });
        } catch (error) {
            console.error('Logout error:', error);
            toast({
                title: "Error logging out",
                description: "Please try again.",
                variant: "destructive",
            });
        }
    };

    const activeLinkStyle = {
        color: '#7c3a1d',
        fontWeight: 'bold',
    };

    if (!user) return null;

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 bg-beige/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md p-4"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link to={userProfile?.role === 'admin' ? '/admin-dashboard' : '/home'} className="text-2xl font-bold text-mustard">
                    Aangan
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 text-lg">
                    <NavLink to="/home" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
                        Memories
                    </NavLink>
                    <NavLink to="/profile" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
                        Profile
                    </NavLink>
                    <NavLink to="/admin-dashboard" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
                        Admin
                    </NavLink>

                    {/* Theme Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-secondary hover:bg-accent transition-colors"
                        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDark ? (
                            <Sun className="h-5 w-5 text-mustard-500" />
                        ) : (
                            <Moon className="h-5 w-5 text-primary" />
                        )}
                    </motion.button>

                    {/* Profile Icon */}
                    <Link to="/profile" className="text-2xl text-maroon dark:text-beige">
                        <FaUserCircle />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-xl bg-secondary hover:bg-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden py-4 border-t border-border"
                >
                    <div className="space-y-4">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center w-full px-4 py-2 text-left rounded-xl hover:bg-accent transition-colors"
                        >
                            {isDark ? (
                                <Sun className="h-5 w-5 mr-3 text-mustard-500" />
                            ) : (
                                <Moon className="h-5 w-5 mr-3 text-primary" />
                            )}
                            {isDark ? 'Light Mode' : 'Dark Mode'}
                        </button>

                        <NavLink
                            to="/profile"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center px-4 py-2 rounded-xl hover:bg-accent transition-colors"
                        >
                            <User className="h-5 w-5 mr-3" />
                            Profile
                        </NavLink>

                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-left rounded-xl hover:bg-accent transition-colors text-destructive"
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            Logout
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
