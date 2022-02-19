import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_REVIEW_RESET } from '../../../Redux/Constants/productConstants'
import Metadata from '../../Metadata'
import SideBar from '../SideBar'
import "./ReviewList.css"
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import MoodIcon from '@mui/icons-material/Mood';
import { clearErrors, deleteReview, getReviews } from '../../../Redux/Actions/productAction'
import { toast } from 'react-toastify'
import Loader from '../../Loader/Loader'
import { DataGrid } from '@mui/x-data-grid'

const ReviewsList = () => {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [productId, setproductId] = useState("");
    const [clicked, setClicked] = useState(false);

    const { reviews, error, loading, isDeleted } = useSelector(state => state.review)

    const columns = [
        {
            field: "id",
            headerName: "Review Id",
            minWidth: 150,
            flex: 1,
            cellClassName: "fw-bold"
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 0.3,
            cellClassName: "text-secondary"
        },
        {
            field: "rating",
            headerName: "Rating",
            minWidth: 70,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.rating > 2 ? "text-success" : "text-danger"
            }

        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 200,
            flex: 0.3
        },
        {
            field: "link",
            type: "number",
            headerName: "Actions",
            minWidth: 50,
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <div className='icon-delete mx-2 cursor' onClick={() => handleClickOpen(params.getValue(params.id, "id"))} >
                            <DeleteIcon />
                        </div>
                    </>
                )
            }
        }
    ]
    const rows = []

    reviews && reviews.forEach((review => {

        rows.push({
            id: review.userId,
            rating: review.rating,
            name: review.name,
            comment: review.comment,
        })
    }))

    const handleClickOpen = (id) => {
        setOpen(true);
        setId(id)
    }

    const handleClick = (id) => {
        dispatch(getReviews(productId))
        setClicked(true)
    }

    const handleClose = () => {
        setOpen(false);
        setId("")
    }

    const deleteHandler = () => {
        dispatch(deleteReview(id, productId));
        setOpen(false)
    }
    const handleProductId = (e) => {
        setproductId(e.target.value)
        setClicked(false)
    }


    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            toast.success("Review Deleted Successfully")
            dispatch({ type: DELETE_REVIEW_RESET })
        }
    }, [error, dispatch, isDeleted])

    return (
        <>
            <Metadata title="Shop Buddy | Admin - Dashboard" />
            <div className="admin_container">
                <SideBar />
                <div className="reviewlistContainer">
                    <Typography variant='h2' className='text-center border-bottom mb-5'>Reviews</Typography>
                    <div className='align-items-center d-flex m-lg-5 m-md-5 m-sm-4 mb-5 search_main' >
                        <span className="position-absolute"><MoodIcon /></span>
                        <input name='id' className="px-5 search_input w-100" type='search' value={productId} onChange={handleProductId} required placeholder='Product Id' />
                        <button className='search_button' onClick={handleClick}>Search</button>
                    </div>
                    {
                        loading ? <Loader /> :
                            reviews && reviews.length > 0 ? <div className='productList'>
                                <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        Delete Review
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure you want to delete this review?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color='error'>Cancel</Button>
                                        <Button onClick={deleteHandler} autoFocus>
                                            Yes
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                                : productId.length === 24 && clicked &&
                                <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: "50vh" }}>
                                    <CancelIcon className='text-danger' style={{ fontSize: "100px" }} />
                                    <Typography className='fw-bold fs-2 mb-4'>No Reviews Found! </Typography>
                                </div>
                    }

                </div>
            </div>
        </>
    )
}

export default ReviewsList