import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import { editUser, getUserApi } from '../../Redux/Reducers/UserReducer';
import Moment from 'react-moment';
import moment from 'moment';
import dayjs from 'dayjs';
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default function EditCompoment(props) {
    let { date, onCancel, userID } = props;
    let data1 = "";
    const [data, setData] = useState({
        name: "1421",
        avatar: "",
        email: "",
        phone: "",
        enroll: "",
        password: "",
        createdAt: "",
    });
    const handleChange = (e) => {
        setData({
            ...data,
            avatar: e.target.value
        })
    }
    useEffect(() => {
        const showModal = async () => {
            data1 = getUserApi(userID);
            data1.createdAt = dayjs(data1.createdAt);
            setData({
                ...data1,
                avatar: data1.avatar
            })
            form.setFieldsValue({
                name: data1.name || '',
                avatar: data1.avatar || '',
                email: data1.email || '',
                phone: data1.phone || '',
                enroll: data1.enroll || '',
                birthDay: data1.createdAt ? dayjs(data1.createdAt) : null,
                password: data1.password || '',
                confirmPassword: data1.password || '',
            });
        };
        showModal();
    }, [])
    const dateFormat = "DD/MM/YYYY";
    useEffect(() => {
        const showModal = async () => {
            data1 = await getUserApi(userID);
            data1.createdAt = dayjs(data1.createdAt);
            setData(data1)
            form.setFieldsValue({
                name: data1.name || '',
                avatar: data1.avatar || '',
                email: data1.email || '',
                phone: data1.phone || '',
                enroll: data1.enroll || '',
                createdAt: data1.createdAt ? dayjs(data1.createdAt) : null,
                password: data1.password || '',
                confirmPassword: data1.password || '',
            });
        };

        showModal();
    }, [date])
    const onFinish = async (values) => {
        values.avatar = await data.avatar
        editUser(userID, values)
    };
    const [form] = Form.useForm();
    let userInformation = localStorage.getItem("userDetail");
    userInformation = JSON.parse(userInformation)

    const renderConfirmPassword = () => {
        return userInformation.id === userID ? <Form.Item
            name="password"
            label="Password"
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                () => ({
                    validator(_, value) {
                        const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@]).{6,30}$/;


                        if (checkPassword.test(value)) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject(new Error('Mật khẩu không đúng định dạng'));
                        }

                    },
                }),
            ]}
            hasFeedback >
            <Input.Password />
        </Form.Item> : <p></p>
    }
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}

            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >
            <img src={data.avatar} alt='anh nen'></img>
            <Form.Item
                name="avatar"
                label="Avatar"

            >

                <Input onChange={(e) =>
                    handleChange(e)} />
            </Form.Item>
            <Form.Item
                name="name"
                label="Name"

                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                        whitespace: true,
                    },
                    {
                        min: 4,
                        message: "Too short"
                    },
                    {
                        max: 25,
                        message: "Too long"
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    {
                        min: 6,
                        message: "Too short"
                    },
                    {
                        max: 30,
                        message: "Too long"
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                ]}
            >
                <InputNumber minLength={6} maxLength={30} />
            </Form.Item>
            <Form.Item
                name="enroll"
                label="Enrol Number"
                rules={[

                ]}
            >
                <InputNumber minLength={8} maxLength={100} />
            </Form.Item>
            <Form.Item
                label="Date of administration"
                name="createdAt"
                rules={[
                    () => ({
                        validator(_, value) {
                            if (value.$d <= date) {
                                return Promise.resolve();
                            } else {
                                return Promise.reject(new Error('Khong phai la ngay cua tuong lai'));
                            }

                        },
                    }),

                ]}
            >
                <DatePicker allowClear={false} format={dateFormat} />
            </Form.Item>

            {renderConfirmPassword()}
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
                <Button type="" onClick={() => {
                    onCancel()
                }}>
                    Cancel
                </Button>
            </Form.Item>


        </Form >
    )
}
