import Link from "next/link";
import React from "react";

interface TaskCardProps {
  _id: string;
  todoname: string;
  done_status: boolean;
  detail: string;
  priority: number;
}
interface Todolist {
  tododata: TaskCardProps;
}

const TaskCard: React.FC<Todolist> = ({ tododata }) => {
  
  

  return (
    <>
      {tododata.map((task: TaskCardProps) => (
        <Link href={`/edittodo/${task._id}`}
          key={task._id}
          className={`flex w-full rounded-md my-2 p-3  shadow-lg shadow-indigo-500/40 justify-between
          ${task.done_status ? "bg-[#00b037]" : null}
          ${task.priority == 1 && !task.done_status ? "bg-[#3E99EB]" : null}
          ${task.priority == 2 && !task.done_status ? "bg-[#fc6e3e]" : null}
        `}
        >
          <div>
            <span className="text-[12px] opacity-75">
              {task.done_status ? "DONE" : null}
              {task.priority == 1 ? "NOMAL PRIORITY" : null}
              {task.priority == 2 ? "HIGH PRIORITY" : null}
            </span>
            <h1 className="text-bold">{task.todoname}</h1>
            <p className="text-[13px] opacity-75">{task.detail}</p>
          </div>
          <div className="flex items-center pr-4">
            <div className="rounded-full bg-white w-6 h-6">
              <svg
                className={`${task.done_status ? "" : "hidden"}  scale-[0.5] translate-x-[-1.5px] translate-y-[1px]`}
                width="29"
                height="22"
                viewBox="0 0 29 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3.87915"
                  y="9.17566"
                  width="12.2691"
                  height="5.16172"
                  transform="rotate(45 3.87915 9.17566)"
                  fill="#02A925"
                />
                <rect
                  x="28.4323"
                  y="3.77356"
                  width="26.4538"
                  height="5.16172"
                  transform="rotate(136.976 28.4323 3.77356)"
                  fill="#02A925"
                />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default TaskCard;
