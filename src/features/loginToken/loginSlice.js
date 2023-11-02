import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenValues: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk4NzMxMTg4LCJleHAiOjE2OTg4MTc1ODh9.hlLXUdES3dHkFjgZI6L_WpwHokQ7pcAdIIiojGhaW2o",
    token_type: "",
    expires_in: "",
    time: "",
  }
  
};

export const loginSlice = createSlice({
  name: 'logintoken',
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.tokenValues = action.payload;
    }
  }
});

export const selectDatatoken = (state) => state.logintoken.tokenValues; // Corrected selector
export const { updateToken } = loginSlice.actions;
export default loginSlice.reducer;
