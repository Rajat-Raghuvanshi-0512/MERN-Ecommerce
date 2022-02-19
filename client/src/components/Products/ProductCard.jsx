import React from 'react'
import { Link } from 'react-router-dom'
import "./Product.css"
import { Rating } from '@mui/material';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} className='card m-auto my-3' style={{ maxWidth: '350px' }}>
            <div style={{ height: "330px" }} className="d-flex align-items-start justify-content-center m-auto">
                <img src={product.images.length > 0 && product.images[0].url} className="card-img-top" alt="..." />
            </div>
            <div className="card-body px-2">
                <h5 className="card-title">{product.name.length < 30 ? product.name : `${product.name.slice(0, 30)} ...`}</h5>
                <div className="card-text fw-lighter opacity-75 px-1" style={{ textAlign: "justify" }}>{product.desc.length < 60 ? product.desc : `${product.desc.slice(0, 60)} ...`}</div>
                <div className='my-3 d-flex justify-content-center align-items-center'>
                    <Rating
                        value={product.ratings}
                        precision={0.5}
                        size='large'
                        readOnly
                        className="rating-component"
                    />
                </div>
                <div className="text-danger price text-center">{`₹${product.price}`}</div>
            </div>
        </Link>
    )
}

export default ProductCard
