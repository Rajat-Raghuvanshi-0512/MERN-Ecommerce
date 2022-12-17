import { Rating } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import avatar from "../../images/avatar.jpg"
import { getUserPhoto } from '../../Redux/Actions/userAction'
import "./ReviewCard.css"
const ReviewCard = ({ review, desc }) => {

    const dispatch =useDispatch()
    const {photo} = useSelector(state=>state.user)

    useEffect(()=>{
        dispatch(getUserPhoto(review.userId))
    },[dispatch,review.userId])
    
    return (
        <>
            <div className="review-component">
                <div className='review_cont'>
                    <img src={photo ? photo : avatar} className="review-img" alt="..." />
                </div>
                <div className='p-2'>
                    <h4 className="text-center review-name">{review.name}</h4>
                    <div className='d-flex justify-content-center '>
                        <Rating value={review.rating} precision={0.5} className="review-rating-component" readOnly />
                    </div>
                    {desc && <div className="review-comment my-lg-4 my-md-3 my-sm-3" ><span className='fw-bold fs-6'> Comment:</span> <span className='text-secondary fs-6'>{desc}</span></div>}
                </div>
            </div>
        </>
    )
}

export default ReviewCard
