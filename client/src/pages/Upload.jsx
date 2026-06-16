import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

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

  const uploadFile = async () => {

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      alert(
        "File Uploaded Successfully ✅"
      );

      setFile(null);

      document.getElementById(
        "fileInput"
      ).value = "";

      fetchFiles();

    } catch (error) {

      console.log(error);

      alert("Upload Failed ❌");

    } finally {

      setLoading(false);

    }
  };

  const deleteFile = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/files/${id}`
      );

      fetchFiles();

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-6xl font-bold mb-3">
          📂 File Upload Center
        </h1>

        <p className="text-slate-400 mb-10 text-lg">
          Upload assignments, notes,
          presentations and study resources.
        </p>

        {/* UPLOAD CARD */}

        <div className="bg-slate-900 rounded-3xl p-12 max-w-5xl">

          <div className="flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-5xl mb-6">
              ☁️
            </div>

            <h2 className="text-4xl font-bold mb-3">
              Upload Your Files
            </h2>

            <p className="text-slate-400 mb-8">
              PDF, DOCX, PPT, JPG, PNG
            </p>

            <input
              id="fileInput"
              type="file"
              onChange={(e) =>
                setFile(
                  e.target.files[0]
                )
              }
              className="hidden"
            />

            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-slate-800 px-8 py-4 rounded-2xl hover:bg-slate-700 transition mb-5"
            >
              Choose File
            </label>

            {file && (

              <div className="bg-slate-800 p-4 rounded-2xl mb-6 w-full max-w-xl">

                <p className="font-semibold">
                  📄 {file.name}
                </p>

                <p className="text-slate-400 text-sm mt-2">
                  {(
                    file.size / 1024
                  ).toFixed(2)}{" "}
                  KB
                </p>

              </div>

            )}

            <button
              onClick={uploadFile}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 px-12 py-4 rounded-2xl font-semibold text-lg"
            >
              {loading
                ? "Uploading..."
                : "Upload File"}
            </button>

          </div>

        </div>

        {/* FILE HISTORY */}

        <div className="mt-12">

          <h2 className="text-4xl font-bold mb-6">
            📁 Uploaded Files
          </h2>

          <div className="space-y-4">

            {files.length === 0 ? (

              <div className="bg-slate-900 p-6 rounded-2xl">

                No files uploaded yet.

              </div>

            ) : (

              files.map((item) => (

                <div
                  key={item._id}
                  className="bg-slate-900 p-6 rounded-2xl flex justify-between items-center"
                >

                  <div>

                    <h3 className="font-semibold text-lg">
                      📄 {item.fileName}
                    </h3>

                    <p className="text-slate-400 text-sm mt-1">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <a
                      href={`http://localhost:5000/uploads/${item.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-600 px-4 py-2 rounded-xl"
                    >
                      Download
                    </a>

                    <button
                      onClick={() =>
                        deleteFile(
                          item._id
                        )
                      }
                      className="bg-red-600 px-4 py-2 rounded-xl"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Upload;