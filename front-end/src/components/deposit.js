import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Deposit() {
    const [amount, setAmount] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Retrieve 'username' from local storage
        const accountId = localStorage.getItem('username');

        console.log(accountId)
        // Check if username is not null or undefined
        if (!accountId) {
            alert("Please log in to continue.");
            return; // Optional: Redirect to login page
        }

        try {
            const response = await fetch('/account/deposit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include Authorization header if your API requires authentication
                },
                body: JSON.stringify({ accountId, amount })
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Deposit Successful: ${data.message}`);
                // Redirect or perform further actions
            } else {
                alert(`Deposit Failed: ${data.message}`);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className='container'>
            <div className='form-area'>
                <h1><i className="fa-solid fa-money-bill-transfer"></i> Deposit</h1>
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

export default Deposit;
