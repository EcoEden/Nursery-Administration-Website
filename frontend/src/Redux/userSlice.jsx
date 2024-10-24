import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    email: "",
    firstName:" ",
    image:" ",
    lastName:"",
    __id:" ",
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginRedux: (state,action)=>{
            console.log(action.payload.data)
            state.__id= action.payload.data.__id
            state.firstName= action.payload.data.firstName
            state.lastName= action.payload.data.lastName
            state.email= action.payload.data.email
            state.image= action.payload.data.image
        },
        logoutRedux:(state)=>{
            state.__id= "";
            state.firstName= "";
            state.lastName= "";
            state.email= "";
            state.image= "";
        },
        
    },
})
 export const {loginRedux,logoutRedux} =userSlice.actions
export default userSlice.reducer