import React from 'react'
import "./DashBoardCompoment.css"
import { HiOutlineAcademicCap } from 'react-icons/hi'
import { CiBookmark, CiUser } from 'react-icons/ci'
import { IoLogoUsd } from 'react-icons/io'
import { useOutletContext } from 'react-router-dom'

export default function DashBoardCompoment(props) {
    const context = useOutletContext();
    const allUserLength = context[0];
    console.log(allUserLength)
    return (
        <div className='dashboard_compoment'>
            <div className='dashboard_content'>
                <div className='dashboard_container dashboard_Student'>
                    <div className='dashboard_container_top'>
                        <HiOutlineAcademicCap />
                        <p>Student</p>
                    </div>
                    <div className='dashboard_container_bottom'>
                        <p>
                            {allUserLength}
                        </p>
                    </div>
                </div>
                <div className='dashboard_container dashboard_Course'>
                    <div className='dashboard_container_top'>
                        <CiBookmark />
                        <p>Course</p>
                    </div>
                    <div className='dashboard_container_bottom'>
                        <p>
                            13
                        </p>
                    </div>
                </div>
                <div className='dashboard_container dashboard_Payments'>
                    <div className='dashboard_container_top'>
                        <IoLogoUsd />
                        <p>Payments</p>
                    </div>
                    <div className='dashboard_container_bottom'>
                        <p>
                            <span>INR</span>   556,000
                        </p>
                    </div>
                </div>
                <div className='dashboard_container dashboard_Users'>
                    <div className='dashboard_container_top'>
                        <CiUser />
                        <p>Users</p>
                    </div>
                    <div className='dashboard_container_bottom'>
                        <p>
                            3
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}
