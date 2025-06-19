import { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                // Fetch user role from Firestore
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserRole(userDoc.data().role);
                }
            } else {
                setUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result;
    };

    const signup = async (email, password, name, role) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);

        // Save user data to Firestore
        await setDoc(doc(db, 'users', result.user.uid), {
            name,
            email,
            role,
            bio: '',
            createdAt: new Date().toISOString()
        });

        return result;
    };

    

    const logout = async () => {
        await signOut(auth);
    };

    const value = {
        user,
        userRole,
        login,
        signup,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};