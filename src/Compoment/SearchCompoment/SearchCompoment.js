import { message, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useLocation, useOutletContext } from 'react-router-dom';
import EditModalCompoment from '../ModalCompoment/EditModalCompoment';
import { DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { deleteUser } from '../../Redux/Reducers/UserReducer';

const confirm = (id) => {
    deleteUser(id)
};
const cancel = (e) => {
    message.error('Bạn chọn không xóa');
};

export default function SearchCompoment() {
    const context = useOutletContext();
    let data = context[1];
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {

        setOpen(false);
    };
    const [data1, setData1] = useState([]);
    const location = useLocation();
    console.log(location);
    const { state } = useLocation();
    const [status, setStatus] = useState("");
    const checkEmail = /^(?=.{6,30}$)([^\s@]+@[^\s@]+\.[^\s@]+)$/;
    const checkPhone = /^[0-9\-\+]{0,40}$/;

    useEffect(() => {
        if (state != null) {
            searching()
        }
        else { }
    }, [state])

    const searching = async () => {
        if (!state) {

            setData1(data);
        }
        let lowercaseQuery = state.toLowerCase().trim();
        const dataFilter = await data.filter(item => item.email.toLowerCase().includes(lowercaseQuery) || parseInt(item.phone) === lowercaseQuery || item.name.toLowerCase().includes(lowercaseQuery));
        setData1(dataFilter)
        // if (checkEmail.test(state)) {


        //     setStatus("email");
        // } else if (checkPhone.test(state)) {
        //     lowercaseQuery = parseInt(lowercaseQuery);
        //     const dataFilter = await data.filter(item => parseInt(item.phone) === lowercaseQuery);
        //     setData1(dataFilter)
        //     console.log(dataFilter)
        //     setStatus("phone")
        // } else {
        //     const dataFilter = await data.filter(item => item.name.toLowerCase().includes(lowercaseQuery));
        //     setData1(dataFilter)

        //     setStatus("name")

        // }

    }
    const date = new Date();
    date.toLocaleString();
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
            render: (createdAt) => dayjs(createdAt._d).format('DD-MMM , YYYY'),
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
        <div className='list_container123'>
            <div className='list_title'>
                <div className='list_title_left'>Search Student</div>
            </div>
            <hr />
            <div className='list_table'>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div></div>
        </div>
    )
}
