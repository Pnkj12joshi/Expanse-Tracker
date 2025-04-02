import React from 'react'
import Balence from './Balence';
import { IoIosLogOut } from "react-icons/io";

const SideBar = () => {
  return (
    <>
      <div className="w-20 h-[690px]  px-5 py-4 hidden flex-col md:flex gap-5 justify-between shadow-lg">
        <div className="flex justify-center items-center text-3xl text-blue-500 font-bold  px-py-2 rounded-xl cursor-pointer shadow-lg">
          P
        </div>
        <div className="flex justify-center items-center text-3xl text-blue-500 font-bold  px-py-2 rounded-xl cursor-pointer shadow-lg">
          <IoIosLogOut />
        </div>
      </div>
    </>
  );
}

export default SideBar
