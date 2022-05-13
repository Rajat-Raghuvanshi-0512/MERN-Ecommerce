import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./Navbar.css"
import UserOptions from './UserOptions';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import logo from "../../images/nav_logo.png"
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
                <div className="container py-1">
                    <span style={{ width: "180px" }}>
                        <Link to="/" >
                            <img src={logo} alt="logo" className='logo' />
                        </Link>
                    </span>
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
