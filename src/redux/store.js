import { configureStore } from "@reduxjs/toolkit";
import todoCommonReducer from './todoSlice'
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, todoCommonReducer)
const store = configureStore ({
    reducer: persistedReducer,
})

const Persistor = persistStore(store)
export {Persistor}
export default store;