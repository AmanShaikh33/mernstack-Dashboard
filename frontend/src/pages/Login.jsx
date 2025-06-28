import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginUser, loading } = UserData();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate);
  };

  return (
    <>
      {loading ? (
        <h1 className="text-white text-center text-2xl mt-10">Loading...</h1>
      ) : (
        <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h1 className="text-3xl font-extrabold text-center text-cyan-400 mb-2">
              GamifyDashboard
            </h1>
            <p className="text-white text-center mb-6">Welcome back, log in</p>

            <form onSubmit={submitHandler} className="space-y-5">
              <input
                type="email"
                placeholder="User Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-cyan-400 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="password"
                placeholder="User Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-cyan-400 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Login
              </button>
            </form>

            <div className="border-t border-white/20 mt-8 pt-6 text-center">
              <p className="text-white text-sm mb-3">
                Don't have an account?
              </p>
              <Link
                to="/register"
                className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-6 py-2 rounded-lg transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
