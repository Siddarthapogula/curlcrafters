import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "userInfo",
    initialState : {
        isLogged : false,
        token : null,
        userInfo : null,
    },
    reducers : {          
         adduser: (state) => {
             state.isLogged = !state.isLogged;
            },
        addUserToken: (state, action) => {
                state.token = action.payload;
            },
        addUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        removeUserToken : (state, action) =>{
            state.token = null;
        },
        removeUserInfo : (state, action)=>{
            state.userInfo = null;
        }
    }
})

export const {adduser, addUserInfo, addUserToken, removeUserId, removeUserInfo, removeUserToken} = userSlice.actions;
export default userSlice.reducer;