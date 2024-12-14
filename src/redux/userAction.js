// import { data } from "autoprefixer";
import {
  loaduser,
  setloading,
  addCategory,
  removeCategory,
  loadblogs,
  loadCategory,
  removeblog,
  setpageloading,
} from "./userSlice";
import ApiServices from "../Axios";

export const asyncLoadUser = () => async (dispatch) => {
  try {
    dispatch(setloading(true));
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(setloading(false));
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ApiServices.Axios.get("/me", config);

    dispatch(loaduser(data));
    dispatch(setloading(false));
  } catch (err) {
    console.log(err.response.data.message == "Invalid or expired token");
    if (err.response.data.message == "Invalid or expired token")
      localStorage.removeItem("token");

    dispatch(setloading(false));
  }
};
export const asyncLoadCategory = () => async (dispatch) => {
  try {
    dispatch(setloading(true));
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(setloading(false));
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ApiServices.Axios.get("/catagories", config);

    dispatch(loadCategory(data));
    dispatch(setloading(false));
  } catch (err) {
    console.log(err);
    dispatch(setloading(false));
  }
};
export const removeCategoryAction = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const data = await Axios.delete(`/catagories/${id}`, config);
    console.log(data);

    // dispatch(removeCategory({id}))
  } catch (error) {
    alert("failed to delete category", error.message);
  }
};
export const addCategoryAction = () => () => {
  try {
    dispatch(setloading(true));
  } catch (error) {}
};

// Blog CRUD
export const asyncCreateBlog = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await ApiServices.Axios.post("/blogRoutes", data, config);
    dispatch(asyncLoadBlogs());
  } catch (error) {
    console.log(error);
  }
};

export const asyncLoadBlogs = () => async (dispatch) => {
  try {
    dispatch(setpageloading(true));
    const { data } = await ApiServices.Axios.get("/blogRoutes");
    dispatch(loadblogs(data));
    dispatch(setpageloading(false));
  } catch (err) {
    console.log(err);
    dispatch(setpageloading(false));
  }
};

export const asyncEditBlog = (id, data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await ApiServices.Axios.put(`/blogRoutes/${id}`, data, config);
    dispatch(asyncLoadBlogs());
  } catch (err) {
    console.log(err);
  }
}

export const asyncRemoveBlog = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch(removeblog(id));
    const { data } = await ApiServices.Axios.delete(
      `/blogRoutes/${id}`,
      config
    );
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
