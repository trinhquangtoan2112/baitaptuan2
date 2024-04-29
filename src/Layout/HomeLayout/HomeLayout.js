import React, { useEffect } from 'react'
import SideBarCompoment from '../../Compoment/SideBar/SideBarCompoment'
import "./HomeLayout.css"
import HeaderCompoment from '../../Compoment/HeaderCompoment/HeaderCompoment'

import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserApi } from '../../Redux/Reducers/UserReducer'
export default function HomeLayout() {
    const userInformation = localStorage.getItem("userDetail");
    const allUser = useSelector(state => state.UserReducer.allUser);

    console.log(allUser);
    const allUserLength = allUser.length;
    const nav = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        if (userInformation == null) {
            nav("/signin")
        }
        getAllUserApi(dispatch)
    }, [])
    return (
        <div className='homelayout'>
            <div className='coloum_left'>
                <SideBarCompoment userDetail={userInformation}></SideBarCompoment>
            </div>
            <div className='coloum_right'>
                <HeaderCompoment></HeaderCompoment>
                {/* <StudentListCompoment></StudentListCompoment>
                <DashBoardCompoment></DashBoardCompoment> */}
                <Outlet context={[allUserLength, allUser]}></Outlet>
            </div>
        </div>
    )
}
