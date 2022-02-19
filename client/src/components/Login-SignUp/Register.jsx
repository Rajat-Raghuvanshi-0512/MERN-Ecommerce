import { ThemeProvider } from '@mui/material/styles';
import { Button, Container, FormControl, FormHelperText, Input, InputLabel, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { mainContainerCss, headingCss, addMarginX, addMarginY, theme, lastContainer } from "./ObjectCss"
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { clearErrors, register } from '../../Redux/Actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';


const Register = () => {

    const Navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const dispatch = useDispatch()
    const { error, isAuthenticated, loading } = useSelector(state => state.userInfo)

    const registerUser = (e) => {
        e.preventDefault();
        if (user.password !== user.cpassword) {
            toast.error("Password does not match")
            return;
        }

        const { name, email, password } = user
        dispatch(register(name, email, password))

    }
    useEffect(() => {
        if (error) {
            toast.error(error)
            console.log(error);
            dispatch(clearErrors())
        }
        if (isAuthenticated) {
            Navigate("/profile")
        }
    }, [isAuthenticated, Navigate, error, dispatch])
    return (
        <>
            {
                loading ?
                    <Loader /> :
                    <form method='post' onSubmit={registerUser}>
                        <Container sx={mainContainerCss}  >
                            <div className="container">
                                <div className="row">
                                    <div className='col-md-6 col-lg-6 col-sm-12 col-12 d-flex flex-column align-items-center justify-content-center'>
                                        <Typography variant='h4' sx={headingCss} fontFamily={"Monospance"}>Sign Up <i className="fas fa-sign-in-alt"></i></Typography>
                                        <FormControl margin='dense' color='info'>
                                            <Box component="div">
                                                <Box component="span"><i className="fas fa-user" ></i></Box>

                                                <InputLabel htmlFor="name" sx={addMarginX}>Full Name</InputLabel>
                                                <Input onChange={handleInput} value={user.name} id="name" name='name' sx={addMarginX} required />
                                            </Box>
                                        </FormControl>
                                        <FormControl margin='dense' color='info'>
                                            <Box component="div">
                                                <Box component="span"><i className="fas fa-envelope" ></i></Box>
                                                <InputLabel htmlFor="email" sx={addMarginX}>Email address</InputLabel>
                                                <Input onChange={handleInput} value={user.email} id="email" type='email' name='email' aria-describedby="my-helper-text" sx={addMarginX} required />
                                            </Box>
                                        </FormControl>
                                        <FormControl margin='dense' color='info'>
                                            <Box component="div">
                                                <i className="fas fa-lock"></i>
                                                <InputLabel htmlFor="password" sx={addMarginX}>Password</InputLabel>
                                                <Input onChange={handleInput} value={user.password} id="password" name='password' type='password' aria-describedby="password" sx={addMarginX} required />
                                            </Box>
                                        </FormControl>
                                        <FormControl margin='dense' color='info'>
                                            <Box component="div">
                                                <i className="fas fa-lock"></i>
                                                <InputLabel htmlFor="password" sx={addMarginX}>Confirm Password</InputLabel>
                                                <Input onChange={handleInput} value={user.cpassword} id="cpassword" name='cpassword' type='password' aria-describedby="password" sx={addMarginX} required />
                                            </Box>
                                        </FormControl>
                                        <Container sx={lastContainer}>
                                            <ThemeProvider theme={theme}  >
                                                <Button variant="contained" color="neutral" sx={addMarginY} type='submit' >Register</Button>
                                            </ThemeProvider>
                                        </Container>
                                    </div>
                                    <div className='col-md-6 col-lg-6 col-sm-12 col-12 d-flex flex-column align-items-center justify-content-center'>
                                        <img src={require("../../images/register.png")} alt="register" className=" hide-phone" />
                                        <Link to="/login" style={{ textDecoration: "none" }}>
                                            <FormHelperText id="login" sx={{ textAlign: "end", paddingTop: "30px" }}>Already a user? <span className='text-danger' >Login</span></FormHelperText>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </form>
            }
        </>
    )
}

export default Register
