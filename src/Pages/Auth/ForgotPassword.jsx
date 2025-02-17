import { Link } from "react-router-dom";
import BG from "../../../public/fgbg.jpg";
import { useState } from "react";
import Axios from "../../Axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const RecoverPassword = async () => {
    if (!email) {
      alert("Please enter your email");

      return 0;
    } // Add validation here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
      alert("Please enter a valid email");
      return 0;
    }
    setLoading(true);
    const { data } = await Axios.Axios.post("/users", { email: email });
    setLoading(false);
    if (data === null) {
      alert("User not found");
      return 0;
    }
    if (data.error) {
      alert(data.error);
      return 0;
    }
    setUser(data);
    return 0;
  };
  const VerifyOTP = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return 0;
    }
    // setLoading(true);
    // const { data } = await Axios.Axios.post("/users/verify", {
    //   email: user.email,
    //   otp,
    // });
    // setLoading(false);
    // if (data === null) {
    //   alert("Invalid OTP");
    //   return 0;
    // }
    // if (data.error) {
    //   alert(data.error);
    //   return 0;
    // }
    // alert("OTP Verified");
    return 0;
  }
        // const { data } = await Axios.Axios.post("/auth/login", credentials);
  
  if (user) {
    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-[70vh] max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:min-w-1/2">
              <img
                aria-hidden="true"
                className="object-cover md:h-[70vh] w-full h-full dark:hidden"
                src={BG}
                alt="Office"
              />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:min-w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  OTP Sent
                </h1>
                <label className="block text-sm">
                  {user && (
                    <p className="text-gray-700 dark:text-gray-400 mb-4">
                      OTP has been sent to your <br />{" "}
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {user.email}
                      </span>
                    </p>
                  )}
                  <input
                    className="block w-full mt-1 text-sm px-2 py-2 border dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input rounded-lg"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </label>

                <button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                onClick={VerifyOTP}
                >
                  Verify OTP
                </button>
                <div className="mt-2">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Remembered Password? LogIn
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-[70vh] max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:min-w-1/2">
            <img
              aria-hidden="true"
              className="object-cover md:h-[70vh] w-full h-full dark:hidden"
              src={BG}
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:min-w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Forgot password
              </h1>
              <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">Email</span>
                <input
                  className="block w-full mt-1 text-sm px-2 py-2 border dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input rounded-lg"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <button
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                onClick={RecoverPassword}
              >
                {loading?"Please wait...":"Recover password"}
              </button>
              <div className="mt-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Remembered Password? LogIn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
