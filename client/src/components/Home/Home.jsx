import React, { useEffect } from 'react'
import Metadata from '../Metadata'
import ProductCard from '../Products/ProductCard'
import "./Home.css"
import { getProducts, clearErrors } from "../../Redux/Actions/productAction"
import { useDispatch, useSelector } from "react-redux"
import Loader from '../Loader/Loader'
import shop from "../../images/shop.png"
import { toast } from 'react-toastify'
import { Typography } from '@mui/material'


const Home = () => {
    const { products, loading, error } = useSelector(state => state.allProducts)
    const dispatch = useDispatch()

    let featuredProducts = products && products.sort((first, second) => { return second.ratings - first.ratings })
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProducts())
    }, [dispatch, error])
    return (
        <>
            <Metadata title="Shop Buddy | India's most famous E-commerce website" />
            {loading
                ? <Loader />
                : <div className='home-component'>
                    <div className="containers">
                        <div className="row">
                            <div className="main text-center col-lg-8 col-md-7 col-sm-6 d-flex align-items-center justify-content-start flex-column pt-5">
                                <h1 className='main-heading my-3 text-uppercase fw-bold'>A <span className='text-danger'>new</span> online shop experience</h1>
                                <h3 className='heading my-2'>We know what you need!</h3>
                                <a className="btn mt-4 px-3 scroll" href="#products" >Scroll</a>
                            </div>
                            <div className='col-lg-4 col-md-5 col-sm-6 pt-5 homeimg-container'>
                                <img src={shop} alt="none" className='homeimg' />
                            </div>
                        </div>
                    </div>
                    <Typography variant='h2' className='text-center border-bottom my-4' id="products">Featured Products</Typography>
                    {/* <div className='mx-lg-5 mx-md-4 mx-sm-3 mx-2'> */}
                    <div className="row d-flex justify-content-center m-lg-5 m-sm-3 overflow-hidden">
                        {
                            featuredProducts && featuredProducts.map((product, index) => {
                                if (index < 4) {
                                    return (
                                        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 card-container" key={index}>
                                            <ProductCard product={product} />
                                        </div>
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                    </div>
                    {/* </div> */}
                </div>}
        </>
    )
}

export default Home
