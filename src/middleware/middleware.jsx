import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const withAuthMiddleware = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("token");
    console.log(isAuthenticated)
    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
        return null;
      }
    });

    return <WrappedComponent {...props} />;
  };
};

export default withAuthMiddleware;
