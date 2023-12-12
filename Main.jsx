
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'

import Nav from './Components/Nav.jsx'
import NavLoggedIn from './Components/NavLoggedIn.jsx'
import Splash from './Pages/Splash.jsx'
import Login from './Pages/Login.jsx'
import Footer from './Components/Footer.jsx'
import Signup from './Pages/Signup.jsx'

import Feed from './Pages/Feed.jsx'


export default function Main() {


    const { loggedIn } = useSelector((state) => state.macro)



    return (<BrowserRouter>
        <div id="container">


            {loggedIn ? <NavLoggedIn /> : <Nav />}


            <Routes>
                <Route path='/' element={<Splash />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/feed' element={<Feed />} />

            </Routes>
            <Footer />
        </div>

    </BrowserRouter>

    )
}