import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./Navbar.css"
import UserOptions from './UserOptions';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
const Navbars = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const handleOnChange = (e) => {
        navigate(`/products/${e.target.value}`)
    }
    const { isAuthenticated } = useSelector(state => state.userInfo)
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
                <div className="container">
                    <span className='svg'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32"><g transform="matrix(.05696 0 0 .05696 .647744 2.43826)" fill="none" fillRule="evenodd"><circle r="50.167" cy="237.628" cx="269.529" fill="#00d8ff" /><g stroke="#00d8ff" strokeWidth="32"><path d="M269.53 135.628c67.356 0 129.928 9.665 177.107 25.907 56.844 19.57 91.794 49.233 91.794 76.093 0 27.99-37.04 59.503-98.083 79.728-46.15 15.29-106.88 23.272-170.818 23.272-65.554 0-127.63-7.492-174.3-23.44-59.046-20.182-94.61-52.103-94.61-79.56 0-26.642 33.37-56.076 89.415-75.616 47.355-16.51 111.472-26.384 179.486-26.384z" /><path d="M180.736 186.922c33.65-58.348 73.28-107.724 110.92-140.48C337.006 6.976 380.163-8.48 403.43 4.937c24.248 13.983 33.042 61.814 20.067 124.796-9.8 47.618-33.234 104.212-65.176 159.6-32.75 56.788-70.25 106.82-107.377 139.272-46.98 41.068-92.4 55.93-116.185 42.213-23.08-13.3-31.906-56.92-20.834-115.233 9.355-49.27 32.832-109.745 66.8-168.664z" /><path d="M180.82 289.482C147.075 231.2 124.1 172.195 114.51 123.227c-11.544-59-3.382-104.11 19.864-117.566 24.224-14.024 70.055 2.244 118.14 44.94 36.356 32.28 73.688 80.837 105.723 136.173 32.844 56.733 57.46 114.21 67.036 162.582 12.117 61.213 2.31 107.984-21.453 121.74-23.057 13.348-65.25-.784-110.24-39.5-38.013-32.71-78.682-83.253-112.76-142.115z" /></g></g></svg>
                    </span>
                    <Link className="navbar-brand fs-3 fw-bold mx-3" to="/">
                        Shop Buddy</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
                            <li className="nav-item px-2">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/" >Home</Link>
                            </li>
                            <li className="nav-item px-2">
                                <Link className={`nav-link ${location.pathname === "/products" ? "active" : ""}`} to="/products">Products</Link>
                            </li>
                            <li className="nav-item px-2">
                                <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">Contact Us</Link>
                            </li>
                        </ul>
                        <div className='search'>
                            <SearchIcon className='icon' />
                            <input className="search-input me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleOnChange} />
                        </div>
                        <ul className="navbar-nav mb-2 mb-lg-0 cart-login ">
                            {
                                isAuthenticated === false &&
                                <>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} to="/login"><PersonIcon /></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === "/cart" ? "active" : ""}`} to="/cart"><ShoppingCartIcon /></Link>
                                    </li>
                                </>
                            }
                            {
                                isAuthenticated && <li className='mx-3'>
                                    <UserOptions />
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbars
