import { ThemeProvider } from '@mui/material/styles';
import { Button, Container, FormControl, FormHelperText, Input, InputLabel, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { mainContainerCss, innerContainer, headingCss, addMarginX, addMarginY, forgotPass, theme } from "./ObjectCss"
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../../Redux/Actions/userAction';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    const location = useLocation()

    const dispatch = useDispatch();
    const { loading, isAuthenticated, error } = useSelector(state => state.userInfo)

    const loginUser = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }
    //     /login?redirect=shipping 
    const redirect = location.search ? `/${location.search.split("=")[1]}` : "/profile"

    useEffect(() => {
        if (error) {
            toast.error(`${error}`)
            dispatch(clearErrors())
        }
        if (isAuthenticated) {
            Navigate(redirect)
        }
    }, [isAuthenticated, Navigate, error, dispatch, redirect])
    return (
        <>
            {
                loading ?
                    <Loader /> :
                    <form method='post' onSubmit={loginUser}>
                        <Container sx={mainContainerCss}  >
                            <Container>
                                <img src={require("../../images/Mylogin.png")} alt="login " style={{ maxWidth: "100%", maxHeight: '100%' }} />
                            </Container>
                            <Container sx={innerContainer}>
                                <i className="fas fa-user-circle" style={{ fontSize: "4rem" }}></i>
                                <Typography variant='h4' sx={headingCss} fontFamily={"Monospance"}>Sign In</Typography>
                                <FormControl margin='dense' color='info'>
                                    <Box component="div">
                                        <Box component="span"><i className="fas fa-user" ></i></Box>
                                        <InputLabel required={true} htmlFor="email" sx={addMarginX}>Email address</InputLabel>
                                        <Input id="email" name='email' type='email' aria-describedby="my-helper-text" sx={addMarginX} value={email} onChange={(e) => setEmail(e.target.value)} required={true} autoComplete='email' />
                                    </Box>
                                </FormControl>
                                <FormControl margin='dense' color='info'>
                                    <Box component="div">
                                        <i className="fas fa-lock"></i>
                                        <InputLabel htmlFor="password" sx={addMarginX}>Password</InputLabel>
                                        <Input id="password" name='password' type='password' aria-describedby="password" sx={addMarginX} value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
                                        <Link to="/password/forgot" style={{ textDecoration: "none" }}>
                                            <FormHelperText id="password" sx={forgotPass}>Forgot Password?</FormHelperText>
                                        </Link>
                                    </Box>
                                </FormControl>
                                <ThemeProvider theme={theme}  >
                                    <Button variant="contained" color="neutral" type='submit' sx={addMarginY} >Login</Button>
                                </ThemeProvider>
                                <Link to="/register" style={{ textDecoration: "none" }}>
                                    <FormHelperText id="register" sx={{ textAlign: "end" }} >Not a user? Hurry! <span className='text-danger' >Register Now</span></FormHelperText>
                                </Link>
                            </Container>
                        </Container>
                    </form>
            }
        </>
    )
}

export default Login
