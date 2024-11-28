"use client"
import Link from 'next/link';
import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      alert("sucseccfully to login")
      localStorage.setItem('user', JSON.stringify(data.users));
    } else {
      console.error(data.error);
    }
  };

  return (
    <div  className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-80 text-gray-600">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <button
            type='submit'
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
        <Link href={"/register"} className='text-blue-400 mt-4'>If you have not an account, go to Register page</Link>
      </div>
    </div>
  );
};

export default LoginPage;