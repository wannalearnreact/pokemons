import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';
import { useSignup } from '../hooks/useSignup';
import '../styles/utils.css';
export default function Signup() {
    const { dispatch } = useContext(AuthContext);
    const { error, signup } = useSignup();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password);
    };

    return (
        <div className='form-container'>
            <div className='form'>
                <div className='form-title'>Create a New Account</div>
                <div className='form-field'>
                    <label>e-mail</label>
                    <input
                        required
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='form-field'>
                    <label>password</label>
                    <input
                        required
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <Button
                        text='Sign Up'
                        btnFunction={handleSubmit}
                        btnClass='form'
                    />
                    {error && <p className='error'>{error}</p>}

                    <div className='signup-container'>
                        <div>
                            Already have an account?
                            <p
                                onClick={() => {
                                    navigate('/login');
                                    dispatch({ type: 'TOGGLE_FORM' });
                                }}
                            >
                                Log In
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
