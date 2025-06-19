import { motion } from 'framer-motion';
import { useState } from 'react';

const PostCard = ({ post, onLike }) => {
    const [likes, setLikes] = useState(post.likes || 0);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        if (!isLiked) {
            const newLikes = likes + 1;
            setLikes(newLikes);
            setIsLiked(true);
            if (onLike) {
                onLike(post.id, newLikes);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-4 border-l-4 border-amber-600"
        >
            <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    {post.message}
                </p>
            </div>

            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    By {post.authorName} • {new Date(post.createdAt).toLocaleDateString()}
                </div>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${isLiked
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-yellow-500 hover:text-white'
                        }`}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-lg font-medium">{likes}</span>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default PostCard;