import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

function Withdraw() {
    const [amount, setAmount] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Retrieve the accountId from local storage
        const accountId = localStorage.getItem(`${apiUrl}username`); // Assuming the accountId is stored as 'username' in local storage

        if (!accountId) {
            alert("Your account ID is not available. Please log in again.");
            return;
        }

        try {
            const response = await fetch('/account/withdraw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include Authorization header if your API requires authentication
                },
                body: JSON.stringify({ accountId, amount })
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Withdrawal Successful: ${data.message}`);
                // Redirect or perform further actions
            } else {
                alert(`Withdrawal Failed: ${data.message}`);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className='container'>
            <div className='form-area'>
                <h1><i className="fa-solid fa-money-bill-transfer"></i> Withdraw</h1>
                <form onSubmit={handleSubmit}>
                    <div className='row input-number'>
                        <input 
                            type='number' 
                            placeholder='0.00' 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            name='input-number'
                        />
                    </div>
                    <div className='row'>
                        <div className='link-btn'>
                            <Link to='/home' className='back-btn'><i className="fa-solid fa-chevron-left"></i> Back</Link>
                            <button type='submit'>Confirm</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Withdraw;
