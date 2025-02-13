import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to get the category ID from the URL
import ApiServices from "../../Axios";
import InnerLoader from "../../Components/InnerLoader";

const editCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams(); // Get the category ID from the URL
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategory: "",
  });
  console.log(categoryId);
  // Fetch category data when component mounts or categoryId changes
  useEffect(() => {
    ApiServices.Axios.get(`/catagories/${categoryId}`)
      .then((response) => {
        setFormData({
          name: response.data.name,
          description: response.data.description,
          parentCategory: response.data.parentCategory || "",
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });

    // Fetch all categories for parent category options
    ApiServices.Axios.get("/catagories")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categoryId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.name || !formData.description) {
      alert("Please fill in all fields");
      return;
    }

    const categoryData = {
      name: formData.name,
      description: formData.description,
      parentCategory: formData.parentCategory,
    };

    try {
      const data = await ApiServices.makeRequest(
        `catagories/${categoryId}`,
        "PUT",
        categoryData
      );
      console.log(data);
      alert(data.message);
      setLoading(false);
    } catch (error) {
      alert(error.response?.data?.message);
      setLoading(false);
    }
  };
  if (loading) return <InnerLoader />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Update Category</h2>

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

          {/* Description Input */}
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
              placeholder="Enter Description"
              required
            />
          </div>

          {/* Parent Category Select */}
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
            Update Category
          </button>
        )}
      </form>
    </div>
  );
};

export default editCategory;
