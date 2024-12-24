"use client";
import Taskscontainer from "@/components/templates/Taskscontainer";



export default function Home() {
  

  return (
    <div className="container w-full h-screen mx-auto bg-[#FFFFFF] p-4">
      <Taskscontainer headname={"TODO TASKS"} isDone={false} />
      <Taskscontainer headname={"DONE TASKS"} isDone={true} />
    </div>
  );
}
