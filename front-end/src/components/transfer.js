import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_BASE_URL;


function Transfer() {
    const [destinationAccount, setDestinationAccount] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Retrieve 'accountId' (fromAccountId) from local storage
        const fromAccountId = localStorage.getItem('username');
        const toAccountId = destinationAccount;

        if (!fromAccountId) {
            alert("Your account ID is not available. Please log in again.");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}account/transfer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include Authorization header if your API requires authentication
                },
                body: JSON.stringify({ fromAccountId, toAccountId, amount })
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Transfer Successful: ${data.message}`);
                // Redirect or perform further actions
            } else {
                alert(`Transfer Failed: ${data.message}`);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className='container'>
            <div className='form-area'>
                <h1><i className="fa-solid fa-arrow-right-arrow-left"></i> Transfer</h1>
                <form onSubmit={handleSubmit}>
                    <div className='row input-number'>
                        <input 
                            type='text' 
                            placeholder='Destination account number' 
                            value={destinationAccount}
                            onChange={(e) => setDestinationAccount(e.target.value)}
                            name='account-number'
                        />
                    </div>
                    <div className='row input-number'>
                        <input 
                            type='number' 
                            placeholder='0.00' 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            name='number-input'
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

export default Transfer;
