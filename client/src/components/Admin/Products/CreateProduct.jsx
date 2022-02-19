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
import { addProductAdmin, clearErrors } from '../../../Redux/Actions/productAction';
import { CREATE_PRODUCT_RESET } from '../../../Redux/Constants/productConstants';
import { toast } from 'react-toastify';
import Image from '@mui/icons-material/Image';
import Loader from "../../Loader/Loader"
import { useNavigate } from 'react-router-dom';



const categories = ["Men clothing", "Phone", "Women clothing", "Jewellery", "Footwear"]

const CreateProduct = () => {

    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const { error, success, loading } = useSelector(state => state.newProduct)
    const [imagesPreview, setImagesPreview] = useState([])
    const [images, setImages] = useState([])


    const [state, setState] = useState({
        name: "",
        price: "",
        desc: "",
        stock: "",
        category: ""
    });
    const { name, price, desc, stock, category } = state;
    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        if (name === "productimg") {
            setImagesPreview([])
            setImages([])
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
        dispatch(addProductAdmin({ ...state, images }))
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }
        if (success) {
            toast.success("Product added successfully");
            dispatch({ type: CREATE_PRODUCT_RESET })
            Navigate("/admin/dashboard");
        }
    }, [error, success, dispatch, Navigate]);


    return <>
        <Metadata title="Shop Buddy | Admin - Dashboard" />
        <div className="admin_container">
            <SideBar />
            {
                loading ? <Loader /> :
                    <>
                        <div className="createProductContainer">
                            <Typography variant='h2' className='text-center border-bottom mb-5'>Add New Product</Typography>
                            <Container className='innerContainer'>
                                <div className='row d-flex'>
                                    <div className='col-lg-6 col-md-6 col-sm-12 p-4 create-img'>
                                        <img src={create} alt="Create product" />
                                    </div>
                                    <form className='d-flex flex-column align-items-center justify-content-center gap-1 col-lg-6 col-md-6 col-sm-12 createProductForm' onSubmit={handleSubmit}>
                                        <h3 className='text-uppercase text-center my-3'>Product Details</h3>
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
                                                <TextareaAutosize maxRows={5} id="desc" name='desc' className="text-area width-100" type='text' value={desc} onChange={handleChange} required placeholder='Product Description *' />
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
                                                <input type="file" onChange={handleChange} name="productimg" id="productimg" multiple accept='img/*' className='upload' required />
                                            </Box>
                                        </FormControl>
                                        <div className='imagesPreviewdiv'>
                                            {
                                                imagesPreview && imagesPreview.map((image, index) => {
                                                    return <img src={image} key={index} className='imagesPreview m-2' alt="" />
                                                })
                                            }
                                        </div>
                                        <Button type='submit' variant='contained' color='success' className='mt-3' disabled={loading ? true : false}>Add Product</Button>
                                    </form>
                                </div>
                            </Container>
                        </div>
                    </>
            }
        </div>
    </>;
};

export default CreateProduct;
