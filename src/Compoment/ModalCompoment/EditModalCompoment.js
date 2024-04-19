import { EditOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { getUserApi, signInUser } from '../../Redux/Reducers/UserReducer';
import EditCompoment from '../AddEditCompoment/EditCompoment';


export default function EditModalCompoment(props) {
    const { userID } = props;
    const [open, setOpen] = useState(false);



    let userData = "";

    const [form] = Form.useForm();
    const onFinish = (values) => {
        values.birthDay = values.birthDay.$d
        signInUser(values)

        form.resetFields();
    };
    const showModal = async (userID) => {
        userData = await getUserApi(userID);
        console.log(userData);
        console.log(userID);
        setOpen(!open);
    };

    const handleCancel = async () => {
        setOpen(!open);
    };
    const handleOk = () => {
        setOpen(!open);
    };
    return (
        <>
            <EditOutlined onClick={() => {
                showModal(userID)
            }} />
            <Modal
                title="Edit student"
                open={open}
                onCancel={handleCancel}
                onOk={handleOk}
            >
                <EditCompoment userID={userID}></EditCompoment>
            </Modal>
        </>
    )
}

