import React, { useEffect, useState } from 'react';
import thumbs_down from './images/dislike.png';
import thumbs_up from './images/like.png';
import './Rating.css'


// function increase(get, set){
//     var rating = get + 1
//     set(rating)
//     };
//     function decrease(get, set){
//         var rating = get + 1
//     set(rating)
        
//     };
export const Rating = ({rating, id}) => {

    //const [getRating, setRating] = useState(0)

    

return (
<>
<img className='thumbsdown' src={thumbs_down} onClick={(e) => {var new_rating = (rating - 1);
                fetch('http://localhost:81/updateRating', {
                    method: 'POST', body: `postID=${id}&rating=${new_rating}`,
                    headers: { 'Content-type': 'application/x-www-form-urlencoded' }})}}></img>
{rating}
<img className = 'thumbsup' src={thumbs_up} onClick={(e) => {var new_rating = (rating + 1);
                fetch('http://localhost:81/updateRating', {
                    method: 'POST', body: `postID=${id}&rating=${(new_rating)}`,
                    headers: { 'Content-type': 'application/x-www-form-urlencoded' }})}}></img>
</>
);
}