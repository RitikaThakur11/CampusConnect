import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden">

        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-6">

          <span className="bg-indigo-500/20 text-indigo-400 px-5 py-2 rounded-full mb-8">
            🚀 Modern Student Collaboration Platform
          </span>

          <h1 className="text-7xl md:text-8xl font-extrabold mb-8">

            Campus

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Connect
            </span>

          </h1>

          <p className="text-gray-300 text-xl max-w-3xl mb-10 leading-relaxed">

            Learn, collaborate and grow together.

            Manage notes, AI learning, realtime chat,
            file sharing and video meetings in one
            powerful platform.

          </p>

          <div className="flex flex-wrap gap-5">

            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition"
            >
              Get Started
            </Link>

            <Link
              to="/ai"
              className="border border-slate-700 px-8 py-4 rounded-2xl text-lg hover:bg-slate-900 transition"
            >
              AI Assistant
            </Link>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="grid md:grid-cols-4 gap-6 px-10 pb-24">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center">

          <h1 className="text-5xl font-bold text-indigo-500">
            500+
          </h1>

          <p className="text-gray-400 mt-3">
            Notes Created
          </p>

        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center">

          <h1 className="text-5xl font-bold text-emerald-500">
            100+
          </h1>

          <p className="text-gray-400 mt-3">
            Students
          </p>

        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center">

          <h1 className="text-5xl font-bold text-amber-500">
            24/7
          </h1>

          <p className="text-gray-400 mt-3">
            AI Assistant
          </p>

        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center">

          <h1 className="text-5xl font-bold text-rose-500">
            Live
          </h1>

          <p className="text-gray-400 mt-3">
            Collaboration
          </p>

        </div>

      </section>

      {/* FEATURES */}

      <section className="px-10 pb-24">

        <h2 className="text-5xl font-bold text-center mb-16">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <FeatureCard
            title="Authentication"
            text="Secure JWT authentication with role-based access."
          />

          <FeatureCard
            title="Realtime Chat"
            text="Socket.IO powered instant messaging."
          />

          <FeatureCard
            title="AI Assistant"
            text="AI-powered learning and interview preparation."
          />

          <FeatureCard
            title="Smart Notes"
            text="Rich text notes with categories and organization."
          />

          <FeatureCard
            title="Video Meetings"
            text="Collaborate through video conferencing."
          />

          <FeatureCard
            title="Cloud Storage"
            text="Upload and manage files securely."
          />

        </div>

      </section>

    </div>
  );
}

export default Home;