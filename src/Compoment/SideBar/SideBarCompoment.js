import React, { useEffect } from 'react'
import "./SidebarCompoment.css"
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
export default function SideBarCompoment(props) {
    let { userDetail } = props;
    const nav = useNavigate();
    if (userDetail != null) {
        userDetail = JSON.parse(userDetail)
    }
    useEffect(() => {

    }, [])
    const location = useLocation();
    const logOut = () => {
        localStorage.removeItem("userDetail");

    }
    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <h2>CRUD OPERATIONS</h2>
                <div className='sidebar_header_info'>
                    <img src={`${userDetail?.avatar}`} alt='avatar'></img>
                    <p>{userDetail?.name}</p>
                    <p>Admin</p>
                </div>
            </div>
            <div className='sidebar_body'>
                <div className={`${location.pathname === "/Home" ? "active" : ""} sidebar_button `}>
                    <i class="fa-solid fa-house"></i>
                    <NavLink to={"Home"}>Home</NavLink>
                </div>
                <div className='sidebar_button'>
                    <i class="fa-regular fa-bookmark"></i>
                    <Link>Course</Link>
                </div>
                <div className={`${location.pathname === "/StudentList" ? "active" : ""} sidebar_button `}>
                    <i class="fa-solid fa-graduation-cap"></i>
                    <NavLink to={"/StudentList"}>Students</NavLink>
                </div>
                <div className='sidebar_button'>
                    <i class="fa fa-dollar-sign"></i>
                    <Link>Payment</Link>
                </div>
                <div className='sidebar_button'>
                    <i class="fa-regular fa-file"></i>
                    <Link>Report</Link>
                </div>
                <div className='sidebar_button'>
                    <i class="fa-solid fa-sliders"></i>
                    <Link>Settings</Link>
                </div>
            </div>
            <NavLink to={"signin"} className='sidebar_footer' onClick={() => {
                logOut();
            }}>
                <p>Logout</p>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </NavLink>
        </div>
    )
}
