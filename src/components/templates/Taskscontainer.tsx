"use client";
import React, { useEffect, useState } from "react";
import TaskHead from "../atoms/TaskHead";
import TaskCard from "../organisms/TaskCard";

interface TaskCardProps {
  _id: string;
  todoname: string;
  done_status: boolean;
  detail: string;
  priority: number;
}
const Taskscontainer = ({
  headname,
  isDone,
}: {
  headname: string;
  isDone: boolean;
}) => {
  const user = localStorage.getItem("user");
  const localdata = user ? JSON.parse(user) : null;

  const [todolist, setTodolist] = useState<TaskCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/todo/todofetch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ localdata, isDone }),
        });
        const data = await response.json();
        if (data.success) {
          const formattedData: TaskCardProps[] = data.todo.map((
            task: { _id: string; todoname: string; done_status: boolean; detail?: string; priority?: number;}) => ({
            _id: task._id,
            todoname: task.todoname,
            done_status: task.done_status,
            detail: task.detail || "",
            priority: task.priority || 0,
          }));
          console.log("------------------formattedData-----------------------",formattedData)
          setTodolist(formattedData);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[localdata, isDone]);

  return (
    <>
      {todolist.length > 0 && (
        <div className="border-dashed border-2 border-b-white border-x-white border-t-gray-300 py-3">
          <TaskHead headname={headname} />
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
            {todolist.map((task,index) => (
              <TaskCard
                key={index}
                _id={task._id}
                todoname={task.todoname}
                done_status={task.done_status}
                detail={task.detail}
                priority={task.priority}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Taskscontainer;

