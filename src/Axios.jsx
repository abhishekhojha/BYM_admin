import axios from "axios";

const baseURL = "http://localhost:4000";
const Axios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const makeRequest = async (endpoint, method = "GET", data = {}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token is missing");
    return;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // console.log(`Making request to ${baseURL}${endpoint}`);
    const response = await axios({
      method,
      url: `${baseURL}${endpoint}`,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error(`Error with request to ${endpoint}:`, error);
    throw error;
  }
};

export default { Axios, makeRequest };
