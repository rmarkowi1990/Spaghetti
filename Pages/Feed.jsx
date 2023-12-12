import React from 'react';
import { useNavigate } from 'react-router-dom';

import MealCard from '../Components/MealCard.jsx'

export default function Feed() {

    return (
        <div className='background'>
            <div id="mainFeed">
                <h1>leftovers near you</h1>
                <div className='feedGrid'>
                    <MealCard name="lasagna" chef="HaleyLo32" rating="4.9" days="5" price="$5.43" />
                    <MealCard name="chicken nuggets" chef="BenCooks83" rating="3.5" days="2" price="$3.31" />
                    <MealCard name="hot dogs" chef="MrSlime" rating="1.3" days="4" price="$1.31" />
                </div>

            </div>
        </div>
    )

}