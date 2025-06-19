import React, { useState } from 'react';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'A retired teacher who loves gardening and spending time with grandchildren.',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSave = () => {
        console.log('Saving changes:', userInfo);
        // Placeholder for future API call
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-maroon dark:text-beige mb-6">Your Profile</h1>
            <div className="space-y-4">
                <div>
                    <label className="block text-lg font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-lg bg-beige/50 dark:bg-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-lg bg-beige/50 dark:bg-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium">Bio</label>
                    <textarea
                        name="bio"
                        value={userInfo.bio}
                        onChange={handleChange}
                        rows="4"
                        className="w-full mt-1 p-2 border rounded-lg bg-beige/50 dark:bg-gray-700"
                    ></textarea>
                </div>
                <div className="text-right">
                    <button onClick={handleSave} className="bg-maroon text-beige px-6 py-2 rounded-lg hover:bg-mustard hover:text-maroon transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
