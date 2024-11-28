"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/organisms/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";

const EditTodoPage = ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const [todoName, setTodoName] = useState("");
  const [detail, setDetail] = useState("");
  const [priority, setPriority] = useState(1);
  const [done , setDone] = useState(false);
  const [ID , setID] = useState("");
  const router = useRouter();

  
  useEffect(() => {
    const fetchData = async () => {
      const paramsData = await params;
      // console.log("ID",ID)
      setID(paramsData.slug[0])
      if (ID) {
        try {
          const response = await fetch("/api/todo/getById", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ID }),
          });

          const data = await response.json();

          if (data.success) {
            setTodoName(data.todo[0].todoname)
            setDetail(data.todo[0].detail)
            setDone(data.todo[0].done_status)
          } else {
            console.error("Error:", data.error);
            alert(data.error);
          }
        } catch (error) {
          alert(`Failed to fetch data. Please try again later. Error: ${error}`);
        }
      } else {
        return;
      }
    };

    params.then((params) => {
      if (params) {
        fetchData();
      }
    });
  }, [params, ID]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDone(e.target.checked); // Set done to true or false based on checkbox state
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/todo/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoName, detail, done, priority, ID }),
    });

    const data = await response.json();

    if (data.success) {
      alert("sucseccfully to update todocard");
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
          <h1 className="text-xl font-bold mb-4 ">Edit Todo</h1>
          <form 
          onSubmit={handleEdit}
          >
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
            <input
                type="checkbox"
                id="completed"
                className="mr-2"
                checked={done}
                // Add state management if needed
                onChange={handleCheckboxChange}
              />
            <label htmlFor="completed" className="text-gray-600 mb-5">Completed</label>
            <select
              value={priority} // Controlled by state
              onChange={(e) => setPriority(Number(e.target.value))} // Updates the state when an option is selected
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

          <Link href={`/deletetodo/${ID}`}>
            <button
              type="submit" 
              className="w-full bg-red-700 text-white py-2 rounded mt-3"
            >
              Delete
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default EditTodoPage;
