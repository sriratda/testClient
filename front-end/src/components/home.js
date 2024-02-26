import React, { useEffect, useState } from 'react';// import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import './home.css';


// const apiURL = '';
// const mockTransaction = [
//     { date: '20/02/2024', time: '10:53:00', type: 'Deposit-ATM', amount: 200.00, total: 1000.00 },
//     { date: '20/02/2024', time: '10:53:00', type: 'Withdraw-ATM', amount: -200.00, total: 1000.00 }
// ]

// const username = "Bas Taks";
    function Home() {
        const [transaction, setTransaction] = useState([]);
        const [balance, setBalance] = useState(0);
        const [username, setUsername] = useState('');
    
        useEffect(() => {
            const fetchProfile = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log('No token found');
                    // Handle the case when there is no token. Maybe redirect to login page.
                    return;
                }
    
                try {
                    const response = await fetch('/profile', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
    
                    if (!response.ok) {
                        throw new Error('Failed to fetch profile data');
                    }
    
                    const data = await response.json();
                    setTransaction(data.account.transactions || []);
                    setBalance(data.account.balance || 0);
                    setUsername(data.account.username || 'User');
                } catch (error) {
                    console.error('Error fetching profile:', error);
                    // Handle the error. Maybe show a message to the user.
                }
                console.log(transaction.timestamp)
            };
    
            fetchProfile();
        }, []);
    const sortedTransactions = transaction.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
        <div className='container'>
            <div className='bg'></div>
            <div className='content'>
                <div className='row balance'>
                    <h1>Hello : {username}</h1>
                    <div className='blance-number'>
                        <span className='currency'>$</span>
                        <span className='number'>{balance}</span>
                    </div>
                    <div className='user'>
                        <Link to='/'><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='link-btn'>
                        <Link to='/deposit'><i class="fa-solid fa-money-bill-transfer"></i> Deposit</Link>
                        <Link to='/transfer'><i class="fa-solid fa-arrow-right-arrow-left"></i> Transfer</Link>
                        <Link to='/withdraw'><i class="fa-solid fa-money-bill-transfer"></i> Withdraw</Link>
                    </div>
                </div>
                <div className='row list'>
                <ul>
                        {sortedTransactions.map((transaction) => (
                        <li className='list-item' key={transaction._id}>
                            <span className='list-type'>{transaction.type}</span>
                            <div className='info'>
                                <span className='list-date'>{new Date(transaction.timestamp).toLocaleString()}</span>
                                {
                                    (transaction.type === 'Transfer' || transaction.type === 'Withdrawal') ?
                                        <span style={{color: '#f50e40'}} className='list-number'>-${Math.abs(transaction.amount)}</span> :
                                        <span style={{color: '#00a854'}} className='list-number'>${transaction.amount}</span>
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </div>
    )
}


export default Home;