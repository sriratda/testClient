import React from 'react';
import { Link } from 'react-router-dom';

function Success() {
    return (
        <div className='container'>
            <div className='form-area'>
                <h1 style={{ textAlign: 'center' }}>Success</h1>
                <div className='icon'><i class="fa-solid fa-check"></i></div>
                <div className='row ok-btn'>
                    <div className='link-btn'>
                        <Link to='/home'>Ok</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Success;