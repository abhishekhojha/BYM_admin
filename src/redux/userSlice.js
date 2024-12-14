import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: true,
    pageloading: true,
    error: null,
    blogs: null,
    categories: [],
  },
  reducers: {
    loaduser: (state, action) => {
      state.user = action.payload;
    },
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    setpageloading: (state, action) => {
      state.pageloading = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    loadCategory: (state, action) => {
      state.categories = action.payload;
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    loadblogs: (state, action) => {
      state.blogs = action.payload;
    },
    removeblog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
    },
  },
});
export const {
  loaduser,
  setloading,
  addCategory,
  loadCategory,
  removeCategory,
  loadblogs,
  removeblog,
  setpageloading,
} = userSlice.actions;
export default userSlice.reducer;
