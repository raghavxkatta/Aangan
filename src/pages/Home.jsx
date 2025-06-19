import React, { useState } from 'react';
import PostCard from '../components/PostCard';
import SurprisePopup from '../components/SurprisePopup';

const staticPosts = [
    { id: 1, title: 'First Day of College', message: 'I still remember the nervousness and excitement...', stars: 5 },
    { id: 2, title: 'My Wedding Day', message: 'A beautiful day filled with family, friends, and so much love.', stars: 12 },
    { id: 3, title: 'Birth of my first child', message: 'A life-changing moment that I will cherish forever.', stars: 20 },
];

const nostalgicQuotes = [
    "The past is a foreign country; they do things differently there.",
    "The best way to predict the future is to create it.",
    "Life is like riding a bicycle. To keep your balance, you must keep moving."
];

const Home = () => {
    const [showSurprise, setShowSurprise] = useState(false);
    const [quote, setQuote] = useState('');

    const handleSurprise = () => {
        const randomQuote = nostalgicQuotes[Math.floor(Math.random() * nostalgicQuotes.length)];
        setQuote(randomQuote);
        setShowSurprise(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-maroon dark:text-beige">Memory Lane</h1>
                <button onClick={handleSurprise} className="bg-mustard text-maroon px-4 py-2 rounded-lg hover:bg-maroon hover:text-beige transition-colors">
                    Memory Spark
                </button>
            </div>
            <div className="grid gap-6">
                {staticPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            {showSurprise && <SurprisePopup quote={quote} onClose={() => setShowSurprise(false)} />}
        </div>
    );
};

export default Home;
