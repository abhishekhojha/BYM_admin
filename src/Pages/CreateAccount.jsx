import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../Components/Toast";
import axios from "axios";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
    agreeToPolicy: false,
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const clickme = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password || !formData.name) {
      notify("Please fill in all fields");
      return;
    }

    if (!formData.agreeToPolicy) {
      alert("Please agree to the privacy policy");
      return;
    }
    const user = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      role: "student",
    };

    try {
      const { data } = await axios.post(
        "https://builds-backend-wc2e.onrender.com/auth/send-otp",
        user
      );
      alert(data.message);
      if (data) {
        setShowOTP(true); // Show OTP input after successful OTP send
      }
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert("Please enter OTP");
      return;
    }
    try {
      const { data } = await axios.post(
        "https://builds-backend-wc2e.onrender.com/auth/verify-otp",
        { email: formData.email, otp }
      );
      console.log(data);

      alert("OTP verified successfully!");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert(error.message || "OTP verification failed");
    }
  };
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    if (isAuthenticated) {
      navigate("/");
      return undefined;
    }
  });
  return (
    <div className={`${darkMode ? "theme-dark" : ""}`}>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col md:min-w-[700px] max-w-[800px] overflow-y-auto md:flex-row">
            {/* Image Section */}
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src="https://windmill-dashboard.vercel.app/assets/img/create-account-office.jpeg"
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src="https://windmill-dashboard.vercel.app/assets/img/create-account-office.jpeg"
                alt="Office"
              />
            </div>

            {/* Form Section */}
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                {!showOTP ? (
                  <>
                    <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                      Create account
                    </h1>

                    {/* Email Input */}
                    <label className="block text-sm">
                      <span className="text-gray-700 dark:text-gray-400">
                        Email
                      </span>
                      <input
                        className="block w-full p-2 mt-1 text-sm border rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Jane Doe"
                        name="email"
                        onChange={handleInputChange}
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="text-gray-700 dark:text-gray-400">
                        Name
                      </span>
                      <input
                        className="block w-full p-2 mt-1 text-sm border rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Jane Doe"
                        name="name"
                        type="text"
                        onChange={handleInputChange}
                      />
                    </label>
                    {/* Password Input */}
                    <label className="block mt-4 text-sm">
                      <span className="text-gray-700 dark:text-gray-400">
                        Password
                      </span>
                      <input
                        className="block w-full p-2 mt-1 text-sm border rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="***************"
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                      />
                    </label>

                    {/* Privacy Policy Checkbox */}
                    <div className="flex mt-6 text-sm">
                      <label className="flex items-center dark:text-gray-400">
                        <input
                          type="checkbox"
                          onChange={handleInputChange}
                          name="agreeToPolicy"
                          className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                        />
                        <span className="ml-2">
                          I agree to the &nbsp;
                          <span className="underline">privacy policy</span>
                        </span>
                      </label>
                    </div>

                    {/* Create Account Button */}
                    <button
                      className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-[#7e3af2] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                      onClick={clickme}
                    >
                      Create account
                    </button>

                    <hr className="my-8" />

                    <p className="mt-4">
                      <Link
                        className="text-sm font-medium text-[#7e3af2] dark:text-purple-400 hover:underline"
                        to="/login"
                      >
                        Already have an account? Login
                      </Link>
                    </p>
                  </>
                ) : (
                  <div>
                    <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                      Verify OTP
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Please enter the OTP sent to your email {formData.email}
                    </p>

                    <label className="block text-sm">
                      <span className="text-gray-700 dark:text-gray-400">
                        OTP
                      </span>
                      <input
                        className="block w-full p-2 mt-1 text-sm border rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        type="number"
                      />
                    </label>

                    <button
                      className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-[#7e3af2] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                      onClick={handleOTPSubmit}
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon Components

export default CreateAccount;
