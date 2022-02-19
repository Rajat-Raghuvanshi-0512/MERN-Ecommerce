import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, getUserInfo, updateUser } from '../../../Redux/Actions/userAction';
import { UPDATE_USER_RESET } from '../../../Redux/Constants/userConstants';
import Loader from "../../Loader/Loader"
import Metadata from '../../Metadata';
import SideBar from '../SideBar';
import create from "../../../images/Create.png"
import { Box } from '@mui/system';

const UpdateUser = () => {


    const dispatch = useDispatch()
    const { user, error, loading } = useSelector(state => state.user)
    const { isUpdated, error: UpdateError } = useSelector(state => state.profile)
    const { id } = useParams()
    const Navigate = useNavigate()
    const [role, setRole] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(id, role))
    }


    useEffect(() => {
        if (error) {
            Navigate(-1, { replace: true })
            dispatch(clearErrors())
        }
        if (UpdateError) {
            toast.error(UpdateError)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            toast.success("User Updated Successfully")
            Navigate("/admin/users")
            dispatch({ type: UPDATE_USER_RESET })
        }
        dispatch(getUserInfo(id))
    }, [dispatch, id, error, UpdateError, isUpdated, Navigate]);

    return <>
        <Metadata title="Shop Buddy | Admin - User Details" />
        <div className="admin_container">
            <SideBar />
            {
                loading ? <Loader /> :
                    <>
                        <div className="createProductContainer">
                            <Container className='innerContainer'>
                                <div className='row d-flex'>
                                    <div className='col-lg-6 col-md-6 col-sm-12 p-4 create-img'>
                                        <img src={create} alt="Create product" />
                                    </div>
                                    <form className='d-flex flex-column align-items-center justify-content-center gap-1 col-lg-6 col-md-6 col-sm-12 createProductForm' onSubmit={handleSubmit}>
                                        <h2 className='text-uppercase text-center my-3'>User Details</h2>
                                        <FormControl margin='dense' color='info' className='my-2'>
                                            <Box component="div" className='align-items-end d-flex' >
                                                <TextField id="outlined-basic" label="User Name" variant="outlined" value={user && user.name} disabled />
                                            </Box>
                                        </FormControl>
                                        <FormControl margin='dense' color='info' className='my-2'>
                                            <Box component="div" className='align-items-end d-flex' >
                                                <TextField id="outlined-basic" label="User Email" variant="outlined" value={user && user.email} disabled />
                                            </Box>
                                        </FormControl>
                                        <FormControl margin='dense' color='info' className='w-50 select'>
                                            <InputLabel htmlFor='category'>Assign Role</InputLabel>
                                            <Select
                                                value={role}
                                                label="Product Category"
                                                name="category"
                                                onChange={(e) => setRole(e.target.value)}
                                                required
                                            >
                                                <MenuItem value="user" >User</MenuItem>
                                                <MenuItem value="admin" >Admin</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Button type='submit' variant='contained' color='success' className='mt-3' disabled={role === "" ? true : false}>Update</Button>
                                    </form>
                                </div>
                            </Container>
                        </div>
                    </>
            }
        </div>
    </>;
};

export default UpdateUser;
