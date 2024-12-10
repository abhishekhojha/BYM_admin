import React from "react";
import Logo from "../assets/Logo.png";
const InnerLoader = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-76px)] flex-col">
      <img src={Logo} alt="" className="w-[150px]"/>
      <div className="loader"></div>
    </div>
  );
};

export default InnerLoader;
