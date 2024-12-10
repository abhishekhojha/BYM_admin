import axios from "axios";

const baseURL = "https://builds-backend-4yc1.onrender.com/";
const Axios = axios.create({
    baseURL:`https://builds-backend-4yc1.onrender.com/`,
    headers:{
        "Content-Type":"application/json"
    }
})

const makeRequest = async (endpoint, method = 'GET', data = {}) => {
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


export default {Axios,makeRequest};
