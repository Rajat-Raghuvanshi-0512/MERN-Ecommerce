import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductsByCategory } from '../../../Redux/Actions/productAction'
import ProductCard from '../ProductCard'

const SimilarProducts = ({ category }) => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.similarProducts)
    const { id } = useParams()

    useEffect(() => {
        dispatch(getProductsByCategory(category))
    }, [category, dispatch])

    if (products && products.length <= 1) {
        return null
    }

    return (
        <>
            <h1 className="text-center border-bottom border-top py-2">Similar Products</h1>
            <div className='row width-100 m-auto'>
                {
                    products?.length > 0 && products.map((product) => {
                        if (product._id !== id) {
                            return <div className="col-md-4 col-lg-3 col-sm-6 card-container" key={product._id}>
                                <ProductCard product={product} />
                            </div>
                        } else {
                            return null
                        }
                    })
                }
            </div>
        </>
    )
}

export default SimilarProducts