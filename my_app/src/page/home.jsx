import React, { useState } from 'react';
import {useLocation } from "react-router-dom";

const Home = () => {

const location = useLocation();

    const [message , setMessage] = useState(null)
    const sendMessage = () => {

        document.getElementById('message').value = ""
    } 

    return (
        <div>
            <h1>hello {location.state.userName}</h1>
            <input type="text" className='' id='message' onChange={(e) => setMessage(e.target.value)}/>
            <button className='' onClick={() => sendMessage()}>send</button>
        </div>
    )
}

export default Home
