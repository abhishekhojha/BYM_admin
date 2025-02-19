import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import { notify } from "../../Components/Toast";

const CreateExam = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [ques, setQues] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    participants: [],
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle question input changes
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Handle option changes
  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Add new question
  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        questionText: "",
        options: ["", "", "", ""], // 4 options by default
        correctAnswer: "",
      },
    ]);
  };

  // Remove a question
  const removeQuestion = (index) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.description || ques.length === 0) {
      alert(
        "Please fill in all required fields and add at least one question."
      );
      setLoading(false);
      return;
    }
    var questions = ques.map((question) => {
      const { questionText, options, correctAnswer } = question;
      return {
        questionText,
        options: options.filter((option) => option.trim() !== ""),
        correctAnswer: options[Number(correctAnswer)],
      };
    });
    const examData = { ...formData, questions };

    try {
      const data = await Axios.makeRequest("/exam", "POST", examData);
      console.log(data.message);
      notify("Exam created successfully");
      setFormData({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        participants: [],
        questions: [],
      });
      setQues([]);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Handle search for participants
  const handleSearch = async (e) => {
    const { value } = e.target;
    if (!value) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchInput(value);
      const res = await Axios.makeRequest(`/users/search?q=${value}&limit=5`);
      setSearchResults(res.users);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  // Add participant to exam
  const handleAddParticipant = (participant) => {
    setSearchResults([]);
    setSearchInput("");
    setFormData((prevData) => ({
      ...prevData,
      participants: [...prevData.participants, participant],
    }));
  };

  const handleRemoveParticipant = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      participants: prevData.participants.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    if (formData.participants.length === 0) setModal(false);
  }, [formData]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Create New Exam</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Exam Title</label>
          <input
            type="text"
            placeholder="Enter exam title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Exam Description
          </label>
          <textarea
            name="description"
            placeholder="Enter exam description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Start Time */}
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

        {/* End Time */}
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

        {/* Participants */}
        <div>
          <label className="text-sm font-medium mb-2 flex items-center justify-between">
            <span>Add Participants</span>
            {/* a button for showing all selected students */}
            {formData.participants.length > 0 && (
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setModal(true)}
              >
                View Participants ({formData.participants.length})
              </button>
            )}
          </label>
          <input
            type="text"
            placeholder="Enter participant email address"
            value={searchInput}
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {/* dropdown for showing search result of participants */}
          <div className="w-full bg-white  border-gray-300 ">
            {/* Participants list */}
            {searchResults.map((participant, index) => (
              <div
                className="flex items-center justify-between p-2 border-b border-gray-300"
                key={index}
                onClick={() => handleAddParticipant(participant)}
              >
                <span>{participant.email}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div>
          <label className="block text-sm font-medium mb-2">Questions</label>
          {ques.map((question, qIndex) => (
            <div key={qIndex} className="border p-4 rounded-lg space-y-4">
              <input
                type="text"
                placeholder={`Question ${qIndex + 1}`}
                value={question.questionText}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "questionText", e.target.value)
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              />

              {/* Options */}
              <div className="grid grid-cols-2 gap-4">
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center space-x-2">
                    <span>{String.fromCharCode(65 + oIndex)}.</span>
                    <input
                      type="text"
                      placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Correct Answer Selection */}
              <div>
                <label className="block text-sm font-medium">
                  Correct Answer
                </label>
                <select
                  value={question.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(
                      qIndex,
                      "correctAnswer",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select Correct Answer</option>
                  {question.options.map((_, oIndex) => (
                    <option key={oIndex} value={oIndex}>
                      {String.fromCharCode(65 + oIndex)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Remove Question Button */}
              <button
                type="button"
                className="text-red-500 hover:underline"
                onClick={() => removeQuestion(qIndex)}
              >
                Remove Question
              </button>
            </div>
          ))}

          {/* Add Question Button */}
          <button
            type="button"
            className="mt-4 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100"
            onClick={addQuestion}
          >
            + Add Question
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating Exam..." : "Create Exam"}
        </button>
      </form>
      {modal && (
        <div
          className="relative z-10 "
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          onClick={(e) =>
            e.target.classList.contains("modol") && setModal(false)
          }
        >
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity "
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto top-1/2 transform -translate-y-1/2">
            <div className="flex justify-center p-4 text-center sm:items-center sm:p-0 modol">
              <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg max-h-96 overflow-scroll">
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Participants
                  </h2>
                  <div className="mt-4 space-y-4">
                    {formData.participants.map((participant, index) => (
                      <div className="flex items center justify-between p-2 border-b border-gray-300">
                        <span>{participant.email}</span>
                        <button
                          type="button"
                          className="text-red-500 hover:underline"
                          onClick={() => handleRemoveParticipant(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateExam;
