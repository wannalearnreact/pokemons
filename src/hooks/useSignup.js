import { useContext, useState } from 'react';
import { useAuthContext } from './useAuthContext';
//firebase
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { PokemonContext } from '../context/PokemonProvider';
export const useSignup = () => {
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();
    const { favouriteIDs } = useContext(PokemonContext);
    const signup = (email, password) => {
        setError(null);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userDocRef = doc(db, 'users', user.uid);

                setDoc(userDocRef, {
                    email: user.email,
                    uid: user.uid,
                    dateCreated: serverTimestamp(),
                    IDs: favouriteIDs,
                })
                    .then(() => {
                        dispatch({ type: 'LOGIN', payload: user });
                    })
                    .catch((error) => {
                        setError(error.message);
                        console.log(error);
                    });
            })
            .catch((error) => {
                if (
                    error.code === 'auth/wrong-password' ||
                    error.code === 'auth/invalid-email'
                ) {
                    setError('Invalid data, please try again!');
                } else if (error.code === 'auth/email-already-in-use') {
                    setError('E-mail already in use!');
                } else if (error.code === 'auth/weak-password') {
                    setError('Password too short!');
                } else {
                    setError('An error occurred. Please try again later.');
                    console.log(error);
                }
            });
    };

    return { error, signup };
};
