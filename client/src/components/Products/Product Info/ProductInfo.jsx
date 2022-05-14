import { useEffect, useState } from 'react'
import "./ProductInfo.css"
import { useDispatch, useSelector } from 'react-redux'
import { addReview, clearErrors, getProductDetails } from '../../../Redux/Actions/productAction'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../../Loader/Loader'
import ReviewCard from '../../Review/ReviewCard'
import Metadata from '../../Metadata'
import { addItemToCart } from '../../../Redux/Actions/cartAction'
import { toast } from 'react-toastify'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, Rating, TextareaAutosize } from '@mui/material'
import { REVIEW_RESET } from '../../../Redux/Constants/productConstants'

const ProductInfo = () => {

    const [qty, setqty] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const Navigate = useNavigate()

    const { id } = useParams();
    let desc;
    const dispatch = useDispatch()
    const { loading, product, error } = useSelector(state => state.singleProductDetails)
    const { error: ReviewError, success } = useSelector(state => state.review)



    const increment = () => {
        if (qty < product.stock) {
            const value = qty + 1;
            setqty(value)
        }
    }
    const decrement = () => {
        if (qty === 1) return
        const value = qty - 1;
        setqty(value)
    }

    const addToCart = () => {
        dispatch(addItemToCart(id, qty))
        toast.success("Item added to cart")
    }
    const handleReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }
    const submitReview = () => {
        dispatch(addReview(id, rating, comment))
        setOpen(false)
    }

    useEffect(() => {
        dispatch(getProductDetails(id))
        if (error) {
            dispatch(clearErrors())
            Navigate(-1)
        }
        if (ReviewError) {
            toast.error(ReviewError)
            dispatch(clearErrors())
        } if (success) {
            toast.success("Review submitted")
            setRating(0)
            setComment("")
            dispatch({ type: REVIEW_RESET })
        }
    }, [dispatch, id, error, desc, ReviewError, success, Navigate])

    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                        <Metadata title={`Shop Buddy | ${product && product.name}`} />
                        <div className="mx-lg-5 mx-md-5 mx-sm-2 mx-2">
                            <div className="row mx-auto">
                                <div className="col-md-6 pt-5  carousel d-flex justify-content-center">
                                    <div className="carousel slide carousel-dark" data-bs-ride="carousel">
                                        <div className="carousel-inner ">
                                            {
                                                product && product.images && product.images.length > 0 && product.images.map((image, index) => {
                                                    if (index === 0) {
                                                        return <div className="carousel-item active" key={index}>
                                                            <img src={image && image.url} className="carousel-img " alt="..." />
                                                        </div>;
                                                    }
                                                    return <div className="carousel-item" key={index}>
                                                        <img src={image && image.url} className="carousel-img" alt="..." />
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-6 py-3 px-lg-5 px-md-4 px-sm-5 p-5">
                                    <h3 className='pt-5'>{product && product.name}</h3>
                                    <div className='text-secondary border-bottom pb-3 id_font'>Product id: {product && product._id}</div>
                                    <div className='d-flex align-items-end width-100 flex-wrap'>
                                        <Rating value={product && product.ratings} readOnly className="border-bottom py-3 info-rating" precision={0.5} size='large' />
                                        <div className="rating-count opacity-50">({product && product.totalReviews ? `Reviews: ${product.totalReviews}` : "No reviews!"})</div>
                                    </div>
                                    <div className="myprice pt-3">{`₹${product && product.price}`}</div>
                                    <div className="fs-6 px-3 pb-3 fw-bold text-danger">
                                        {product && product.stock < 1 && "Out of stock!"}
                                    </div>
                                    <div className="quantity d-flex">
                                        <div>
                                            <button className="btn btn-dark" onClick={decrement}>-</button>
                                            <input type="number" value={qty} readOnly={true} />
                                            <button className="btn btn-dark" onClick={increment}>+</button>
                                        </div>
                                        <div className='addToCart'>
                                            <button className="button" disabled={product && product.stock < 1 ? true : false} onClick={addToCart}>Add to Cart</button>
                                        </div>
                                    </div>
                                    <div className=" py-3">
                                        Description: <span className='text-secondary opacity-75 fw-light'>{product && product.desc}</span>
                                    </div>
                                    <div className=" d-flex justify-content-center align-items-center py-3">
                                        <button className="button review-btn" onClick={handleReviewToggle}>Add  a Review</button>
                                    </div>
                                </div>
                            </div>
                            <Dialog
                                aria-label="simple-dialogue-title"
                                open={open}
                                onClose={handleReviewToggle} fullWidth >
                                <DialogTitle className="fs-2">Submit Review</DialogTitle>
                                <DialogContent>
                                    <div className='d-flex flex-column'>
                                        <Rating
                                            onClick={(e) => setRating(Number(e.target.value))}
                                            className="mb-4 info-rating"
                                            size='large'
                                            precision={0.5}
                                            value={rating}
                                        />
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            onChange={(e) => setComment(e.target.value)}
                                            minRows={4}
                                            placeholder="Add a comment..."
                                            className='p-2 w-100'
                                            value={comment}
                                        />
                                        <FormHelperText>(Maximum 100 characters)</FormHelperText>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button variant='outlined' onClick={handleReviewToggle} color="error">Cancel</Button>
                                    <Button variant="contained" onClick={submitReview} color='primary'>Submit</Button>
                                </DialogActions>

                            </Dialog>
                            <h1 className="text-center border-bottom border-top py-2">Reviews</h1>
                            <div className="d-flex overflow-auto my-4">
                                {
                                    product && product.reviews && product.reviews.length !== 0 ?
                                        product.reviews.sort((first, second) => {
                                            return second.rating - first.rating
                                        }).map((review, index) => {
                                            desc = review.comment.length < 100 ? review.comment : `${review.comment.slice(0, 100)}...`
                                            return <div className="review-card" key={index}>
                                                <ReviewCard review={review} desc={desc} />
                                            </div>
                                        }) :
                                        <div className='text-center w-100 py-5 opacity-50'>
                                            No Reviews yet!
                                        </div>
                                }
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default ProductInfo
