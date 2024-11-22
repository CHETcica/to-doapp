import Navbar from "@/components/organisms/Navbar";
import Taskscontainer from "@/components/templates/Taskscontainer";



export default function Home() {
  return (
    <div className="container w-full h-screen mx-auto bg-[#FFFFFF] p-4">
      <Navbar/>
      <Taskscontainer headname={"TODO TASKS"}/>
      <Taskscontainer headname={"DONE TASKS"}/>
      
    </div>
  );
}
