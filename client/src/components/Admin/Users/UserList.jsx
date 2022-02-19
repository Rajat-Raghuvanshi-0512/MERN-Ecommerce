import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "./UserList.css"
import CancelIcon from '@mui/icons-material/Cancel';
import { clearErrors } from '../../../Redux/Actions/orderAction';
import Loader from '../../Loader/Loader';
import Metadata from '../../Metadata';
import SideBar from '../SideBar';
import { deleteUser, getAllUsers } from '../../../Redux/Actions/userAction';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { DELETE_USER_RESET } from '../../../Redux/Constants/userConstants';


const UserList = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const { users, error, loading } = useSelector(state => state.allUsers)
    const { isDeleted, error: deleteError } = useSelector(state => state.profile)


    const columns = [
        {
            field: "id",
            headerName: "User ID",
            minWidth: 150,
            flex: 1
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 150,
            sortable: false,
            flex: 0.5

        },
        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 100,
            sortable: false,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin" ? "text-danger fw-bold text-uppercase" : "text-secondary text-capitalize"
            }
        },
        {
            field: "link",
            type: "number",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/user/edit/${params.getValue(params.id, "id")}`} className='icon-edit mx-2 cursor' ><Edit /></Link>
                        <div className='icon-delete mx-2 cursor' onClick={() => handleClickOpen(params.getValue(params.id, "id"))} ><Delete /></div>
                    </>
                )
            }
        }
    ]
    const rows = []

    users && users.forEach((user => {
        rows.push({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    }))


    const handleClickOpen = (id) => {
        setOpen(true);
        setId(id)
    }

    const handleClose = () => {
        setOpen(false);
        setId("")
    }

    const deleteHandler = () => {
        dispatch(deleteUser(id))
        setOpen(false)
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            toast.error(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            toast.success("User deleted successfully")
            dispatch({ type: DELETE_USER_RESET })
        }
        dispatch(getAllUsers())
    }, [error, dispatch, deleteError, isDeleted])
    return <>
        <Metadata title="Shop Buddy | Admin - Users" />
        <div className="admin_container">
            <SideBar />
            <div className='adminUsersContainer'>
                <Typography variant='h2' className='text-center border-bottom mb-5' >All Users</Typography>
                {
                    loading ? <Loader /> :
                        (
                            users.length > 0 ? <div className="allUsers">
                                <DataGrid rows={rows} columns={columns} pageSize={5} disableSelectionOnClick autoHeight />
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        Delete User
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure you want to delete this user?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color='error'>Cancel</Button>
                                        <Button onClick={deleteHandler} autoFocus>
                                            Yes
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div> :
                                <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: "50vh" }}>
                                    <CancelIcon className='text-danger' style={{ fontSize: "100px" }} />
                                    <Typography className='fw-bold fs-2 mb-4'>No Users yet! </Typography>
                                </div>
                        )
                }
            </div>
        </div>
    </>;
};

export default UserList;
