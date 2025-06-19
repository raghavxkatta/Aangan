import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../utils/toast';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import SurprisePopup from '../components/SurprisePopup';

const nostalgicQuotes = [
    "The good old days were never that good, and tomorrow won't be as bad as you think.",
    "Memory is the treasure of the mind wherein the monuments thereof are kept and preserved.",
    "Yesterday is history, tomorrow is a mystery, today is a gift.",
    "The best thing about memories is making them.",
    "Life is short, but memories last forever.",
    "Every moment matters, every memory counts.",
    "The heart never forgets what the mind remembers.",
    "In the end, we will remember not the words of our enemies, but the silence of our friends."
];

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
    const [randomQuote, setRandomQuote] = useState('');
    const [newPost, setNewPost] = useState({ title: '', message: '' });
    const { user } = useAuth();

    useEffect(() => {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postsData = [];
            querySnapshot.forEach((doc) => {
                postsData.push({ id: doc.id, ...doc.data() });
            });
            setPosts(postsData);
        });

        return () => unsubscribe();
    }, []);

    const handleSurpriseClick = () => {
        const quote = nostalgicQuotes[Math.floor(Math.random() * nostalgicQuotes.length)];
        setRandomQuote(quote);
        setIsModalOpen(true);
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();

        if (!newPost.title.trim() || !newPost.message.trim()) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        try {
            await addDoc(collection(db, 'posts'), {
                title: newPost.title,
                message: newPost.message,
                authorId: user.uid,
                authorName: user.displayName || 'Anonymous',
                likes: 0,
                createdAt: new Date().toISOString()
            });

            setNewPost({ title: '', message: '' });
            setIsNewPostModalOpen(false);
            showToast('Memory shared successfully!', 'success');
        } catch (error) {
            showToast('Failed to share memory', 'error');
        }
    };

    const handleLike = async (postId, newLikes) => {
        try {
            await updateDoc(doc(db, 'posts', postId), {
                likes: newLikes
            });
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold text-amber-800 dark:text-amber-300 mb-4">
                        Memory Lane
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Share your precious memories with the community
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsNewPostModalOpen(true)}
                        className="bg-amber-600 hover:bg-amber-700 text-white p-6 rounded-lg text-xl font-medium shadow-lg"
                    >
                        ✍️ Share a Memory
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSurpriseClick}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-6 rounded-lg text-xl font-medium shadow-lg"
                    >
                        ✨ Tap for a Memory Spark
                    </motion.button>
                </div>

                <div className="space-y-6">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onLike={handleLike}
                        />
                    ))}

                    {posts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-500 dark:text-gray-400">
                                No memories shared yet. Be the first to share a story!
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <SurprisePopup
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                quote={randomQuote}
            />

            {/* New Post Modal */}
            {isNewPostModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-6">
                            Share Your Memory
                        </h2>

                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <div>
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                    className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    placeholder="Give your memory a title..."
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Your Story
                                </label>
                                <textarea
                                    value={newPost.message}
                                    onChange={(e) => setNewPost({ ...newPost, message: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    placeholder="Share your memory..."
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg text-lg font-medium"
                                >
                                    Share Memory
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsNewPostModalOpen(false)}
                                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-lg font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Home;