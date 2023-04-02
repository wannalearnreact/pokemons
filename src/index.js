import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PokemonProvider } from './context/PokemonProvider';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <PokemonProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </PokemonProvider>
    </AuthContextProvider>
);
