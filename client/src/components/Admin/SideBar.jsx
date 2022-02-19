import React from 'react';
import TreeView from '@mui/lab/TreeView';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownCircleSharpIcon from '@mui/icons-material/ArrowDropDownCircleSharp';
import TreeItem from '@mui/lab/TreeItem';
import Dashboard from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LabelIcon from '@mui/icons-material/Label';
import "./Sidebar.css"
import ListIcon from '@mui/icons-material/List';

const SideBar = () => {

    const toggleMenu = (e) => {
        const menu = document.getElementById("toggle-sidebar")
        if (menu.classList.contains("hide")) {
            menu.classList.remove("hide")
        } else {
            menu.classList.add("hide")
        }
    }

    return <>
        <div className='sidebar'>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className='fw-bold py-5 title_heading'>Shop Buddy </h3>
                <ListIcon onClick={toggleMenu} className='filter-toggle sidebar-toggle' />
            </div>
            <div className="main-sidebar hide" id="toggle-sidebar">
                <Link to={"/admin/dashboard"} className="text-decoration-none text-secondary">
                    <div className='mx-1'><Dashboard /> Dashboard</div>
                </Link>
                <TreeView
                    defaultCollapseIcon={<ArrowDropDownCircleSharpIcon />}
                    defaultExpandIcon={<LabelIcon />}
                    className="text-decoration-none text-secondary"
                >
                    <TreeItem nodeId="2" label="Products">
                        <Link to="/admin/product/all" className="text-decoration-none text-secondary p-0 m-0">
                            <TreeItem
                                nodeId="3"
                                label="All"
                                icon={<Inventory2Icon />}
                            />
                        </Link>
                        <Link to="/admin/product/create" className="text-decoration-none text-secondary">
                            <TreeItem
                                nodeId="4"
                                label="Create"
                                icon={<AddIcon />}
                            />
                        </Link>
                    </TreeItem>
                </TreeView>
                <Link to={"/admin/orders"} className="text-decoration-none text-secondary">
                    <div className='mx-1'><ListAltIcon /> Orders</div>
                </Link>
                <Link to={"/admin/users"} className="text-decoration-none text-secondary">
                    <div className='mx-1'><AccountBoxIcon /> Users</div>
                </Link>
                <Link to={"/admin/reviews"} className="text-decoration-none text-secondary">
                    <div className='mx-1'><ReviewsIcon /> Reviews</div>
                </Link>
            </div>
        </div>
    </>;
};

export default SideBar;
