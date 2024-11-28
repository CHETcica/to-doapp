"use client";
import Navbar from "@/components/organisms/Navbar";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      // alert("sucseccfully to login");
      toast.success("sucseccfully to login!");
      localStorage.setItem("user", JSON.stringify(data.users));
      router.push('/');
    } else {
      console.error(data.error);
    }
  };

  // const notify = () => toast("Wow so easy!");

  return (
    <>
      <div className="container w-full mx-auto bg-[#FFFFFF] p-4">
        <Navbar />
      </div>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded shadow-md w-80 text-gray-600">
          <h1 className="text-xl font-bold mb-4">Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Login
            </button>
            {/* <button
              onClick={() => notify()}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Login
            </button> */}
          </form>
          <Link href={"/register"} className="text-blue-400 mt-4">
            If you have not an account, go to Register page
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
