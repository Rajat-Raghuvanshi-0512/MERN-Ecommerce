import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../SideBar';
import { Doughnut, Line } from "react-chartjs-2"
import "./dashboard.css"
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import Metadata from '../../Metadata';
import { useDispatch, useSelector } from 'react-redux';
import { adminOrders } from '../../../Redux/Actions/orderAction';
import { getAllProductsAdmin } from '../../../Redux/Actions/productAction';
import { getAllUsers } from '../../../Redux/Actions/userAction';

const DashBoard = () => {

    const { total, orders } = useSelector(state => state.allOrders)
    const { products } = useSelector(state => state.allProducts)
    const { users } = useSelector(state => state.allUsers)
    let outOfStock = 0;

    const dispatch = useDispatch()
    products && products.forEach(product => {
        if (product.stock === 0) outOfStock += 1
    })

    Chart.register(CategoryScale)

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ['rgb(75, 192, 192)'],
                hoverBackgroundColor: ['rgb(0, 0, 0)'],
                data: [0, Number(total).toFixed()]
            }
        ]
    }
    const doughnutState = {
        labels: ["Out of Stock", "In Stock"],
        datasets: [
            {
                backgroundColor: ['#00A6B4', '#6800B4'],
                hoverBackgroundColor: ['rgb(75, 192, 192)', '#35014F'],
                borderColor: "#fff",
                hoverOffset: 1,
                data: [outOfStock, products.length - outOfStock]
            }
        ]
    }

    useEffect(() => {
        dispatch(adminOrders())
        dispatch(getAllProductsAdmin())
        dispatch(getAllUsers())
    }, [dispatch]);

    return <>
        <Metadata title="Shop Buddy | Admin - Dashboard" />
        <div className="admin_container">
            <SideBar />
            <div className="dashboardContainer">
                <Typography variant='h2' className='text-center border-bottom mb-5'>Dashboard</Typography>
                <div>
                    <div className='totalAmount my-5 fw-bold'>
                        <p>Total Amount<br /><span>₹ {Number(total).toFixed()}</span></p>
                    </div>
                    <div className="links">
                        <div className="link">
                            <Link to="/admin/product/all">
                                <p>Products</p>
                                <div>{products && products.length}</div>
                            </Link>
                        </div>
                        <div className="link">
                            <Link to="/admin/orders">
                                <p>Orders</p>
                                <div>{orders && orders.length}</div>
                            </Link>
                        </div>
                        <div className="link">
                            <Link to="/admin/users">
                                <p>Users</p>
                                <div>{users && users.length}</div>
                            </Link>
                        </div>
                    </div>
                    <div className="lineChart">
                        <Line data={lineState} />
                    </div>
                    <div className="DoughnutChart">
                        <Doughnut data={doughnutState} />
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default DashBoard;
