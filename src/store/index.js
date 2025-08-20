import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import companyReducer from "./slices/companySlice";
import branchReducer from "./slices/branchSlice";
import employeeReducer from "./slices/employeeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    companies: companyReducer,
    branches: branchReducer,
    employees: employeeReducer,
  },
});

export default store;
