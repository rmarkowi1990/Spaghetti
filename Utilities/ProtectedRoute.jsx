import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    // const navigate = useNavigate()
    const location = useLocation();

    //check location property from redux state
    const loggedIn = useSelector((state) => state.macro.loggedIn);

    console.log("checking if logged in: ", loggedIn);


    if (!loggedIn) {
        return <Navigate to='/login' />;

    }

    return children;

}

export default ProtectedRoute;