import { createContext, useReducer, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        case 'AUTH_IS_READY':
            return { user: action.payload, authIsReady: true };
        case 'TOGGLE_FORM':
            return { ...state, showForm: !state.showForm };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false,
        showForm: false, // added to initial state
    });

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            dispatch({ type: 'AUTH_IS_READY', payload: user });
            unsub();
        });
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
