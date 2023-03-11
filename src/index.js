import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PokemonProvider } from './context/PokemonProvider';
import { FirebaseProvider } from './context/FirebaseProvider';
import { AuthProvider } from './context/AuthProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <FirebaseProvider>
        <AuthProvider>
            <PokemonProvider>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </PokemonProvider>
        </AuthProvider>
    </FirebaseProvider>
);
