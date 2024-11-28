"use client"
import { useEffect, useState } from 'react';
import Navbar from "@/components/organisms/Navbar";
import Taskscontainer from "@/components/templates/Taskscontainer";

type UserData = {
  name: string;
};

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        setUserData(JSON.parse(user));
      }
    }
  }, []);

  return (
    <div className="container w-full h-screen mx-auto bg-[#FFFFFF] p-4">
      <Navbar/>
      <Taskscontainer headname={"TODO TASKS"} isDone={false}/>
      <Taskscontainer headname={"DONE TASKS"} isDone={true}/>
      
      {userData && <p>Welcome back, {userData.name}!</p>}
    </div>
  );
}
