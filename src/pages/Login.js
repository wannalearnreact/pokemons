import React, { useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext.js';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(PokemonContext);
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                setUser(userCredential.user);
                navigate('/');
                console.log('user', user, 'has logged in');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    return (
        <>
            <main>
                <section style={{ backgroundColor: 'white' }}>
                    <form>
                        <div>
                            <label htmlFor='email-address'>Email address</label>
                            <input
                                id='email-address'
                                name='email'
                                type='email'
                                required
                                placeholder='Email address'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor='password'>Password</label>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                required
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button onClick={onLogin}>Login</button>
                        </div>
                    </form>

                    <p className='text-sm text-white text-center'>
                        No account yet? <NavLink to='/signup'>Sign up</NavLink>
                    </p>
                </section>
            </main>
        </>
    );
};

export default Login;
