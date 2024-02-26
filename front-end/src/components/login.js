import React, { useState } from 'react';
import logo from '../logo512.png';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Token:", data.token); // Log the token
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.user.username)
                window.location.href = '/home';
                console.log(data.user.username)
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className='App'>
            <div className='bg'></div>
            <div className='form-area'>
                <form onSubmit={handleSubmit}>
                    <div className='logo'>
                    <img src={logo} alt='logo'></img>
                    </div>
                    {/* form area */}
                    <div className='input'>
                        <div className='input-area'>
                            <i class="fa-solid fa-user"></i>
                            <input
                                placeholder='Username'
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className='input-area'>
                            <i class="fa-solid fa-lock"></i>
                            <input
                                placeholder='Password'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='btn'>
                            <button type='submit'>Login</button>
                        </div>
                        {error && <p className="error">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
