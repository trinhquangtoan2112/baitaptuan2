import { EditOutlined, LeftCircleFilled } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { getUserApi, signInUser } from '../../Redux/Reducers/UserReducer';
import EditCompoment from '../AddEditCompoment/EditCompoment';
export default function EditModalCompoment(props) {
    let { userID } = props;
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState();

    useEffect(() => {
    }, [date])

    const showModal = async () => {
        setOpen(!open);
        let date = new Date();
        setDate(date)
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
                showModal()
            }} />
            <Modal
                title="Edit student"
                open={open}
                okButtonProps={{
                    hidden: true,
                }}
                cancelButtonProps={{
                    hidden: true,
                }}
                onCancel={handleCancel}
            >
                <EditCompoment userID={userID} date={date} onCancel={handleCancel}></EditCompoment>
            </Modal>
        </>
    )
}

