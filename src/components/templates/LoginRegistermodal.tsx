"use client";
import React, { useState } from "react";

const LoginRegistermodal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && isOpen ? (
        <div>
          <form action="">
            <input type="text" />
            <input type="text" />
            <button type="submit">register</button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default LoginRegistermodal;
