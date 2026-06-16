import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Profile() {
  const [notes, setNotes] = useState([]);
  const [files, setFiles] = useState([]);
  const [history, setHistory] = useState([]);

  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Ritika Thakur",
    email: "ritika@gmail.com",
    role: "Data Science Student",
  });

  useEffect(() => {
    fetchNotes();
    fetchFiles();
    fetchHistory();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/notes"
      );

      setNotes(res.data);
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

  const handleSave = () => {
    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    setEditing(false);

    alert("Profile Updated Successfully ✅");
  };

  useEffect(() => {
    const savedProfile =
      localStorage.getItem("profile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold mb-10">
          My Profile
        </h1>

        <div className="bg-slate-900 p-10 rounded-3xl max-w-5xl border border-slate-800">

          {/* Header */}
          <div className="flex items-center gap-8 mb-12">

            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-6xl font-bold">
              {profile.name.charAt(0)}
            </div>

            <div className="flex-1">

              {editing ? (
                <>
                  <input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        name: e.target.value,
                      })
                    }
                    className="bg-slate-800 p-3 rounded-xl w-full text-2xl mb-3"
                  />

                  <input
                    value={profile.role}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        role: e.target.value,
                      })
                    }
                    className="bg-slate-800 p-3 rounded-xl w-full"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-5xl font-bold">
                    {profile.name}
                  </h1>

                  <p className="text-gray-400 text-xl mt-2">
                    {profile.role}
                  </p>
                </>
              )}

            </div>
          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-6 mb-12">

            <div className="bg-slate-800 p-8 rounded-2xl">
              <h3 className="text-gray-400 mb-2">
                📚 Notes Created
              </h3>

              <p className="text-5xl font-bold text-indigo-500">
                {notes.length}
              </p>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl">
              <h3 className="text-gray-400 mb-2">
                📂 Uploads
              </h3>

              <p className="text-5xl font-bold text-green-500">
                {files.length}
              </p>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl">
              <h3 className="text-gray-400 mb-2">
                🤖 AI Requests
              </h3>

              <p className="text-5xl font-bold text-yellow-500">
                {history.length}
              </p>
            </div>

          </div>

          {/* Email */}

          <div className="mb-10">

            <h2 className="text-gray-400 mb-3">
              Email Address
            </h2>

            {editing ? (
              <input
                value={profile.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    email: e.target.value,
                  })
                }
                className="bg-slate-800 p-3 rounded-xl w-full text-xl"
              />
            ) : (
              <p className="text-2xl">
                {profile.email}
              </p>
            )}

          </div>

          {/* Buttons */}

          <div className="flex gap-4">

            {editing ? (
              <button
                onClick={handleSave}
                className="bg-green-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Save Profile
              </button>
            ) : (
              <button
                onClick={() =>
                  setEditing(true)
                }
                className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Edit Profile
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;