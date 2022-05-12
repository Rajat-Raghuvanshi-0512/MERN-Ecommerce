import React from 'react'
import { Link } from 'react-router-dom'
import "./Product.css"
import { Rating } from '@mui/material';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} className='card m-auto my-3'>
            <div className='img_cont'>
                <img src={product.images.length > 0 && product.images[0].url} className="card-img-top p-3" alt="..." />
            </div>
            <div className="card-body px-2">
                <h6 className="card-title fw-bold px-3 text-center">{product.name.length < 30 ? product.name : `${product.name.slice(0, 30)} ...`}</h6>
                <div className="card-text fw-lighter opacity-75 px-4">{product.desc}</div>
                <div className='my-2 d-flex justify-content-center align-items-center'>
                    <Rating
                        value={product.ratings}
                        precision={0.5}
                        readOnly
                        size='large'
                        className='rating-component'
                    />
                </div>
                <div className="text-danger price text-center">{`₹${product.price}`}</div>
            </div>
        </Link>
    )
}

export default ProductCard
