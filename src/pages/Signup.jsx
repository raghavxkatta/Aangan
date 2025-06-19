import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export default function Signup() {
    const [form, setForm] = useState({ email: '', password: '', name: '', role: 'user' });

    const handleSignup = async (e) => {
        e.preventDefault();
        const { email, password, name, role } = form;

        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: name });

        await setDoc(doc(db, 'users', userCred.user.uid), {
            uid: userCred.user.uid,
            name,
            email,
            role, // "admin" or "user"
        });

        // redirect after signup based on role
    };

    return (
        <form onSubmit={handleSignup}>
            {/* Inputs: name, email, password, role dropdown */}
            <button type="submit">Sign up</button>
        </form>
    );
}
