import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const Useremail = localStorage.getItem("Email");
  if(!Useremail) navigate("/login");
  return (
    <nav className="w-full bg-blue-500 text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
        <p className="text-lg sm:text-xl font-bold">Finance</p>
        <button className="text-sm sm:text-base bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-100" onClick={()=>{
          localStorage.removeItem("Email");
          navigate("/login");
          }}
          >
          {Useremail ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
