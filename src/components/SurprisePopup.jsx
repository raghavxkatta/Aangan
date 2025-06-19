import React from 'react';
import { motion } from 'framer-motion';

const SurprisePopup = ({ quote, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div className="bg-beige dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center max-w-md mx-4">
                <h2 className="text-2xl font-bold text-mustard">A Memory Spark!</h2>
                <p className="text-xl mt-4">"{quote}"</p>
                <button onClick={onClose} className="mt-6 bg-maroon text-beige px-4 py-2 rounded-lg hover:bg-mustard hover:text-maroon transition-colors">
                    Close
                </button>
            </div>
        </motion.div>
    );
};

export default SurprisePopup;
