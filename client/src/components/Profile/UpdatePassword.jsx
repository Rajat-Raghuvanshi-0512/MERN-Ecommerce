import { ThemeProvider } from '@mui/material/styles';
import { Button, Container, FormControl, Input, InputLabel, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { mainContainerCss, headingCss, addMarginX, addMarginY, firstContainer, theme, lastContainer } from "./muiCss"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { clearErrors, loadUser, updatePassword } from '../../Redux/Actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import BackupIcon from '@mui/icons-material/Backup';
import PasswordIcon from '@mui/icons-material/Password';
import LockIcon from '@mui/icons-material/Lock';
import { UPDATE_PASSWORD_RESET } from '../../Redux/Constants/userConstants';

const UpdatePassword = () => {

    const [data, setData] = useState({
        oldPass: "",
        newPass: "",
        confirmPass: "",
    })
    const dispatch = useDispatch();
    const Navigate = useNavigate()

    const { isUpdated, error, loading } = useSelector(state => state.profile)

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData({ ...data, [name]: value })
    }
    const updatePass = (e) => {
        e.preventDefault()
        const { newPass, confirmPass } = data;
        if (newPass !== confirmPass) {
            return toast.info("Password doesnot match.")
        }
        dispatch(updatePassword(data))
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            toast.success("Password updated successfully")
            dispatch(loadUser())
            Navigate("/profile")
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [error, dispatch, Navigate, isUpdated]);

    return <>
        {
            loading ?
                <Loader /> :
                <form onSubmit={updatePass}>
                    <Container sx={mainContainerCss}  >
                        <Container >
                            <img src={require("../../images/update.png")} alt="register" style={{ width: "100%", height: '100%' }} />
                        </Container>
                        <Container sx={firstContainer}>
                            <Typography variant='h4' sx={headingCss} fontFamily={"Monospance"}>Update Password <BackupIcon fontSize='large' /></Typography>
                            <FormControl margin='dense' color='info'>
                                <Box component="div">
                                    <Box component="span"><PasswordIcon /></Box>
                                    <InputLabel htmlFor="oldpassword" sx={addMarginX}>Old Password</InputLabel>
                                    <Input onChange={handleInput} value={data.oldPass} id="oldpassword" name='oldPass' sx={addMarginX} type='text' required />
                                </Box>
                            </FormControl>
                            <FormControl margin='dense' color='info'>
                                <Box component="div">
                                    <Box component="span"><LockIcon /></Box>
                                    <InputLabel htmlFor="newpassword" sx={addMarginX}>New Password</InputLabel>
                                    <Input onChange={handleInput} value={data.newPass} id="newpassword" type='password' name='newPass' aria-describedby="my-helper-text" sx={addMarginX} required />
                                </Box>
                            </FormControl>
                            <FormControl margin='dense' color='info'>
                                <Box component="div">
                                    <Box component="span"><LockIcon /></Box>
                                    <InputLabel htmlFor="cpassword" sx={addMarginX}>Confirm Password</InputLabel>
                                    <Input onChange={handleInput} value={data.confirmPass} id="cpassword" type='password' name='confirmPass' aria-describedby="my-helper-text" sx={addMarginX} required />
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
    </>;
};

export default UpdatePassword;
