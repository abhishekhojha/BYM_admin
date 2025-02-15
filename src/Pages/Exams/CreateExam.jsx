import axios from "axios";
import React, { useState, useEffect } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ApiServices from "../../Axios";

// Exam model in backend

// const questionSchema = new mongoose.Schema({
//   questionText: { type: String, required: true },
//   options: [{ type: String, required: true }], // Multiple-choice options
//   correctAnswer: { type: String, required: true }, // For grading
// });

// const examSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   startTime: { type: Date, required: true },
//   endTime: { type: Date, required: true },
//   participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Only selected participants can attempt
//   questions: [questionSchema], // List of questions in the exam
// });

const CreateExam = () => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]); // To store participants' ids
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    participants: [],
    questions: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate that necessary fields are filled
    if (!formData.title || !formData.description) {
      alert("Please fill in all required fields");
      setLoading(false);
      return;
    }

    const Exam = { ...formData };

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // const data = await ApiServices.makeRequest("Exams", "POST", Exam, config);

      setFormData({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        participants: [],
        questions: [],
      });

      alert(data.message);
      setLoading(false);
      navigate("/exams"); // Optionally, redirect after Exam creation
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Create New Exam</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Exam Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter Exam Title"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Exam Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter Exam description"
            required
          />
        </div>

        {/* Start Time Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Start Time</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* End Time Input */}
        <div>
          <label className="block text-sm font-medium mb-2">End Time</label>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Participants Input */}

        {/* Questions Input */}
        


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
            Create Exam
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateExam;
