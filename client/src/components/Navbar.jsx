import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 px-10 py-5">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg font-bold text-xl">

            CC

          </div>

          <h1 className="text-3xl font-extrabold">

            Campus

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Connect
            </span>

          </h1>

        </div>

        <div className="flex items-center gap-8 text-lg">

          <Link
            to="/"
            className="hover:text-indigo-400 transition"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-indigo-400 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/chat"
            className="hover:text-indigo-400 transition"
          >
            Chat
          </Link>

          <Link
            to="/ai"
            className="hover:text-indigo-400 transition"
          >
            AI Assistant
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;