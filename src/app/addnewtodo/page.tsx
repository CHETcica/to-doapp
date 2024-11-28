"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import Navbar from "@/components/organisms/Navbar";
const AddNewTodoPage = () => {
  const [todoName, setTodoName] = useState("");
  const [detail, setDetail] = useState("");
  const [priority, setPriority] = useState("");
  const user = localStorage.getItem("user");
  const localdata = user ? JSON.parse(user) : {};
  const router = useRouter();

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/todo/addnew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoName, detail, priority, localdata }),
    });

    const data = await response.json();

    if (data.success) {
      alert("sucseccfully to create todocard");
      router.push('/');
    } else {
      console.error(data.error);
      alert(data.error);
    }
  };
  return (
    <>
      <div className="container w-full mx-auto bg-[#FFFFFF] p-4">
        <Navbar />
      </div>

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
              value={priority} // Controlled by state
              onChange={(e) => setPriority(e.target.value)} // Updates the state when an option is selected
              className="w-full p-2 border rounded mb-3"
            >
              <option value="1">NOMAL PRIORITY</option>
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
