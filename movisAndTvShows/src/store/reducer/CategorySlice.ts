import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  category: string;
}

const initialState: CategoryState = {
  category: "movie",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
  },
});

export const { changeCategory } = categorySlice.actions;

export default categorySlice.reducer;