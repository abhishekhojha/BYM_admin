import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices from "../../Axios";
import { useDispatch, useSelector } from "react-redux";
import InnerLoader from "../../Components/InnerLoader";

const Exams = () => {
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);
  // const dispatch = useDispatch();

  const getExams = async () => {
    setLoading(true);
    try {
      const { data } = await ApiServices.Axios.get("/exam"); // Adjusted endpoint
      console.log(data);
      setExams(data);
    } catch (error) {
      console.error("Error fetching courses: ", error.message);
      alert("There was an error fetching the courses.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setLoading(true);
      try {
        const { data } = await ApiServices.makeRequest(
          `courses/${id}`,
          "DELETE"
        );
        alert(data.message);
        getExams(); // Refresh courses after deletion
      } catch (error) {
        console.error("Error deleting course: ", error.message);
        alert("There was an error deleting the course.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  if (loading) return <InnerLoader />;

  return (
    <main className="h-full pb-16 overflow-y-auto">
      <div className="container grid px-6 mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Exams
          </h2>
          <Link to="/createExam">
            <button className="bg-[#7e3af2] text-white px-4 py-2 rounded-md">
              + Create Exam
            </button>
          </Link>
        </div>

        {/* Table */}
        <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          Exams List
        </h4>

        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Participants</th>
                  <th className="px-4 py-3">Questions</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {exams.map((exam) => {
                  console.log(exam._id);

                  return (
                    <tr
                      key={exam._id}
                      className="text-gray-700 dark:text-gray-400"
                    >
                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {exam.title}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-sm max-w-xs break-words truncate">
                        {exam.description}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {exam.participants.map((participant) => (
                          <span key={participant._id} className="block">
                            {participant.name}
                          </span>
                        ))}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {exam.questions.length}
                      </td>
                      <td className="px-4 py-3 text-xs flex gap-2">
                        <Link to={`/editexam/${exam._id}`}>
                          <button>
                            <img src="edit.png" alt="edit" />
                          </button>
                        </Link>
                        <button onClick={() => handleRemove(exam._id)}>
                          <img src="trash.png" alt="trash" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span className="flex items-center col-span-3">
              Showing 21-30 of 100
            </span>
            <span className="col-span-2"></span>
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  {/* Pagination buttons */}
                </ul>
              </nav>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Exams;
