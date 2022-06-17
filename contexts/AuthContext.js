import { createContext, useContext, useEffect, useState } from 'react';
import { auth, storage } from '../init-firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,
    sendPasswordResetEmail,
    confirmPasswordReset,
    GithubAuthProvider,
    updateProfile
} from 'firebase/auth';

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AuthContext = createContext({
    currentUser: null,
    register: () => Promise,
    login: () => Promise,
    logout: () => Promise,
    upload:()=> Promise,
    signInWithGoogle:()=>Promise,
})

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        })
        return () => {
            unsubscribe();
        }
    }, []);

    const login = (email, password ) => {
        return signInWithEmailAndPassword(auth, email, password );
    }

    const logout = () => {
        signOut(auth);
    }
        
    const signInWithGoogle = (email, password) => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const [photoURL, setPhotoURL] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png');

    const upload = async (file, currentUser, setLoading) => {
        const fileRef = ref(storage, currentUser.uid + 'png');

        setLoading(true);

        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);

        updateProfile(currentUser, {photoURL});

        setLoading(false);
        alert('Uploaded file!')
    }

    useEffect(()=>{
        if(currentUser?.photoURL){
            setPhotoURL(currentUser.photoURL)
        }
    },[currentUser]);

    const value = {
        currentUser,
        login,
        logout,
        register,
        upload,
        photoURL,
        signInWithGoogle,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}