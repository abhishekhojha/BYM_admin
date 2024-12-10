import React, { useEffect, useState } from "react";
import Edit from "../../public/edit.png";
import Trash from "../../public/trash.png";
import { Link } from "react-router-dom";
import ApiServices from "../Axios";
import { useDispatch, useSelector } from "react-redux";
import { removeCategoryAction } from "../redux/userAction";
import InnerLoader from "../Components/InnerLoader";

const Course = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  // const dispatch = useDispatch();

  const getCourses = async () => {
    setLoading(true);
    try {
      const { data } = await ApiServices.Axios.get("/course/courses"); // Adjusted endpoint
      console.log(data);
      setCourses(data);
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
        getCourses(); // Refresh courses after deletion
      } catch (error) {
        console.error("Error deleting course: ", error.message);
        alert("There was an error deleting the course.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  if (loading) return <InnerLoader />;

  return (
    <main className="h-full pb-16 overflow-y-auto">
      <div className="container grid px-6 mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Courses
          </h2>
          <Link to="/createCourse">
            <button className="bg-[#7e3af2] text-white px-4 py-2 rounded-md">
              + Create Course
            </button>
          </Link>
        </div>

        {/* Table */}
        <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          Courses List
        </h4>

        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Teachers</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {courses.map((course) => {
                  console.log(course._id);
                  
                  return (
                    <tr
                      key={course._id}
                      className="text-gray-700 dark:text-gray-400"
                    >
                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {course.title}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-sm max-w-xs break-words truncate">
                        {course.description}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {course.teachers.map((teacher) => (
                          <span key={teacher._id} className="block">
                            {teacher.name}
                          </span>
                        ))}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {course.price.normalPrice}
                      </td>
                      <td className="px-4 py-3 text-xs flex gap-2">
                        <Link to={`/editCourse/${course._id}`}>
                          <button>
                            <img src={Edit} alt="edit" />
                          </button>
                        </Link>
                        <button onClick={() => handleRemove(course._id)}>
                          <img src={Trash} alt="trash" />
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

export default Course;
