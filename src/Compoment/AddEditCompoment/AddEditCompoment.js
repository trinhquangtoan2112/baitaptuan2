import React, { useState } from 'react';
import {
    Button, DatePicker, Form, Input, InputNumber,
} from 'antd';
import { signInUser } from '../../Redux/Reducers/UserReducer';
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
export default function AddEditCompoment(props) {
    const { cancel } = props;
    const [imgState, setImgState] = useState();
    const date = new Date();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        values.birthDay = values.birthDay.$d
        values.avatar = imgState;
        setImgState("")
        signInUser(values)
        cancel()
        form.resetFields();
    };
    const handleChange = (e) => {
        setImgState(e.target.value)
    }
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >
            <Form.Item
                name="avatar"
                label="Avatar"
                rules={[
                ]}
            >
                <img src={imgState ? imgState : ""} alt='anhnen'></img>
                <Input onChange={(e) => {
                    handleChange(e)
                }} />
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
                <Input.Password />
            </Form.Item>

            <Form.Item
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
                <Input.Password />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
                <Button type="" onClick={() => {
                    cancel()
                }}>
                    Cancel
                </Button>
            </Form.Item>
        </Form >
    );
};