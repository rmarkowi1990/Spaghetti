import React from 'react';
import { useNavigate } from 'react-router-dom';

import MealCard from '../Components/MealCard.jsx'

export default function Feed() {



    // useEffect(() => {





    // }, [])

    return (
        <div className='background'>
            <div id="mainFeed">
                <h1>leftovers near you</h1>
                <div className='feedGrid'>
                    <MealCard name="my famous lasagna" chef="HaleyLo32" rating="4.9" days="1.5" price="$5.43" image="https://www.closetcooking.com/wp-content/uploads/2009/02/Lasagna-Messy-500.jpg" />
                    <MealCard name="chicken nuggets" chef="BenCooks83" rating="3.5" days="2" price="$3.31" image="https://www.melaniecooks.com/wp-content/uploads/2013/01/chicken-nuggets-not-soggy.jpg" />
                    <MealCard name="tuna calzone sandwich" chef="DeborahLovesTuna" rating="4.3" days="1" price="$4.31" image="https://i.redd.it/ip590b04e0151.jpg" />
                    <MealCard name="panda express leftovers" chef="DinnerDale" rating="2.8" days="1" price="$2.59" image="https://paladinipotpie.files.wordpress.com/2012/07/leftover-chinese-food.jpg" />
                    <MealCard name="slime dogs" chef="MrSlime" rating="1.3" days="4" price="$1.31" image="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_04/1312948/pb-hotdog-20180124-inline.jpg" />
                </div>

            </div>
        </div>
    )

}