import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material'
import React, { useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import "./Navbar.css"
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/Actions/userAction';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

const UserOptions = () => {
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const actions = [
        { icon: <ShoppingCartIcon />, name: 'My Cart', func: () => Navigate("/cart") },
        { icon: <AccountCircleIcon />, name: 'Profile', func: () => Navigate("/profile") },
        { icon: <ListAltIcon />, name: 'Orders', func: () => Navigate("/orders") },
        { icon: <LogoutIcon />, name: 'Logout', func: () => logoutfunc() },
    ];
    const logoutfunc = () => {
        dispatch(logout());
        toast.success("Logged Out Successfully!")
        Navigate("/")
    }
    const { user, loading } = useSelector(state => state.userInfo)
    if (user.role === "admin") {
        actions.unshift({ icon: <DashboardIcon />, name: 'Dashboard', func: () => Navigate("/admin/dashboard") })
    }
    const [state, setState] = useState(false)

    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                        <Backdrop open={state} />
                        <SpeedDial
                            className="speedDial"
                            ariaLabel="SpeedDial tooltip example"
                            icon={<div className='avatar-cont'><img src={user.profilePhoto.url} className='avatar' alt='user' /></div>}
                            onClose={() => setState(false)}
                            onOpen={() => setState(true)}
                            open={state}
                            direction='down'
                        >
                            {actions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    onClick={action.func}
                                    tooltipOpen={window.innerWidth < 600 ? true : false}
                                />
                            ))}
                        </SpeedDial>
                    </>
            }
        </>
    )
}

export default UserOptions;