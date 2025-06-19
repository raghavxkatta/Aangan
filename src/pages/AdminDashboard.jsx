import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen to users collection
        const unsubscribeUsers = onSnapshot(collection(db, 'users'), (querySnapshot) => {
            const usersData = [];
            querySnapshot.forEach((doc) => {
                usersData.push({ id: doc.id, ...doc.data() });
            });
            setUsers(usersData);
        });

        // Listen to posts collection
        const unsubscribePosts = onSnapshot(collection(db, 'posts'), (querySnapshot) => {
            const postsData = [];
            querySnapshot.forEach((doc) => {
                postsData.push({ id: doc.id, ...doc.data() });
            });
            setPosts(postsData);
            setLoading(false);
        });

        return () => {
            unsubscribeUsers();
            unsubscribePosts();
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
                <Navbar />
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-amber-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold text-amber-800 dark:text-amber-300 mb-4">
                        Admin Dashboard
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Manage users and monitor content
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Users Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border-4 border-amber-600"
                    >
                        <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-6">
                            All Users ({users.length})
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-amber-100 dark:bg-amber-900">
                                        <th className="px-4 py-3 text-left text-lg font-medium text-amber-800 dark:text-amber-300">
                                            Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-lg font-medium text-amber-800 dark:text-amber-300">
                                            Email
                                        </th>
                                        <th className="px-4 py-3 text-left text-lg font-medium text-amber-800 dark:text-amber-300">
                                            Role
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                                                {user.name}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-sm font-medium ${user.role === 'admin'
                                                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Posts Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border-4 border-amber-600"
                    >
                        <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-6">
                            All Posts ({posts.length})
                        </h2>

                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-amber-50 dark:bg-amber-900 p-4 rounded-lg">
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                                        {post.message.substring(0, 100)}...
                                    </p>
                                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                        <span>By {post.authorName}</span>
                                        <span>{post.likes} likes</span>
                                    </div>
                                </div>
                            ))}

                            {posts.length === 0 && (
                                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                                    No posts available
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Statistics */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Total Users
                        </h3>
                        <p className="text-3xl font-bold text-blue-600">{users.length}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Total Posts
                        </h3>
                        <p className="text-3xl font-bold text-green-600">{posts.length}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Total Likes
                        </h3>
                        <p className="text-3xl font-bold text-yellow-600">
                            {posts.reduce((total, post) => total + (post.likes || 0), 0)}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;