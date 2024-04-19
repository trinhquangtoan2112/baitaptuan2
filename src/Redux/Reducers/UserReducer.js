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
            state.allUser = action.payload;
        },
        getUserDetailApiAction: (state, action) => {
            state.userDetail = action.payload;
            if (state.userDetail) {
                window.alert("Đăng nhập thành công")
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


export const signInUser = async (data) => {
    console.log(data, "data")
    try {
        const result = await axios({
            url: DOMAIN,
            method: 'POST',
            data: data
        });
        if (result.status === 201 || result.status === 202) {
            await message.success("Them thanh cong");
            window.location.reload();
        } else {
            message.error("Không thành công");
        }

    } catch (error) {
        console.log(error)
    }
}


export const deleteUser = async (id) => {

    try {
        const result = await axios({
            url: `${DOMAIN}/${id}`,
            method: 'Delete',

        });
        if (result.status === 200) {
            await message.success("Xóa thành công");
            window.location.reload();
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