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
        <div className="bg-gradient-to-r from-[#1A202C] to-[#1E3A47] h-screen w-full flex justify-center items-center">
          <div className="w-[370px] lg:w-[430px] h-[610px] bg-gradient-to-r from-[#2D3748] to-[#4A5568] lg:translate-x-[420px] rounded-md flex flex-col items-center fixed">
            <div className="text-xl cursor-pointer flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold text-white mb-[30px] mt-[30px]">
                HUDDLE
              </h1>
            </div>

            <form onSubmit={submitHandler}>
              <div className="flex flex-col justify-center items-center m-2 space-y-4 md:space-y-4">
                <input
                  type="text"
                  className="w-[300px] lg:w-[340px] h-[43px] bg-transparent border border-[#14B8A6] rounded-sm p-4 text-white"
                  placeholder="User Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="w-[300px] lg:w-[340px] h-[43px] bg-transparent border border-[#14B8A6] rounded-sm p-4 text-white"
                  placeholder="User Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="w-[300px] lg:w-[340px] h-[43px] bg-transparent border border-[#14B8A6] rounded-sm p-4 text-white"
                  placeholder="User Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="date"
                  className="w-[300px] lg:w-[340px] h-[43px] bg-transparent border border-[#14B8A6] rounded-sm p-4 text-white"
                  placeholder="Birthdate"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  className="w-[300px] lg:w-[340px] h-[43px] bg-transparent border border-[#14B8A6] rounded-sm p-4 text-white"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  pattern="[0-9]{10}"
                  title="Enter a 10-digit phone number"
                />
              </div>

              <div className="text-center mt-7">
                <button
                  type="submit"
                  className="w-[300px] lg:w-[340px] h-[35px] bg-[#14B8A6] font-bold text-white text-[13px] rounded-sm"
                >
                  Register
                </button>
              </div>
            </form>

            <Link
              to="/login"
              className="w-[300px] lg:w-[340px] h-[40px] bg-[#14B8A6] font-bold text-white text-[16px] mt-[40px] rounded-md flex items-center justify-center"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
