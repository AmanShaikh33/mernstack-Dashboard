import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");

  const { registerUser, loading } = UserData();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const formdata = {
      name,
      email,
      password,
      dob,
      phone,
    };

    registerUser(formdata, navigate);
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
            <p className="text-white text-center mb-6">Create Your Account</p>

            <form onSubmit={submitHandler} className="space-y-4">
              <input
                type="text"
                placeholder="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-cyan-400 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
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
              <input
                type="date"
                placeholder="Birthdate"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-cyan-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="[0-9]{10}"
                title="Enter a 10-digit phone number"
                className="w-full p-3 rounded-lg bg-white/10 border border-cyan-400 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Register
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-cyan-300 hover:text-cyan-500 font-medium"
              >
                Already have an account? Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
