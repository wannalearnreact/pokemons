import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Register from './Register';
import '../styles/pages/Login.css';
import Button from '../components/Button';
const Login = () => {
    const { login, authErrorMessages, profile, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState(''); // input field value cannot be null
    const [password, setPassword] = useState(''); // input field value cannot be null

    const [loginRunning, setLoginRunning] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleButtonClick = async () => {
        setLoginRunning(true);
        let success = await login(email, password);
        setLoginRunning(false);
        navigate('/');
        console.log('user is', user, 'and profile is', profile);
        if (!success) {
            setErrorMessage('Registration failed!');
        }
    };

    const toggleShowRegisterScreen = () => {
        setShowRegisterForm((currVal) => !currVal);
    };

    if (showRegisterForm) {
        return (
            <div>
                <Register />
                <br />
                <br />
                <button onClick={toggleShowRegisterScreen}>
                    Sign In To Existing Account
                </button>
            </div>
        );
    }

    return (
        <div className='form-container'>
            <div className='form'>
                <div className='form-title'>Sign In To Existing Account</div>
                <div>
                    <div className='form-field'>
                        <label>e-mail</label>
                        <input
                            type='text'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='form-field'>
                        <label>password</label>
                        <input
                            type='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        {!loginRunning ? (
                            <div>
                                <Button
                                    text='Login'
                                    btnFunction={handleButtonClick}
                                    btnClass='form'
                                />
                                {(errorMessage || authErrorMessages) && (
                                    <>
                                        <h3 style={{ color: 'red' }}>
                                            {errorMessage}
                                        </h3>
                                        {authErrorMessages?.map(
                                            (errorLine, idx) => (
                                                <h4
                                                    key={`errmsg-${idx}`}
                                                    style={{ color: 'red' }}
                                                >
                                                    {errorLine}
                                                </h4>
                                            )
                                        )}
                                    </>
                                )}
                                <div className='register-container'>
                                    <div>
                                        Don't have an account?{' '}
                                        <p onClick={toggleShowRegisterScreen}>
                                            Sign up
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h6 style={{ color: 'green' }}>
                                    <em>logging in...</em>
                                </h6>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
