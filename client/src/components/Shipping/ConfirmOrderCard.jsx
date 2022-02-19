import React from 'react';
import "./ConfirmCard.css"

const ConfirmOrderCard = ({ item }) => {
    return <>
        <div className="col-md-2 d-flex align-items-center justify-content-center">
            <img src={item.image} alt="" className='confirmcardimage my-3' />
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div>{item.name}</div>
        </div>
        <div className="col-md-3 d-flex align-items-center justify-content-center">
            <div>{item.quantity}</div>
        </div>
        <div className="col-md-3 d-flex align-items-center justify-content-center">
            <div>{item.price}</div>
        </div>
    </>;
};

export default ConfirmOrderCard;
