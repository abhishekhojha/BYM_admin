import React, { useState } from 'react'
import Logo from "../../public/Logo2.png"
const ExamForm = () => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const handleSubmit = () => {
      alert(`You selected: ${selectedOption}`);
    };
  
    return (
      <div className="h-screen w-full bg-white flex flex-col items-center justify-center md:flex-row">
        <div className="w-full md:w-1/2 h-screen bg-white rounded-lg  mx-4 ">
          <div className="mb-8 flex flex-col justify-start">
            <img
              src={Logo}
              alt="Logo"
              className="w-28 mb-4 mx-auto md:mx-0 mt-12"
            />
            <h2 className="text-3xl font-semibold text-gray-800 text-center md:text-left mb-4 ">
              Java Data Types
            </h2>
            <p className="text-gray-600 text-2xl text-center md:text-left">
              As explained in the previous chapter, a variable in Java must be a
              specified data type:
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-[90vh] max-w-6xl bg-gray-100 shadow-lg rounded-lg p-8 md:p-12 mx-4 flex flex-col justify-between">
          {/* Header Section */}
         
  
          {/* Question Section */}
          <div className="mb-8 flex flex-col gap-4">
            <h3 className="text-3xl font-medium text-gray-800 mb-4">
              Which of the following statements is/are TRUE regarding JAVA?
            </h3>
            <p className="text-xl text-gray-700 mb-6">
              (a) Constants that cannot be changed are declared using the 'static'
              keyword.
              <br />
              (b) A class can only inherit one class but can implement multiple
              interfaces.
            </p>
            <form className="space-y-4">
              <label className="flex items-center space-x-3 bg-white  px-4 py-1 rounded">
                <input
                  type="radio"
                  name="option"
                  value="Only (a) is TRUE."
                  checked={selectedOption === 'Only (a) is TRUE.'}
                  onChange={handleOptionChange}
                  className="h-4 w-4 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-l">Only (a) is TRUE.</span>
              </label>
              <label className="flex items-center space-x-3 bg-white  px-4 py-1 rounded">
                <input
                  type="radio"
                  name="option"
                  value="Only (b) is TRUE."
                  checked={selectedOption === 'Only (b) is TRUE.'}
                  onChange={handleOptionChange}
                  className="h-4 w-4 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-l">Only (b) is TRUE.</span>
              </label>
              <label className="flex items-center space-x-3 bg-white  px-4 py-1 rounded">
                <input
                  type="radio"
                  name="option"
                  value="Both (a) and (b) are TRUE."
                  checked={selectedOption === 'Both (a) and (b) are TRUE.'}
                  onChange={handleOptionChange}
                  className="h-4 w-4 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-l">Both (a) and (b) are TRUE.</span>
              </label>
              <label className="flex items-center space-x-3 bg-white  px-4 py-1 rounded">
                <input
                  type="radio"
                  name="option"
                  value="Neither (a) nor (b) are TRUE."
                  checked={selectedOption === 'Neither (a) nor (b) are TRUE.'}
                  onChange={handleOptionChange}
                  className="h-4 w-4 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-l">
                  Neither (a) nor (b) are TRUE.
                </span>
              </label>
            </form>
          </div>
  
          {/* Button Section */}
          <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
          <button
              className="w-full md:w-auto bg-red-600 text-white py-2 px-8 rounded hover:bg-red-700 focus:ring focus:ring-red-300 text-center"
            >
              Exit
            </button>
            <button
              onClick={handleSubmit}
              className="w-full md:w-auto bg-blue-600 text-white py-2 px-8 rounded hover:bg-blue-700 focus:ring focus:ring-blue-300 text-center"
            >
              Next
            </button>
            
          </div>
        </div>
      </div>
    );
  };
  

export default ExamForm
