import React, { useState } from 'react'
import "./Contact.css"
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useSelector } from 'react-redux';
import CommentIcon from '@mui/icons-material/Comment';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';

const Contact = () => {


    const { user } = useSelector(state => state.userInfo)

    const [userData, setUserData] = useState({
        name: user && user.name,
        email: user && user.email,
        phone: "",
        message: ""
    });
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userData.name === "" || userData.email === "" || userData.phone === "") {
            return toast.error("Please fill all the fields")
        }
        if (userData.phone.length !== 10) {
            return toast.error("Please enter a valid phone number")
        }
        if (userData.message === "") {
            return toast.error("Message cannot be empty")
        }
        setUserData({ ...userData, message: "" })
        toast.success("Message sent successfully")
    }

    return (
        <>
            <div className="contact-conainer">

                {
                    user && <div className="wrapper mt-5">
                        <Typography variant='h2' className='text-center border-bottom' id="products">Contact Us</Typography>
                        <form onSubmit={handleSubmit}>
                            <div className="dbl-field">
                                <div className="field">
                                    <input type="text" name="name" value={userData.name} onChange={handleInput} placeholder="Enter your name" />
                                    <PersonIcon className='icon' />
                                </div>
                                <div className="field">
                                    <input type="email" name="email" value={userData.email} onChange={handleInput} placeholder="Enter your email" />
                                    <EmailIcon className='icon' />
                                </div>
                            </div>
                            <div className="dbl-field">
                                <div className="field">
                                    <input type="number" name="phone" value={userData.phone} onChange={handleInput} placeholder="Enter your phone number" />
                                    <LocalPhoneIcon className='icon' />
                                </div>
                            </div>
                            <div className="message">
                                <CommentIcon className='icon' />
                                <textarea onChange={handleInput} value={userData.message} placeholder="Write your message" name="message" ></textarea>
                            </div>
                            <div className="button-area">
                                <button type="submit">Send Message</button>
                                <span></span>
                            </div>
                        </form>
                    </div>
                }
                <div className="d-flex mb-3 pt-5 justify-content-between contact-links">
                    <span className='contact-name text-center'>Email </span>
                    <a href="mailto:rajat.karnal@gmail.com" className='sendmail'> <EmailIcon className='mx-2 icon' /> Rajat.karnal@gmail.com</a>
                </div>
                <div className="d-flex my-3 justify-content-between contact-links">
                    <span className='contact-name text-center'>Instagram </span>
                    <a href="https://www.instagram.com/_rajat_0512" rel="noreferrer" target="_blank" className='insta'> <InstagramIcon className='mx-2 icon' /> _rajat_0512</a>
                </div>
                <div className="d-flex my-3 justify-content-between contact-links">
                    <span className='contact-name text-center'>LinkedIn </span>
                    <a href="https://www.linkedin.com/in/rajat-raghuvanshi-315593201/" rel="noreferrer" target="_blank" className='linkedin'> <LinkedInIcon className='mx-2 icon' /> Rajat Raghuvanshi</a>
                </div>
            </div>
        </>
    )
}

export default Contact