import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "./features/authSlice";
import { authAPI } from "./api/authApi";
import { candidateAPI } from "./api/candidateApi";
import { usersAPI } from "./api/userApi";
import { recruiterAPI } from "./api/recruiterApi";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage par défaut
import { tasksAPI } from "./api/taskApi";
import { departmentAPI } from "./api/departmentApi";
import { timeoffAPI } from "./api/timeoffApi";

// Combine tous tes reducers
const rootReducer = combineReducers({
  authReducer: persistReducer(
    {
      key: "auth",
      storage,
      whitelist: ["user", "isAuthenticated", "role"],
    },
    authReducer
  ),
  [authAPI.reducerPath]: authAPI.reducer,
  [candidateAPI.reducerPath]: candidateAPI.reducer,
  [recruiterAPI.reducerPath]: recruiterAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [tasksAPI.reducerPath]: tasksAPI.reducer,
  [departmentAPI.reducerPath]: departmentAPI.reducer,
  [timeoffAPI.reducerPath]: timeoffAPI.reducer,
});

// Création du store avec le reducer combiné et persisté
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ⚠️ important pour redux-persist
    }).concat(
      authAPI.middleware,
      candidateAPI.middleware,
      usersAPI.middleware,
      recruiterAPI.middleware,
      tasksAPI.middleware,
      departmentAPI.middleware,
      timeoffAPI.middleware
    ),
});

// Persistor pour PersistGate
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
