import { configureStore } from '@reduxjs/toolkit'
import statusLoginSlice from "./statusLoginSlice";

const store = configureStore({
    reducer: {statusLogin : statusLoginSlice.reducer}
});

export default store;