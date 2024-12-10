import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: true, error: null, categories: [] },
  reducers: {
    loaduser: (state, action) => {
      state.user = action.payload;
    },
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    loadCategory:(state,action)=>{
      state.categories = action.payload;
    },
    removeCategory:(state , action)=>{
      state.categories = state.categories.filter(
        (category) =>category.id !== action.payload
      )
    }
  },
});
export const { loaduser, setloading, addCategory, loadCategory , removeCategory } = userSlice.actions;
export default userSlice.reducer;
