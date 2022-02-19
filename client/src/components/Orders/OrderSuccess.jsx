import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const Navigate = useNavigate()
    return <>
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: "90vh" }}>
            <CheckCircleIcon color='success' style={{ fontSize: "100px" }} />
            <p className='fw-bold fs-2 my-4'>Your order has been placed successfully.</p>
            <Button variant="contained" color='success' onClick={() => Navigate("/orders")}>View Orders</Button>
        </div>
    </>;
};

export default OrderSuccess;