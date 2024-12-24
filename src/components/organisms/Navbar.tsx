"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null)
  useEffect(() => {
    const userData = Cookies.get('user');
    if (userData) {
      console.log("User data from cookie:", JSON.parse(userData));
      setUser(JSON.parse(userData));
    }

  }, []);
  
  function getCurrentDateInfo() {
    const today = new Date();

    const day = today.getDate(); // Get the day of the month
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[today.getMonth()]; // Get the month name
    const year = today.getFullYear(); // Get the current year
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = dayNames[today.getDay()]; // Get the day name

    return {
      day,
      month,
      year,
      dayName,
    };
  }
  const dateInfo = getCurrentDateInfo();

  const handleLogout = () => {
    Cookies.remove('user');
    router.push("/login");
  }
  return ( 
    <nav className=" container mx-auto flex justify-between items-center text-black py-3 ">
      <div className="flex">
        <h1 className="text-5xl font-bold mr-1">{dateInfo.day}</h1>
        <div className="flex flex-col">
          <span className="leading-[1.5]">{dateInfo.dayName}</span>
          <span className="leading-[1.2]">
            {dateInfo.month} {dateInfo.year}
          </span>
        </div>
      </div>
      {user && user ? (
        <div className="flex items-center">
          <Link href={"/addnewtodo"} className="flex text-md font-semibold">
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
          </Link>
          <button onClick={handleLogout} className="ml-3 bg-gray-300 p-2 rounded-md text-md font-semibold ">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex ">
          <Link href={"/login"} className="text-xl p-2">
            Login
          </Link>
          <Link href={"/register"} className="text-xl p-2">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
