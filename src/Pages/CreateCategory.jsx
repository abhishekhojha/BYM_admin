import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiImage } from "react-icons/fi"; // You'll need to install react-icons
import { useNavigate } from "react-router-dom";
import ApiServices from "../Axios";
const CreateCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategory: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    ApiServices.Axios.get("/catagories")
      .then((response) => {
        console.log(response.data);

        setCategory(response.data); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.name || !formData.description) {
      alert("Please fill in all fields");
      return;
    }
    const category = {
      name: formData.name,
      description: formData.description,
      parentCategory: formData.parentCategory,
    };
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // const { data } = await axios.post(
      //   "https://builds-backend-wc2e.onrender.com/catagories",
      //   category,
      //   config
      // );
      const data = await ApiServices.makeRequest("catagories","POST",category)
      setFormData({
        name: "",
        description: "",
        parentCategory: "",
      });
      e.target.reset();
      alert(data.message);
      setLoading(false);
    } catch (error) {
      alert(error.response?.data?.message);
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };
  useEffect(() => {
    return () => {
      const getToken = localStorage.getItem("token");
      if (getToken) {
      }
    };
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Create New Category post</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Category Name"
              required
            />
          </div>

          {/* Slug Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="enter-description-here"
              required
            />
          </div>
          {/* <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">
              Parent Category
            </span>
            <select
              className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray px-4 py-4 rounded-lg"
              value={formData.parentCategory}
              onChange={handleChange}
              name="parentCategory"
            >
              <option value="">Select a category</option>
              {category.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label> */}
        </div>

        {/* Submit Button */}
        {loading ? (
          <button
            type="button"
            className="w-full bg-[#7e3af2] text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Please Wait....
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-[#7e3af2] text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Create Category Post
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateCategory;
