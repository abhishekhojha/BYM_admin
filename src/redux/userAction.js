// import { data } from "autoprefixer";
import { loaduser, setloading, addCategory, removeCategory } from "./userSlice";
import ApiServices from "../Axios";

export const asyncLoadUser = () => async (dispatch) => {
  try {
    dispatch(setloading(true));
    const token = localStorage.getItem("token");
    console.log(token);
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
    console.log(data);

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
    const { data } = await Axios.get("/catagories", config);

    dispatch(addCategory(data));
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
