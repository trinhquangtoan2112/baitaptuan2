import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { DOMAIN } from '../../utils/config';
import { message } from 'antd';

const initialState = {
    allUser: [

    ],
    userDetail: {

    },
}

const UserReducer = createSlice({
    name: "UserReducer",
    initialState,
    reducers: {
        getAllUserApiAction: (state, action) => {
            console.log(action)
            state.allUser = action.payload;
        },
        getUserDetailApiAction: (state, action) => {
            state.userDetail = action.payload;
            if (state.userDetail) {
                message.success("Đăng nhập thành công")
            }
        }
    }
});

export const { getAllUserApiAction, getUserDetailApiAction } = UserReducer.actions

export default UserReducer.reducer

export const getAllUserApi = async (dispatch) => {

    try {
        const result = await axios({
            url: DOMAIN,
            method: 'GET'
        })
        dispatch(getAllUserApiAction(result.data))
    } catch (error) {
        console.log(error)
    }

}
export const getUserDetail = async (dispatch, data) => {
    dispatch(getUserDetailApiAction(data))
}


export const signInUser = async (data, dispatch) => {

    try {
        const result = await axios({
            url: DOMAIN,
            method: 'POST',
            data: data
        });
        if (result.status === 201 || result.status === 202) {
            getAllUserApi(dispatch)
            await message.success("Them thanh cong");

        } else {
            message.error("Không thành công");
        }

    } catch (error) {
        console.log(error)
    }
}


export const deleteUser = async (id, dispatch) => {

    try {
        const result = await axios({
            url: `${DOMAIN}/${id}`,
            method: 'Delete',

        });
        if (result.status === 200) {
            getAllUserApi(dispatch)

            await message.success("Xóa thành công");

        } else {
            message.error("Không thành công");
        }

    } catch (error) {
        message.error("Không thành công");
        console.log(error)
    }
}

export const getUserApi = async (id) => {
    try {
        const result = await axios({
            url: `${DOMAIN}/${id}`,
            method: 'GET',
        });
        if (result.status === 200) {
            return result.data;
        }
        else {
            message.error("Không thành công");
        }

    } catch (error) {
        message.error("Không thành công");
        console.log(error)
    }
}

export const editUser = async (id, data, dispatch) => {

    try {
        const result = await axios({
            url: `${DOMAIN}/${id}`,
            method: 'PUT',
            data: data
        });
        if (result.status === 200) {
            getAllUserApi(dispatch)
            await message.success("Sửa thành công");

        } else {
            message.error("Không thành công");
        }

        console.log(result)

    } catch (error) {
        message.error("Không thành công");
        console.log(error)
    }
}