"use client";
import React, { useEffect, useState } from "react";
import TaskHead from "../atoms/TaskHead";
import TaskCard from "../organisms/TaskCard";

const Taskscontainer = ({
  headname,
  isDone,
}: {
  headname: string;
  isDone: boolean;
}) => {
  const user = localStorage.getItem("user");
  const localdata = JSON.parse(user);
  const [todolist, setTodolist] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/todo/todomanagement", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ localdata, isDone }),
        });
        const data = await response.json();
        if (data.success) {
          setTodolist(data.todo);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[]);

  console.log("todolist", todolist);

  return (
    <>
      {todolist && todolist ? (
        <div className="border-dashed border-2 border-b-white border-x-white border-t-gray-300 py-3">
          <TaskHead headname={headname} />
          <div className="grid gap-2 md:flex">
            <TaskCard tododata={todolist} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Taskscontainer;
