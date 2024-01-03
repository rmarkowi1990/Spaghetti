import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideAlert } from '../Redux/sessionSlice'


export default function Alert(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    return (
        <div id="alert" onClick={() => navigate('/orders')}>
            < span ></span >
            <span id="alertCenter">{props.alertBody}</span>

            <span id="alertLink" onClick={() => dispatch(hideAlert())}> Hide</span>

        </div >
    )
}