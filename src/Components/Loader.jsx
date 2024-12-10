import React from "react";
import Logo from "../assets/Logo.png";
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <img src={Logo} alt="" className="w-[150px]"/>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
