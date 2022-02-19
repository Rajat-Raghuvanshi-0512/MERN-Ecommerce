import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { Button, Container, FormControl, Input, InputLabel, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { mainContainerCss, headingCss, addMarginX, addMarginY, firstContainer, theme, lastContainer } from "./muiCss"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { clearErrors, loadUser, updateProfile } from '../../Redux/Actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import BackupIcon from '@mui/icons-material/Backup';
import ImageIcon from '@mui/icons-material/Image';
import avatar from "../../images/avatar.jpg"
import { UPDATE_PROFILE_RESET } from '../../Redux/Constants/userConstants';

const UpdateProfile = () => {
    const { user } = useSelector(state => state.userInfo)
    const { isUpdated, error, loading } = useSelector(state => state.profile)

    const dispatch = useDispatch()

    const [AvatarPreview, setAvatarPreview] = useState(avatar)
    const [Avatar, setAvatar] = useState("")

    const Navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        email: ""
    })

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "myprofile") {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
        } else {
            setData({ ...user, [name]: value })
        }
    }

    const updateUser = (e) => {
        e.preventDefault()
        const { name, email } = data;
        dispatch(updateProfile(name, email, Avatar))
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (user) {
            setData({ name: user.name, email: user.email })
            setAvatarPreview(user.profilePhoto.url)
        }
        if (isUpdated) {
            toast.success("Profile updated successfully")
            dispatch(loadUser())
            Navigate("/profile")
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [error, Navigate, dispatch, isUpdated, user])
    return (
        <>
            {
                loading ?
                    <Loader /> :
                    <form method='post' onSubmit={updateUser} encType="multipart/form-data">
                        <Container sx={mainContainerCss}  >
                            <Container >
                                <img src={require("../../images/update.png")} alt="register" style={{ width: "100%", height: '100%' }} />
                            </Container>
                            <Container sx={firstContainer}>
                                <Typography variant='h4' sx={headingCss} fontFamily={"Monospance"}>Update Profile <BackupIcon fontSize='large' /></Typography>
                                <FormControl margin='dense' color='info'>
                                    <Box component="div" sx={addMarginY}>
                                        <Box component="span"><i className="fas fa-user" ></i></Box>

                                        <InputLabel htmlFor="name" sx={addMarginX}>Full Name</InputLabel>
                                        <Input onChange={handleInput} value={data.name} id="name" name='name' sx={addMarginX} required />
                                    </Box>
                                </FormControl>
                                <FormControl margin='dense' color='info'>
                                    <Box component="div">
                                        <Box component="span"><i className="fas fa-envelope" ></i></Box>
                                        <InputLabel htmlFor="email" sx={addMarginX}>Email address</InputLabel>
                                        <Input onChange={handleInput} value={data.email} id="email" type='email' name='email' aria-describedby="my-helper-text" sx={addMarginX} required />
                                    </Box>
                                </FormControl>
                                <FormControl margin='dense' color='info'>
                                    <Box component="div" className='d-flex image-box'>
                                        <Box component="span"><ImageIcon /></Box>
                                        <div className='photoPreview'>
                                            <img src={AvatarPreview} className='avatarpreview' alt="" />
                                        </div>
                                        <input type="file" onChange={handleInput} name="myprofile" id="myprofile" />
                                    </Box>
                                </FormControl>
                                <Container sx={lastContainer}>
                                    <ThemeProvider theme={theme}  >
                                        <Button variant="contained" color="neutral" sx={addMarginY} type='submit' >Update</Button>
                                    </ThemeProvider>
                                </Container>
                            </Container>
                        </Container>
                    </form>
            }
        </>
    )
}

export default UpdateProfile
