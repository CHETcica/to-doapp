"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/organisms/Navbar";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

const AddNewTodoPage = () => {
  const [todoName, setTodoName] = useState("");
  const [detail, setDetail] = useState("");
  const [priority, setPriority] = useState("");
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      console.log("User data from cookie:", JSON.parse(userData));
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/todo/addnew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoName, detail, priority, user }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success("sucseccfully to create todocard");
      router.push("/");
    } else {
      console.error(data.error);
      alert(data.error);
    }
  };
  return (
    <>
      
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded shadow-md w-80 text-gray-600">
          <h1 className="text-xl font-bold mb-4 ">Add Todo</h1>
          <form onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Todo Name"
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              placeholder="Detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            >
              <option value="1">NORMAL PRIORITY</option>
              <option value="2">HIGH PRIORITY</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Add new todo
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewTodoPage;
