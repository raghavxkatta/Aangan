import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PostCard = ({ post }) => {
    const [likes, setLikes] = useState(post.stars);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
            <h3 className="text-2xl font-bold text-maroon dark:text-mustard">{post.title}</h3>
            <p className="text-lg mt-2">{post.message}</p>
            <div className="flex justify-end items-center mt-4">
                <button onClick={handleLike} className="text-2xl">⭐</button>
                <span className="ml-2 text-lg">{likes}</span>
            </div>
        </motion.div>
    );
};

export default PostCard;
