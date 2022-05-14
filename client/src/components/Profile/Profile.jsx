import { useNavigate } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import "./Profile.css"
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { clearErrors } from '../../Redux/Actions/userAction'
import Metadata from '../Metadata'

const Profile = () => {
    const { user, loading, error } = useSelector(state => state.userInfo)
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, error]);

    return (
        <>
            <Metadata title="Shop Buddy | My Profile" />
            {
                loading ? (
                    <Loader />)
                    :
                    (
                        <div className="container">
                            <h1 className='fw-bold border-bottom text-center my-3 pb-3'>My Profile</h1>
                            <div className="row">
                                <div className="col-md-6 my-3 p-3 d-flex align-items-center justify-content-center flex-column gap-4">
                                    <div className='profile-img'>
                                        <img src={user.profilePhoto && user.profilePhoto.url} alt="profile" className='userimage' />
                                    </div>
                                    <button className='btn btn-dark mt-3 px-4 py-2' onClick={() => Navigate("/me/update")}>Update Profile</button>
                                </div>
                                <div className="col-md-6 p-3 my-2 details">
                                    <h3 className='border-bottom text-center fw-bold'>USER DETAILS</h3>
                                    <div className='p-2 pt-5'>
                                        <h4 className='fw-bold'>Name:</h4>
                                        <p className=' text-success px-3 opacity-75 fs-5 fw-bold'>{user.name}</p>
                                    </div>
                                    <div className='p-2'>
                                        <h4 className='fw-bold'>E-mail:</h4>
                                        <p className=' text-success px-3 opacity-75 fs-5 fw-bold'>{user.email}</p>
                                    </div>
                                    <div className='p-2'>
                                        <h4 className='fw-bold'>Joined On:</h4>
                                        <p className=' text-success px-3 opacity-75 fs-5 fw-bold'>{user.createdAt && user.createdAt.substr(0, 10)}</p>
                                    </div>
                                    <div className='text-center mt-5 d-flex justify-content-between w-100'>
                                        <button className="btn profile-btn" onClick={() => Navigate("/password/change")}>Change Password</button>
                                        <button className="btn profile-btn" onClick={() => Navigate("/orders")}>My Orders</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Profile
