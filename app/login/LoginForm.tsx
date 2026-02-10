// app/login/LoginForm.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Calls NextAuth credentials provider
    await signIn("credentials", {
      redirect: true,
      username,
      password,
      callbackUrl: "/sales", // redirect after login
    });
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-[80%] lg:w-[30%] m-auto px-5 py-10 border border-slate-700/20 rounded-md shadow-lg">
        <form onSubmit={handleSubmit}>
          <label className="block mb-1 text-sm">Please enter sign-in details</label>
          <label className="block text-xl mb-3 font-bold">Welcome back</label>

          <label className="block mb-1">Username</label>
          <input
            className="block w-full h-10 border border-slate-700/20 rounded-md px-2 outline-0 mb-5"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="block mb-1">Password</label>
          <input
            className="block w-full h-10 border border-slate-700/20 rounded-md px-2 outline-0 mb-5"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="block w-full h-10 bg-blue-800 rounded-md cursor-pointer text-white mb-5"
          >
            Log in
          </button>

          <label className="block mb-1 text-sm">
            Forgot password? Click here to reset
          </label>
        </form>
      </div>
    </div>
  );
}