import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Button, Container, FormControl, Input, InputLabel, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { mainContainerCss, innerContainer, headingCss, addMarginX, addMarginY, theme } from "./ObjectCss"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../Redux/Actions/userAction';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';

const ResetPassword = () => {

    const { token } = useParams()
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, success } = useSelector(state => state.forgotPassword)
    const handleClick = () => {
        dispatch(resetPassword(token, password, cpassword))
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (success === true) {
            toast.success("Password updated successfully")
            navigate("/login")
        }
    }, [error, dispatch, navigate, success])


    return <>
        {
            loading ?
                <Loader /> :
                <form onSubmit={handleClick}>
                    <Container sx={mainContainerCss}  >
                        <Container>
                            <img src={require("../../images/Mylogin.png")} alt="login " style={{ maxWidth: "100%", maxHeight: '100%' }} />
                        </Container>
                        <Container sx={innerContainer}>
                            <Typography variant='h4' sx={headingCss} fontFamily={"Monospance"}>Create a new Password</Typography>
                            <FormControl margin='dense' color='info'>
                                <Box component="div">
                                    <Box component="span"><i className="fas fa-user" ></i></Box>
                                    <InputLabel required={true} htmlFor="password" sx={addMarginX}>New Passsword</InputLabel>
                                    <Input id="password" name='password' type='password' aria-describedby="my-helper-text" sx={addMarginX} value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete='password' />
                                </Box>
                            </FormControl>
                            <FormControl margin='dense' color='info'>
                                <Box component="div">
                                    <Box component="span"><i className="fas fa-user" ></i></Box>
                                    <InputLabel required={true} htmlFor="cpassword" sx={addMarginX}>Confirm Password</InputLabel>
                                    <Input id="cpassword" name='cpassword' type='password' aria-describedby="my-helper-text" sx={addMarginX} value={cpassword} onChange={(e) => setCpassword(e.target.value)} required autoComplete='cpassword' />
                                </Box>
                            </FormControl>
                            <ThemeProvider theme={theme}  >
                                <Button variant="contained" color="neutral" type='submit' sx={addMarginY} >Set Password</Button>
                            </ThemeProvider>
                        </Container>
                    </Container>
                </form>
        }
    </>;
};

export default ResetPassword;
