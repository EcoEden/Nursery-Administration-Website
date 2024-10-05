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
            state.lastName= action.payload.data.
            state.email= action.payload.data.
            state.image= action.payload.data.image




        }
    }
})
 export const {loginRedux} =userSlice.actions
export default userSlice.reducer