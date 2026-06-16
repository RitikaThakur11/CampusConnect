import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Notes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");

  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotes();
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

  const createNote = async () => {
    if (!title || !content) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/notes",
        {
          title,
          content,
          category,
        }
      );

      setTitle("");
      setContent("");
      setCategory("General");

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = (note) => {
    setEditingId(note._id);

    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category || "General");
  };

  const updateNote = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/notes/${editingId}`,
        {
          title,
          content,
          category,
        }
      );

      setEditingId(null);

      setTitle("");
      setContent("");
      setCategory("General");

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);

    setTitle("");
    setContent("");
    setCategory("General");
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/notes/${id}`
      );

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      note.category
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold mb-10">
          Notes
        </h1>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search Notes..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-slate-900 mb-8"
        />

        {/* CREATE / EDIT */}

        <div className="bg-slate-900 p-8 rounded-2xl mb-10">

          <h2 className="text-2xl font-bold mb-6">

            {editingId
              ? "Edit Note"
              : "Create Note"}

          </h2>

          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-slate-800 mb-4"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-slate-800 mb-4"
          >
            <option value="General">
              General
            </option>

            <option value="DBMS">
              DBMS
            </option>

            <option value="OS">
              OS
            </option>

            <option value="CN">
              CN
            </option>

            <option value="Java">
              Java
            </option>

            <option value="Placement">
              Placement
            </option>

            <option value="Projects">
              Projects
            </option>
          </select>

          <div className="bg-white text-black mb-4 rounded-xl overflow-hidden">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
            />
          </div>

          {editingId ? (
            <div className="flex gap-4">

              <button
                onClick={updateNote}
                className="bg-green-600 px-6 py-3 rounded-xl"
              >
                Save Changes
              </button>

              <button
                onClick={cancelEdit}
                className="bg-gray-600 px-6 py-3 rounded-xl"
              >
                Cancel
              </button>

            </div>
          ) : (
            <button
              onClick={createNote}
              className="bg-indigo-600 px-6 py-3 rounded-xl"
            >
              Create Note
            </button>
          )}

        </div>

        {/* NOTES */}

        <div className="grid md:grid-cols-2 gap-6">

          {filteredNotes.map((note) => (

            <div
              key={note._id}
              className="bg-slate-900 p-6 rounded-2xl"
            >

              <p className="text-indigo-400 font-semibold mb-2">
                {note.category || "General"}
              </p>

              <h2 className="text-2xl font-bold mb-3">
                {note.title}
              </h2>

              <div
                className="text-gray-300 mb-4"
                dangerouslySetInnerHTML={{
                  __html: note.content,
                }}
              />

              <div className="text-sm text-gray-500 mb-5">

                <p>
                  Created:{" "}
                  {new Date(
                    note.createdAt
                  ).toLocaleDateString()}
                </p>

                <p>
                  Updated:{" "}
                  {new Date(
                    note.updatedAt
                  ).toLocaleDateString()}
                </p>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    startEdit(note)
                  }
                  className="bg-yellow-600 px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteNote(note._id)
                  }
                  className="bg-red-600 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Notes;