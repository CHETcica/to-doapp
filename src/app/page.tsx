"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/organisms/Navbar";
import Taskscontainer from "@/components/templates/Taskscontainer";



export default function Home() {
  

  return (
    <div className="container w-full h-screen mx-auto bg-[#FFFFFF] p-4">
      <Navbar />
      <Taskscontainer headname={"TODO TASKS"} isDone={false} />
      <Taskscontainer headname={"DONE TASKS"} isDone={true} />

    </div>
  );
}
