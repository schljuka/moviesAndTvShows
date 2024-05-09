import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./reducer/CategorySlice"; 

const rootReducer = combineReducers({
  category: categoryReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;