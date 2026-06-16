import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/Sidebar";

function NoteDetails() {
  const { id } = useParams();

  const [note, setNote] = useState(null);

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/notes"
      );

      const selectedNote = data.find(
        (n) => n._id === id
      );

      setNote(selectedNote);
    } catch (error) {
      console.log(error);
    }
  };

  if (!note) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10">
        <h1 className="text-5xl font-bold mb-8">
          {note.title}
        </h1>

        <div className="bg-slate-900 p-8 rounded-2xl">
          <p className="text-lg leading-8">
            {note.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoteDetails;