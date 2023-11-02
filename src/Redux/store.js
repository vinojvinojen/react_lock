import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginToken/loginSlice";

export const store=configureStore({
    reducer:{
        logintoken:loginReducer,
        
    }
})