"use client";
import React from "react";

const Navbar = () => {
  return (
    <nav
      className="flex justify-between items-center text-black py-3"
    >
      <div className="flex">
        <h1 className="text-5xl font-bold mr-1">25</h1>
        <div className="flex flex-col">
          <span className="leading-[1.5]">Tuesday</span>
          <span className="leading-[1.2]">dex 2028</span>
        </div>
      </div>
      <div>
        <button className="flex text-md font-semibold">
          <svg
            className="mr-2"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="11" fill="#E13EEB" />
            <rect x="6" y="10" width="10" height="2" fill="white" />
            <rect
              x="12"
              y="6"
              width="10"
              height="2"
              transform="rotate(90 12 6)"
              fill="white"
            />
          </svg>
          NEW TASK
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
