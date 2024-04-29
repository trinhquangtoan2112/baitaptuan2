import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import AddEditCompoment from '../AddEditCompoment/AddEditCompoment';
export default function ModalCompoment(props) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);

    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                ADD NEW STUDENT
            </Button>
            <Modal
                title="Add new student"
                open={open}

                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okButtonProps={{
                    hidden: true,
                }}
                cancelButtonProps={{
                    hidden: true,
                }}
            >
                <AddEditCompoment cancel={handleCancel}></AddEditCompoment>
            </Modal>
        </>
    )
}
