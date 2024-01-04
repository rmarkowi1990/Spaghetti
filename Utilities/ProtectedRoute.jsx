import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    //check location property from redux state
    const loggedIn = useSelector((state) => state.session.loggedIn);



    console.log("checking if logged in: ", loggedIn);


    if (!loggedIn) {
        return <Navigate to='/login' />;

    }

    return children;

}

export default ProtectedRoute;