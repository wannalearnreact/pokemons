import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
//firebase
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const login = (email, password) => {
        setError(null);
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                dispatch({ type: 'LOGIN', payload: res.user });
                console.log('logged in');
            })
            .catch((err) => {
                if (
                    err.code === 'auth/wrong-password' ||
                    err.code === 'auth/invalid-email'
                ) {
                    setError('Invalid data, please try again!');
                } else if (err.code === 'auth/user-not-found') {
                    setError("User doesn't exist!");
                } else {
                    setError('An error occurred. Please try again later.');
                }
                console.log('err', err.code);
            });
    };

    return { error, login };
};
