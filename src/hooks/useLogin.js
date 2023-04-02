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
                setError(err.message);
                console.log(err.message);
            });
    };

    return { error, login, setError };
};
