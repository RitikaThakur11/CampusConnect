import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [history, setHistory] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchNotes();
    fetchHistory();
    fetchFiles();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/notes"
      );
      setNotes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/history"
      );
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/files"
      );
      setFiles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10">
        <h1 className="text-5xl font-bold mb-3">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400 mb-10 text-lg">
          Manage notes, collaborate and learn smarter.
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
            <p className="text-gray-400 mb-3">
              📚 Total Notes
            </p>

            <h1 className="text-5xl font-bold text-indigo-500">
              {notes.length}
            </h1>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
            <p className="text-gray-400 mb-3">
              🤖 AI Chats
            </p>

            <h1 className="text-5xl font-bold text-yellow-500">
              {history.length}
            </h1>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
            <p className="text-gray-400 mb-3">
              💬 Status
            </p>

            <h1 className="text-3xl font-bold text-green-500">
              Online
            </h1>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
            <p className="text-gray-400 mb-3">
              📂 Uploads
            </p>

            <h1 className="text-5xl font-bold text-purple-500">
              {files.length}
            </h1>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <Link
            to="/notes"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-3xl hover:scale-105 transition"
          >
            <h2 className="text-2xl font-bold mb-2">
              Create Notes
            </h2>

            <p>
              Save and organize study materials.
            </p>
          </Link>

          <Link
            to="/upload"
            className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-3xl hover:scale-105 transition"
          >
            <h2 className="text-2xl font-bold mb-2">
              Upload Files
            </h2>

            <p>
              Share resources with classmates.
            </p>
          </Link>
        </div>

        {/* Recent Notes */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">
            Recent Notes
          </h2>

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
            {notes.length === 0 ? (
              <p className="text-gray-400">
                No notes available.
              </p>
            ) : (
              notes.slice(0, 5).map((note) => (
                <div
                  key={note._id}
                  className="block p-4 border-b border-slate-700 hover:text-indigo-400 transition"
                >
                  📘 {note.title}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent AI Chats */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-8">
            Recent AI Chats
          </h2>

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
            {history.length === 0 ? (
              <p className="text-gray-400">
                No AI chats yet.
              </p>
            ) : (
              history.slice(0, 5).map((chat) => (
                <div
                  key={chat._id}
                  className="p-4 border-b border-slate-700"
                >
                  🤖 {chat.question}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;