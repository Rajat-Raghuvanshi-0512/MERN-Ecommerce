import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
    return (
        <div>
            <div className="container mx-auto">
                <section className="text-gray-600 body-font">
                    <div className="container d-flex px-5 align-items-center justify-content-center flex-column">
                        <div className='w-25 my-5'>
                            <img className="rounded w-100 " alt="icon" src="/favicon.png" />
                        </div>
                        <div className="text-center">
                            <h1 className="mb-4 fw-bold">
                                Welcome to Shop Buddy
                            </h1>
                            <p className="mb-8 leading-relaxed">
                                This website is an attempt to deliver amazing products at a good and reasonable price. This entire website was built on a YouTube series as a NextJs course project. This website is powerd by ExpressJs + React + MongoDB for storing the data. If you are curious enough to find how this website was build, buy yourself a trendy geek Tshirt from Shop Buddy ;) !
                            </p>
                            <Link to={"/products"} className="flex justify-center">
                                <button className=" bg-dark text-white px-3 py-2 rounded my-4 ">Start Shopping</button>
                            </Link>
                        </div>
                    </div>
                </section>
                <hr />
                <section className="mt-8 text-gray-600 body-font mx-6">
                    <h3 className="fw-bold my-4">About Shop Buddy</h3>
                    <p className='my-5'>
                        Shop Buddy is an attempt to serve the people of india with unique designs on apparels. E-commerce is revolutionizing the way we all shop in India. Why do you want to hop from one store to another in search of your favorite geek hoodie when you can find it on the Internet in a single click? Not only hoodies, we also have a wide variety of stickers, mugs and other apparels!
                        <p>If you are wondering why you should shop from Flipkart when there are multiple options available to you, our unique designs and quality products will answer your question.
                        </p>
                    </p>
                </section>
            </div>
        </div>
    )
}

export default AboutUs