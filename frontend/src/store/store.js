import {configureStore} from "@reduxjs/toolkit";
import {baseApi} from "./api/base.api";

export const store = configureStore({
    reducer: {[baseApi.reducerPath]: baseApi.reducer},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false}).concat(
            baseApi.middleware
        ),
});
