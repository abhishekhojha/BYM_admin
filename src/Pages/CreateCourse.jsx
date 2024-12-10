import axios from "axios";
import React, { useState, useEffect } from "react";
import { FiImage } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom";
import ApiServices from "../Axios";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]); // To store teachers' ids
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    teachers: [],
    students: [],
    seo: {
      title: "",
      description: "",
      keywords: "",
    },
    categoriesIds: [],
    active: true,
    duration: "",
    price: {
      normalPrice: 0,
      salePrice: 0,
      currency: "IN",
      isFree: false,
    },
    instructors: [
      {
        name: "",
        email: "",
        socialLinks: [{ title: "", url: "" }],
        description: "",
        imgUrl: "",
      },
    ],
    videos: [{ name: "", description: "", url: "" }],
    imgUrl: "",
    module: { total: 1, completed: 0 },
    streamUrl: "",
  });

  useEffect(() => {
    ApiServices.Axios.get("/categories") // Fetch categories for the dropdown
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, index, field) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedInstructors = [...prevState.instructors];
      updatedInstructors[index] = {
        ...updatedInstructors[index],
        [field]: { ...updatedInstructors[index][field], [name]: value },
      };
      return { ...prevState, instructors: updatedInstructors };
    });
  };

  const handleFileChange = (e, field) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [field]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate that necessary fields are filled
    if (!formData.title || !formData.description || !formData.duration) {
      alert("Please fill in all required fields");
      setLoading(false);
      return;
    }

    const course = { ...formData };

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await ApiServices.makeRequest("courses", "POST", course, config);

      setFormData({
        title: "",
        description: "",
        teachers: [],
        students: [],
        seo: {
          title: "",
          description: "",
          keywords: "",
        },
        categoriesIds: [],
        active: true,
        duration: "",
        price: {
          normalPrice: 0,
          salePrice: 0,
          currency: "IN",
          isFree: false,
        },
        instructors: [{ name: "", email: "", socialLinks: [{ title: "", url: "" }], description: "", imgUrl: "" }],
        videos: [{ name: "", description: "", url: "" }],
        imgUrl: "",
        module: { total: 1, completed: 0 },
        streamUrl: "",
      });

      alert(data.message);
      setLoading(false);
      navigate("/courses"); // Optionally, redirect after course creation
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Create New Course</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Course Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter Course Title"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Course Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter course description"
            required
          />
        </div>

        {/* Categories Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-2">Categories</label>
          <select
            name="categoriesIds"
            multiple
            value={formData.categoriesIds}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Duration Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. 3 months"
            required
          />
        </div>

        {/* Price Fields */}
        <div>
          <label className="block text-sm font-medium mb-2">Normal Price</label>
          <input
            type="number"
            name="normalPrice"
            value={formData.price.normalPrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Course Image <FiImage className="inline-block ml-2" />
          </label>
          <input
            type="file"
            name="imgUrl"
            onChange={(e) => handleFileChange(e, "imgUrl")}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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
            Create Course
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateCourse;
