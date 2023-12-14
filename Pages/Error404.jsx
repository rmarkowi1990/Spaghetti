import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Error404() {

    const navigate = useNavigate()

    return (
        <div className="error404">
            <h1>Oh No!</h1>
            <h2>We <i>spilled</i>  the Spaghetti.</h2>
            <button onClick={() => navigate('/')}>return</button>
        </div>
    )
}