import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

import authReducer from "@/app/redux/features/auth-slice";
import teamReducer from "@/app/redux/features/team-slice";
import snippetReducer from "@/app/redux/features/snippet-slice";
import { authApi } from "./api/authAPI";
import { teamApi } from "./api/teamAPI";
import { snippetApi } from "./api/snippetAPI";

export const store = configureStore({
  reducer: {
    authReducer,
    teamReducer,
    snippetReducer,
    [authApi.reducerPath]: authApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [snippetApi.reducerPath]: snippetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(teamApi.middleware)
      .concat(snippetApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
// export const useAppSelector:TypedUseSelectorHook<RootState>  = useSelector;
