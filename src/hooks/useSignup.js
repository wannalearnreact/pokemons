import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
//firebase
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = (email, password) => {
        setError(null);
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                dispatch({ type: 'LOGIN', payload: res.user });
            })
            .catch((err) => {
                if (
                    err.code === 'auth/wrong-password' ||
                    err.code === 'auth/invalid-email'
                ) {
                    setError('Invalid data, please try again!');
                } else {
                    setError('An error occurred. Please try again later.');
                }
                console.log('err', err.code);
            });
    };

    return { error, signup };
};
