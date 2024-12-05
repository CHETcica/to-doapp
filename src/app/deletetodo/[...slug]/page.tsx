"use client";
import Navbar from "@/components/organisms/Navbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeletePage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const router = useRouter();
  const [ID, setID] = useState("");

  useEffect(() => {
    const getParams = async () => {
      const paramsData = await params;
      setID(paramsData.slug[0]);
    };

    params.then((params) => {
      if (params) {
        getParams();
      }
    });
  }, [params, ID]);

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/todo/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ID }),
    });

    const data = await response.json();

    if (data.success) {
      //   alert("sucseccfully to delete todocard");//
      toast("sucseccfully to delete todocard");

      router.push("/");
    } else {
      console.error(data.error);
      alert(data.error);
    }
  };
  return (
    <>
      {/* <div className="container w-full mx-auto bg-[#FFFFFF] p-4">
        <Navbar />
      </div> */}
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded shadow-md w-80 text-gray-600">
          <h1>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18Z"
                fill="#FF0E0E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2C12.3632 2 12.6978 2.19689 12.8742 2.51436L22.8742 20.5144C23.0462 20.8241 23.0416 21.2017 22.8619 21.5071C22.6822 21.8125 22.3543 22 22 22H2C1.64568 22 1.31781 21.8125 1.13813 21.5071C0.958444 21.2017 0.95377 20.8241 1.12584 20.5144L11.1258 2.51436C11.3022 2.19689 11.6368 2 12 2ZM3.69951 20H20.3005L12 5.05913L3.69951 20ZM12 9C12.5523 9 13 9.44772 13 10V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V10C11 9.44772 11.4477 9 12 9Z"
                fill="#FF0E0E"
              />
            </svg>
            Are you sure you want to delete this card?
          </h1>
          <form className="flex" onSubmit={handleDelete}>
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2 rounded mt-3 mx-2"
            >
              Delete
            </button>
            <button
              onClick={() => {
                router.back();
              }}
              className="w-full bg-gray-500 text-white py-2 rounded mt-3 mx-2"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeletePage;
