import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",  // Fixed here
  firstName: "",
  lastName: "",
  email: "",
  image: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload.data);
      state._id = action.payload.data._id; // Fixed here
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.email = action.payload.data.email;
      state.image = action.payload.data.image;
    },
    logoutRedux: (state) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;
