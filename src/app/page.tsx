import Image from "next/image";

export default function Home() {
  return (
    <div className="container w-full h-screen mx-auto bg-[#FFFFFF]">
      <nav className="flex justify-between items-center p-4 text-[#000000]">
        <div className="flex">
          <h1>25</h1>
          <div>
            <span>tuesday</span>
            <span>dex 2028</span>
          </div>
        </div>
        <div>
          <button>New task</button>
        </div>
      </nav>
    </div>
  );
}
