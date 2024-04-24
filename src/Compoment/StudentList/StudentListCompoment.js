import React, { useState } from 'react';
import { message, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { LiaSortSolid } from 'react-icons/lia';
import "./StudentList.css"
import { useOutletContext } from 'react-router-dom';
import ModalCompoment from '../ModalCompoment/ModalCompoment';
import { deleteUser } from '../../Redux/Reducers/UserReducer';
import EditModalCompoment from '../ModalCompoment/EditModalCompoment';
import moment from 'moment';
const confirm = (id) => {
    deleteUser(id)
};
const cancel = (e) => {
    message.error('Bạn chọn không xóa');
};




export default function StudentListCompoment() {
    const context = useOutletContext();
    let data = context[1];
    const [open, setOpen] = useState(false);

    if (data.length > 0) {
        data = data.map(student => ({
            ...student,
            createdAt: moment(student.createdAt)
        }));
    }
    const date = new Date();
    date.toLocaleString();



    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {

        setOpen(false);
    };
    const columns = [
        {

            dataIndex: 'avatar',
            key: 'img',
            render: (img) => <img src={`${img}`} alt={`${img}`}></img>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (text) => <a>{text}</a>,
        },

        {
            title: 'EnrollNumber',
            dataIndex: 'enroll',
            key: 'enroll',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Date of administration',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => moment(createdAt._d).format('DD-MMM , YYYY'),
        },
        {
            title: "",
            key: 'action',
            render: (_, record) => (

                < Space size="middle" >

                    <EditModalCompoment open={open} showModal={showModal} handleCancel={handleCancel} userID={_.id} date={date}
                    ></EditModalCompoment>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => {
                            confirm(_.id)
                        }}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined />
                    </Popconfirm>

                </ Space>
            ),
        },
    ];
    return (
        <div className='list_container'>

            <div className='list_title' >

                <div className='list_title_left'>Students List</div>
                <div className='list_title_right'>
                    <LiaSortSolid />
                    <ModalCompoment open={open} showModal={showModal} handleCancel={handleCancel}></ModalCompoment>
                </div>

            </div>
            <hr />
            <div className='list_table'>
                <Table columns={columns} dataSource={data} />
            </div>
            <div></div>
        </div>
    )
}
