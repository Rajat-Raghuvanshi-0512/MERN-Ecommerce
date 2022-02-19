import { ThemeProvider } from '@mui/material/styles';
import { Button, Container, FormControl, Input, InputLabel, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { mainContainerCss, innerContainer, headingCss, addMarginX, addMarginY, theme } from "./ObjectCss"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../Redux/Actions/userAction';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';


const ForgetPassword = () => {

    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, message, error } = useSelector(state => state.forgotPassword)
    const handleClick = () => {
        dispatch(forgotPassword(email))
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (message) {
            toast.success(message)
            navigate("/login")
        }
    }, [error, message, navigate, dispatch])
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
                            <Typography variant='h4' sx={headingCss} fontFamily={"Monospance"}>Forgot Password?</Typography>
                            <FormControl margin='dense' color='info'>
                                <Box component="div">
                                    <Box component="span"><i className="fas fa-user" ></i></Box>
                                    <InputLabel required={true} htmlFor="email" sx={addMarginX}>Email address</InputLabel>
                                    <Input id="email" name='email' type='email' aria-describedby="my-helper-text" sx={addMarginX} value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete='email' />
                                </Box>
                            </FormControl>
                            <ThemeProvider theme={theme}  >
                                <Button variant="contained" color="neutral" type='submit' sx={addMarginY} >Send mail</Button>
                            </ThemeProvider>
                        </Container>
                    </Container>
                </form>
        }
    </>;
};

export default ForgetPassword;
