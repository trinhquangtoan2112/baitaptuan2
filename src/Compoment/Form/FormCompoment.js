import React, { useEffect, useState } from 'react'
import formStyle from "./FormCompoment.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserApi, getUserDetail } from '../../Redux/Reducers/UserReducer';
import { useNavigate } from 'react-router-dom';
export default function FormCompoment() {
    const numberSelector = useSelector(state => state.UserReducer.allUser);
    const navigator = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        getAllUserApi(dispatch)
    }, [])

    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: "",
        password: ""
    })

    const inputForm = (e) => {
        let { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        })
        setError({
            ...error,
            [name]: ""
        })
    }
    const [type, setType] = useState("password");
    const changeTypePassword = () => {
        if (type === "password") {
            setType("text");
        } else {
            setType("password");
        }
    }
    function showHidePassword1() {
        if (type === "password") {
            return <i className={`${formStyle.eye_on} fa fa-eye`} id='passwordon' onClick={changeTypePassword} />
        }
        else {

            return <i className={`${formStyle.eye_on} fa fa-eye-slash`} id='passwordoff' onClick={changeTypePassword} />
        }
    }

    const submitForm = (e) => {
        e.preventDefault();

        setError({

            email: "",
            password: ""
        })

        const checkEmail = /^(?=.{6,30}$)([^\s@]+@[^\s@]+\.[^\s@]+)$/;
        const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@]).{6,30}$/;
        let flagCheck = true;
        if (!checkEmail.test(input.email)) {
            setError({
                ...error,
                email: "Lỗi email "
            })
            flagCheck = false;
        } else if (!checkPassword.test(input.password)) {
            setError({
                ...error,
                password: "Lỗi password "
            })
            flagCheck = false;
        }


        if (!flagCheck) {
            window.alert("Lỗi")
        } else {

            const loginInformation = numberSelector?.find(item => item.email === input.email && item.password === input.password);
            if (loginInformation) {
                getUserDetail(dispatch, loginInformation);
                localStorage.setItem("userDetail", JSON.stringify(loginInformation));
                navigator("/")
            } else {
                setError({
                    ...error,
                    password: "password nhập sai "
                })
            }
        }

    }

    return (
        <form className={`form_container ${formStyle.form_container} `} onSubmit={submitForm}>

            <h1>CRUD OPERATIONS</h1>


            <h4>SIGN IN</h4>
            <p>Enter your credentials to access your account</p>

            <div className={` ${formStyle.form_input}  ${formStyle.form_email}`}>
                <p>Email</p>
                <input className={`email ${formStyle.email1} `} type='text' placeholder='Enter Email' name='email' onChange={inputForm}></input>
                <p className={` ${formStyle.errorMessage} erroremail`}>{error.email}</p>
            </div>
            <div className={` ${formStyle.form_input}  ${formStyle.form_password}`}>
                <p>Password</p>
                <div className={`${formStyle.input_password}`}>
                    <input className={`password ${formStyle.password1} `} type={type} placeholder='Enter Password' id='password' name='password' onChange={inputForm}></input>

                    <div className={`password ${formStyle.password2} `}>
                        {showHidePassword1()}
                    </div>

                </div>
                <p className={` ${formStyle.errorMessage} errorpassword`}>{error.password}</p>
            </div>
            <button className={`btn_signIn ${formStyle.btn_signIn1} `}>SIGN IN</button>
            <p>Forgot your password? <span><a>Reset Password</a></span></p>
        </form>
    )
}
