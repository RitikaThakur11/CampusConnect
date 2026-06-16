import axios from "axios";

import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { motion } from "framer-motion";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }
  };


  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 p-10 rounded-2xl w-[450px]"
      >

        <h1 className="text-4xl text-white font-bold mb-8">
          Login
        </h1>


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-slate-800 text-white mb-6"
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-slate-800 text-white mb-6"
        />


        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 py-4 rounded-xl text-white text-lg"
        >
          Login
        </button>


        <p className="text-gray-400 mt-6">

          Don't have account?

          <Link
            to="/register"
            className="text-indigo-400 ml-2"
          >
            Register
          </Link>

        </p>

      </motion.div>

    </div>

  );
}

export default Login;