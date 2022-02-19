import { Button, Container, FormControl, Input, InputLabel, MenuItem, Select, TextareaAutosize, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Metadata from '../../Metadata';
import SideBar from '../SideBar';
import "./Products.css"
import { Box } from '@mui/system';
import Name from '@mui/icons-material/DriveFileRenameOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import create from "../../../images/Create.png"
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails, updateProductAdmin } from '../../../Redux/Actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../../Redux/Constants/productConstants';
import { toast } from 'react-toastify';
import Image from '@mui/icons-material/Image';
import Loader from "../../Loader/Loader"
import { useNavigate, useParams } from 'react-router-dom';



const categories = ["Men clothing", "Phone", "Women clothing", "Jewellery", "Footwear"]

const EditProduct = () => {

    const dispatch = useDispatch()
    const { product, loading, error } = useSelector(state => state.singleProductDetails)
    const { isUpdated, error: UpdateError, loading: updateLoading } = useSelector(state => state.product)
    const Navigate = useNavigate()

    const { id } = useParams()


    const [state, setState] = useState({
        name: "",
        price: "",
        desc: "",
        stock: "",
        category: ""
    });
    const [imagesPreview, setImagesPreview] = useState([])
    const [images, setImages] = useState([])
    const [oldImages, setoldImages] = useState([])

    const productId = product && product._id;


    const { name, price, desc, stock, category } = state;
    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        if (name === "productimg") {
            setImagesPreview([])
            setImages([])
            setoldImages([])
            const files = Array.from(e.target.files)
            files.forEach(file => {
                const reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setImagesPreview((old) => [...old, reader.result])
                        setImages((old) => [...old, reader.result])
                    }
                }
            })
        } else {
            setState({ ...state, [name]: value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProductAdmin(id, { ...state, images }))
    }

    useEffect(() => {

        if (productId !== id) {
            dispatch(getProductDetails(id))
        } else {
            setState(old => ({
                ...old,
                name: product.name,
                price: product.price,
                desc: product.desc,
                stock: product.stock,
                category: product.category
            }))
            setoldImages(product.images)
        }
        if (UpdateError) {
            toast.error(UpdateError);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            toast.success("Product updated successfully");
            Navigate("/admin/dashboard");
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
        if (error) {
            Navigate(-1)
            dispatch(clearErrors())
        }

        // eslint-disable-next-line
    }, [error, dispatch, id, isUpdated, UpdateError, Navigate, productId]);


    return <>
        <Metadata title="Shop Buddy | Admin - Edit Product" />
        <div className="admin_container">
            <SideBar />
            {
                loading ? <Loader /> :
                    <>
                        <div className="createProductContainer">
                            <Typography variant='h2' className='text-center border-bottom mb-5'>Edit Product</Typography>
                            <Container className='innerContainer'>
                                <div className='row d-flex'>
                                    <div className='col-lg-6 d-flex align-items-center justify-content-center create-img'>
                                        <img src={create} alt="Create product" />
                                    </div>
                                    <form className='d-flex flex-column align-items-center justify-content-center gap-1 col-lg-6 createProductForm' onSubmit={handleSubmit}>
                                        <h2 className='text-uppercase text-center my-3'>Product Details</h2>
                                        <FormControl margin='dense' color='info'>
                                            <Box component="div" className='align-items-center d-flex' >
                                                <Box component="span" className="position-absolute"><Name /></Box>
                                                <InputLabel required className='mx-3' htmlFor="name">Product Name</InputLabel>
                                                <Input id="name" name='name' className="px-4" type='text' value={name} onChange={handleChange} required fullWidth />
                                            </Box>
                                        </FormControl>
                                        <FormControl margin='dense' color='info'>
                                            <Box component="div" className='d-flex' >
                                                <Box component="span" className="position-absolute  mt-2"><DescriptionIcon /></Box>
                                                <TextareaAutosize maxRows={5} id="desc" name='desc' className="text-area width-100" type='text' value={desc} onChange={handleChange} required placeholder='Product Description' />
                                            </Box>
                                        </FormControl>
                                        <FormControl margin='dense' color='info'>
                                            <Box component="div" className='align-items-center d-flex' >
                                                <Box component="span" className="position-absolute "><PaymentIcon /></Box>
                                                <InputLabel required className="mx-3" htmlFor="price">Product Price</InputLabel>
                                                <Input id="price" name='price' className="px-4" type='number' value={price} onChange={handleChange} required fullWidth />
                                            </Box>
                                        </FormControl>
                                        <FormControl margin='dense' color='info'>
                                            <Box component="div" className='align-items-center d-flex' >
                                                <Box component="span" className="position-absolute"><Inventory2Icon /></Box>
                                                <InputLabel required className="mx-3" htmlFor="stock">Product Stock</InputLabel>
                                                <Input id="stock" name='stock' className="px-4" type='number' value={stock} onChange={handleChange} required fullWidth />
                                            </Box>
                                        </FormControl>
                                        <FormControl margin='dense' color='info' className='w-50 select'>
                                            <InputLabel htmlFor='category'>Product Category</InputLabel>
                                            <Select
                                                value={category}
                                                label="Product Category"
                                                onChange={handleChange}
                                                name="category"
                                                required
                                            >
                                                {
                                                    categories.map((cat, index) => {
                                                        return <MenuItem key={index} value={cat} >{cat}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                        <FormControl margin='dense' color='info'>
                                            <Box component="div" className='file-upload'>
                                                <Box component="span"><Image /></Box>
                                                <span className='opacity-75'>Upload Images</span>
                                                <input type="file" onChange={handleChange} name="productimg" id="productimg" multiple accept='img/*' className='upload' />
                                            </Box>
                                        </FormControl>
                                        <div className='imagesPreviewdiv'>
                                            {
                                                oldImages && oldImages.map((image, index) => {
                                                    return <img src={image && image.url} key={index} className='imagesPreview m-2' alt="" />
                                                })
                                            }
                                        </div>
                                        <div className='imagesPreviewdiv'>
                                            {
                                                imagesPreview && imagesPreview.map((image, index) => {
                                                    return <img src={image && image} key={index} className='imagesPreview m-2' alt="" />
                                                })
                                            }
                                        </div>
                                        <Button type='submit' variant='contained' color='success' className='mt-3' disabled={loading || updateLoading ? true : false}>Update Product</Button>
                                    </form>
                                </div>
                            </Container>
                        </div>
                    </>
            }
        </div>
    </>;
};

export default EditProduct;
