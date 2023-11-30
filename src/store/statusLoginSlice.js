import { createSlice } from "@reduxjs/toolkit";

const statusLoginSlice = createSlice({
    name: 'statusLogin',
    initialState: {
        isLogin: false,
        role: '',
        name: ''
    },
    reducers: {
        login(state, action) {
            const data = action.payload
            state.isLogin = true
            state.role = data.role.role_name
            state.name = data.name
        },
        logout(state) {
            state.isLogin = false
            state.role = ''
            state.name = ''
        }
    }
})

export const statusLoginActions = statusLoginSlice.actions;

export default statusLoginSlice;
