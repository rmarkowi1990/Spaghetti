import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Alert() {

    const navigate = useNavigate();

    return (
        <div id="alert">
            <span></span>
            <span></span>
            <span>Hide</span>

        </div>
    )
}