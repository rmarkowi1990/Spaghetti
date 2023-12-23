
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'

//protected Route module
import ProtectedRoute from "./Utilities/ProtectedRoute.jsx"

import Nav from './Components/Nav.jsx'
import NavLoggedIn from './Components/NavLoggedIn.jsx'
import Splash from './Pages/Splash.jsx'
import Error404 from './Pages/Error404.jsx'
import Login from './Pages/Login.jsx'
import Footer from './Components/Footer.jsx'
import Signup from './Pages/Signup.jsx'
import Chef from './Pages/Chef.jsx'
import Preview from './Pages/Preview.jsx'
import Alert from './Components/Alert.jsx'
import Orders from './Pages/Orders.jsx'


import Feed from './Pages/Feed.jsx'


export default function Main() {


    const { loggedIn, alert } = useSelector((state) => state.session)




    return (
        <BrowserRouter>
            <div id="container">


                {loggedIn ? <NavLoggedIn /> : <Nav />}
                {alert && <Alert />}


                <Routes>
                    <Route path='/' element={loggedIn ? <Feed /> : <Splash />} />
                    <Route path='/login' element={<Login />} />

                    <Route path='/signup' element={<Signup />} />

                    <Route path='/feed' element={
                        <ProtectedRoute>
                            <Feed />
                        </ProtectedRoute>
                    } />

                    <Route path='/cheftable' element={
                        <ProtectedRoute>
                            <Chef />
                        </ProtectedRoute>
                    } />
                    <Route path='/preview' element={
                        <ProtectedRoute>
                            <Preview />
                        </ProtectedRoute>
                    } />
                    <Route path='/orders' element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    } />
                    <Route path='*' element={<Error404 />} />

                </Routes>
                <Footer />
            </div>

        </BrowserRouter>

    )
}