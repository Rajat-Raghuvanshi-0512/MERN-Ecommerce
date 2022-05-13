import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.css"
import logo from "../../images/nav_logo.png"

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer-content">
                    <Link to={"/"} style={{ width: "200px" }} className="mb-3">
                        <img src={logo} className="width-100 h-100" />
                    </Link>
                    <ul className="socials">
                        <li>
                            <a href="https://github.com/Rajat-Raghuvanshi-0512" target="_blank" rel="noreferrer" ><i className="fab fa-github"></i></a>
                        </li>
                        <li>
                            <a href="https://twitter.com/_rajat_0512" target="_blank" rel="noreferrer" ><i className="fab fa-twitter"></i></a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/_rajat_0512" target="_blank" rel="noreferrer" ><i className="fab fa-instagram"></i></a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/rajat-raghuvanshi-315593201/" target="_blank" rel="noreferrer"  ><i className="fab fa-linkedin-square"></i></a>
                        </li>
                    </ul>
                </div>
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
