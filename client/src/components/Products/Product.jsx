import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProducts } from '../../Redux/Actions/productAction'
import Loader from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import Slider from '@mui/material/Slider';
import { Pagination, Rating, Typography } from '@mui/material'
import ViewListIcon from '@mui/icons-material/ViewList';
import Metadata from '../Metadata'
import { toast } from 'react-toastify'
import "./Product.css"

const categories = ["Men clothing", "Phone", "Women clothing", "Jewellery", "Footwear"]

const Product = () => {

    const dispatch = useDispatch();
    const { keyword } = useParams();
    const [price, setPrice] = useState([0, 150000])
    const [rating, setRating] = useState(0)
    const [category, setCategory] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const { products, loading, ResultsPerPage, filteredProductsCount, error } = useSelector(state => state.allProducts)
    const priceHandler = (e, newprice) => {
        setPrice(newprice)
    }
    const setCurrentPageNo = (e, newpage) => {
        setCurrentPage(newpage)
    }
    const handleCheck = (e, cat) => {
        if (e.target.checked) {
            setCategory([...category, cat])
        }
        else {
            let newcategory = [...category]
            newcategory = newcategory.filter((element) => element !== cat)
            setCategory(newcategory)
        }
        setCurrentPage(1)
    }

    const toggleMenu = (e) => {
        const menu = document.getElementById("toggle")
        if (menu.classList.contains("hide")) {
            menu.classList.remove("hide")
        } else {
            menu.classList.add("hide")
        }
    }

    const numberOfPages = Math.ceil(filteredProductsCount / ResultsPerPage)

    useEffect(() => {
        if (error) {
            toast.error(`${error}`)
            dispatch(clearErrors())
        }
        dispatch(getProducts(keyword, price, rating, currentPage, category))
    }, [dispatch, keyword, price, rating, currentPage, category, error])
    return (
        <>
            <Metadata title={"Shop Buddy | Products"} />
            {
                <>
                    <div className="d-flex main-container">
                        <div className="left-container">
                            <div className='filter'>
                                <h3 className='text-center'>Filters</h3>
                                <ViewListIcon onClick={toggleMenu} className='filter-toggle' />
                            </div>
                            <div className='pt-2 left hide' id='toggle'>
                                <Typography className='pt-1 fw-bold'>Price</Typography>
                                <Slider
                                    size='small'
                                    className='pt-3'
                                    aria-labelledby='range-slider'
                                    value={price}
                                    onChange={priceHandler}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={15000}
                                    step={1000}
                                />

                                <Typography className='my-3 fw-bold'>Categories</Typography>
                                {categories.map((Category, index) => {
                                    return (<div key={index}>
                                        <input type="checkbox" name={Category} onClick={(e) => handleCheck(e, Category)} />
                                        <label className='px-1 small' htmlFor={Category}>{Category}</label>
                                        <br />
                                    </div>)
                                })}

                                <Typography className='my-3 fw-bold'>Rating</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        newValue == null ? setRating(0) : setRating(newValue)
                                    }}
                                    size="large"
                                />
                            </div>
                        </div>
                        <div className="px-lg-2 px-md-3 px-sm-4 width-100">
                            <Typography variant='h2' className='text-center border-bottom my-4'>Our Products</Typography>
                            {loading
                                ?
                                <Loader />
                                : <>
                                    <div className='width-100'>
                                        <div className="row width-100 m-auto ">
                                            {
                                                products && products.length > 0 ?
                                                    products.map((product, index) => {
                                                        return <div className="col-md-4 col-lg-3 col-sm-6 card-container" key={index}>
                                                            <ProductCard product={product} />
                                                        </div>
                                                    })
                                                    : <>
                                                        <div className="container d-flex align-items-center justify-content-center" style={{ height: "90vh" }}>
                                                            <h2 className='opacity-50 fs-6'>No Producs Found!</h2>
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    {products && products.length > 0 &&
                        <div className='d-flex justify-content-center my-4'>
                            <Pagination count={numberOfPages || 1} onChange={setCurrentPageNo} page={currentPage} size="large" color="primary" />
                        </div>}
                </>
            }
        </>
    )
}

export default Product