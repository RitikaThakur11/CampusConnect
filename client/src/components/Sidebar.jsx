import { Link, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaComments,
  FaRobot,
  FaUpload,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBook,
  FaFileAlt,
} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <div className="w-72 bg-slate-900 min-h-screen border-r border-slate-800 p-8 flex flex-col">

      {/* LOGO */}

      <div className="mb-12">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xl">
            C
          </div>

          <h1 className="text-3xl font-bold">
            Campus
            <span className="text-indigo-500">
              Connect
            </span>
          </h1>

        </div>

      </div>

      {/* MENU */}

      <div className="flex flex-col gap-4 text-lg">

        <Link
          to="/"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/notes"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800"
        >
          <FaBook />
          Notes
        </Link>

        <Link
          to="/chat"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800"
        >
          <FaComments />
          Chat
        </Link>

        <Link
          to="/ai"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800"
        >
          <FaRobot />
          AI Assistant
        </Link>

        <Link
          to="/upload"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800"
        >
          <FaUpload />
          Upload Files
        </Link>

        <Link
          to="/resume"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800"
        >
          <FaFileAlt />
          Resume Analyzer
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800"
        >
          <FaUser />
          Profile
        </Link>

        <Link
          to="/admin"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800"
        >
          <FaCog />
          Admin Panel
        </Link>

      </div>

      {/* USER */}

      <div className="mt-auto">

        <div className="bg-slate-800 p-4 rounded-2xl mb-5">

          <p className="font-bold">
            Ritika Thakur
          </p>

          <p className="text-sm text-gray-400">
            Administrator
          </p>

        </div>

        <button
          onClick={logout}
          className="w-full bg-red-600 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-red-700"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>

  );
}

export default Sidebar;