import React from "react";

const navbar = () => {
  return (
    <div className="absolute w-full h-14 flex items-cente justify-between shadow-md shadow-slate-700/5 border-slate-700/20 z-50 bg-white">
      <div className="px-4 py-2 h-full flex justify-center items-center">Sales Flow</div>
      <div className="px-4 py-2 h-full flex justify-center items-center text-xs space-x-3">
        <div className="flex space-x-1">
            <span className="bg-green-400 p-2 rounded-full"></span>
            <span>Online</span>
        </div>
        <span>Shehanth</span>
      </div>
    </div>
  );
};

export default navbar;
