import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../Axios";

function Login() {
  const navigate = useNavigate();
  const [loging, setLoging] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoging(true);
    setError(""); // Clear any previous errors
    try {
      const { data } = await Axios.Axios.post("/auth/login", credentials);
      // console.log(data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      setLoging(false);
      // console.error("Failed to login:", error);
      setError(
        error.response.data.message || "Failed to login. Please try again."
      );
    }
  };
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    if (isAuthenticated) {
      navigate("/");
    }
  });
  const isAuthenticated = localStorage.getItem("token");
  if (isAuthenticated) {
    navigate("/");
    return <></>;
  }
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-fit w-full max-w-4xl mx-auto  overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col md:min-w-[700px] max-w-[800px] overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="https://windmill-dashboard.vercel.app/assets/img/login-office.jpeg"
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="https://windmill-dashboard.vercel.app/assets/img/login-office.jpeg"
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <form onSubmit={handleSubmit}>
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Email
                  </span>
                  <input
                    className="block w-full mt-1 p-2 text-sm border rounded-lg border-gray-300  dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="jane@example.com"
                    name="email"
                    type="email"
                    value={credentials.email}
                    onChange={handleChange}
                  />
                </label>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Password
                  </span>
                  <input
                    className="block w-full mt-1 border rounded-lg border-gray-300  p-2 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="***************"
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                </label>
                {error && (
                  <div className="mt-4 text-sm text-red-600 dark:text-red-400">
                    {error}
                  </div>
                )}
                {loging ? (
                  <button
                    type="button"
                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  >
                    Please wait...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  >
                    Log in
                  </button>
                )}
              </form>
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-[#7e3af2] dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <hr className="my-8" />
              <div className="mt-1">
                <Link
                  to="/create-account"
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
