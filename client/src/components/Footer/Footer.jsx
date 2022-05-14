import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.css"
import logo from "../../images/nav_logo.png"

const Footer = () => {
    return (
        <>
            <footer
                className="text-center text-lg-start text-white"
            >
                <section className="d-flex justify-content-between px-4">
                    <div className="ms-4">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div className='socials'>
                        <a href="https://twitter.com/_rajat_0512" className="text-white me-4" target="_blank" rel='noreferrer noopener'>
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com/_rajat_0512" className="text-white me-4" target="_blank" rel='noreferrer noopener'>
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/rajat-raghuvanshi-315593201" className="text-white me-4" target="_blank" rel='noreferrer noopener'>
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/Rajat-Raghuvanshi-0512" className="text-white me-4" target="_blank" rel='noreferrer noopener'>
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </section>
                <section className="">
                    <div className="px-md-5 text-center text-md-start mt-5">

                        <div className="row mt-3">

                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <Link to={"/"} className="my-3">
                                    <img src={logo} className="w-75" alt='logo' />
                                </Link>
                                <div className='mt-4'>
                                    Shop now with your <span className='text-uppercase opacity-75'>shop buddy.</span>  We have the best products for you.
                                    <p className='pt-3'>Good grooming is integral and impeccable style is a must.</p>
                                </div>
                            </div>
                            <div className="col-md-2 col-lg-4 col-xl-2 mx-auto mb-4 mt-3">
                                <h6 className="text-uppercase fw-bold">Products</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                />
                                <p className="p_links">
                                    <Link to="/products" className="text-white ms-3">Clothes</Link>
                                </p>
                                <p className="p_links">
                                    <Link to="/products" className="text-white ms-3">Phone</Link>
                                </p>
                                <p className="p_links">
                                    <Link to="/products" className="text-white ms-3">Jewellery</Link>
                                </p>
                                <p className="p_links">
                                    <Link to="/products" className="text-white ms-3">Footwear</Link>
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 mt-3">
                                <h6 className="text-uppercase fw-bold">Customer Service</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                />
                                <p className="p_links">
                                    <Link to="/contact" className="text-white mx-3">Contact Us</Link>
                                </p>
                                <p className="p_links">
                                    <Link to="/aboutus" className="text-white mx-3">About Us</Link>
                                </p>
                                <p className="p_links">
                                    <Link to="/policy/privacy" className="text-white mx-3">Privacy Policy</Link>
                                </p>
                                <p className="p_links">
                                    <Link to="/policy/return" className="text-white mx-3">Return Policy</Link>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 mt-3">
                                <h6 className="text-uppercase fw-bold">Contact</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                />
                                <p><i className="fas fa-home mx-3"></i>Karnal, Haryana, IN</p>
                                <p><i className="fas fa-envelope mx-3"></i>rajat.karnal@gmail.com</p>
                                <p><i className="fas fa-phone mx-3"></i>+ 91 9034 10 1507</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="footer-bottom">
                    <p>
                        Copyright &copy; 2022, designed by
                        <Link to="/aboutme" > Rajat Raghuvanshi</Link>
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Footer
