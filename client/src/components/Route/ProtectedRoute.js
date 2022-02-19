import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const useAuth = (admin, user, isAuthenticated) => {
    if (isAuthenticated === false) {
        return false
    }
    if (admin === true && user.role !== "admin") {
        return false
    }
    return true;
}

const ProtectedRoute = ({ admin = false }) => {

    const { loading, isAuthenticated, user } = useSelector(state => state.userInfo)

    const auth = useAuth(admin, user, isAuthenticated)

    return (
        <>
            {
                loading === false && (auth === true ? <Outlet /> : <Navigate to="/login" />)
            }
        </>
    )
}

export default ProtectedRoute
