"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/organisms/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";


type UserData = {
  name: string;
};

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        setUserData(JSON.parse(user));
      }
    }
  }, []);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Registration successful!");
      localStorage.setItem("user", JSON.stringify(data.users));
      router.push('/login');
    } else {
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <>
      <div className="container w-full mx-auto bg-[#FFFFFF] p-4">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded shadow-md w-80 text-gray-600">
          <h1 className="text-xl font-bold mb-4 ">Register</h1>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Register
            </button>
          </form>

          <Link href={"/login"} className="text-blue-400 mt-4">
            If use have accout go to Loginpage
          </Link>
        </div>
      </div>
      {userData && <p className="mt-4 text-green-500">Welcome back, {userData.name}!</p>}
    </>
  );
}





export default RegisterPage;

