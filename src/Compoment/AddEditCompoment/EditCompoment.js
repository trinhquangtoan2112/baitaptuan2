import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import { getUserApi } from '../../Redux/Reducers/UserReducer';
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
    let { userID } = props;
    let userData = "";
    const [data, setData] = useState({
        name: "",
        avatar: "",
        email: "",
        phone: "",
        enroll: "",
        birthDay: "",
        password: "",
    });
    const [form] = Form.useForm();
    const showModal = async () => {
        userData = await getUserApi(userID);
        setData(userData)
        console.log(userData)
    };
    useEffect(() => {
        showModal();
    }, [])


    console.log(data)
    let userInformation = localStorage.getItem("userDetail");
    userInformation = JSON.parse(userInformation)

    const renderConfirmPassword = () => {
        return userInformation.id === userID ? <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback

            rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                }),
            ]}
        >
            <Input.Password defaultValue={userData.password} />
        </Form.Item> : <p></p>
    }
    const date = new Date();
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"


            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >
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
                <Input defaultValue={userData.name} />
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
                <Input defaultValue={data.email} />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                ]}
            >
                <InputNumber minLength={6} maxLength={30} defaultValue={data.phone} />
            </Form.Item>
            <Form.Item
                name="enroll"
                label="Enrol Number"
                rules={[

                ]}
            >
                <InputNumber minLength={8} maxLength={100} defaultValue={data.enroll} />
            </Form.Item>
            <Form.Item
                label="DatePicker"
                name="birthDay"
                rules={[
                    () => ({
                        validator(_, value) {
                            console.log(value.$d)
                            console.log(date)
                            if (value.$d < date) {
                                return Promise.resolve();
                            } else {
                                return Promise.reject(new Error('Khong phai la ngay cua tuong lai'));
                            }

                        },
                    }),

                ]}
            >
                <DatePicker allowClear={false} />
            </Form.Item>
            <Form.Item
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
                hasFeedback
            >
                <Input.Password defaultValue={data.password} />
            </Form.Item>

            {renderConfirmPassword()}

        </Form >
    )
}
