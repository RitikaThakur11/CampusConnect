import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!file) {
      alert("Please upload a resume first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const res = await axios.post(
        "http://localhost:5000/api/resume-ai/analyze",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(
        "Resume Analysis Success:",
        res.data
      );

      setResult(res.data);

    } catch (error) {

      console.log(
        "===== FRONTEND ERROR ====="
      );

      console.log(error);

      console.log(
        error?.response?.data
      );

      console.log(
        "=========================="
      );

      alert(
        error?.response?.data?.message ||
        "Resume Analysis Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-6xl font-bold mb-3">
          📄 AI Resume Analyzer
        </h1>

        <p className="text-slate-400 mb-10 text-lg">
          Upload your resume and receive
          ATS score, strengths,
          weaknesses and AI
          recommendations.
        </p>

        <div className="bg-slate-900 p-10 rounded-3xl">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            className="w-full bg-slate-800 p-4 rounded-xl mb-6"
          />

          {file && (
            <div className="bg-slate-800 p-4 rounded-xl mb-6">

              <p className="font-semibold">
                📄 {file.name}
              </p>

              <p className="text-slate-400 text-sm">
                {(file.size / 1024).toFixed(2)} KB
              </p>

            </div>
          )}

          <button
            onClick={analyzeResume}
            disabled={loading}
            className={`px-8 py-4 rounded-xl font-semibold transition ${
              loading
                ? "bg-slate-700 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600"
            }`}
          >
            {loading
              ? "Analyzing Resume..."
              : "Analyze Resume"}
          </button>

          {result && (

            <div className="mt-10">

              <div className="bg-slate-800 p-6 rounded-2xl mb-6">

                <h2 className="text-3xl font-bold mb-3">
                  ATS Score
                </h2>

                <p className="text-green-500 text-6xl font-bold">
                  {result.atsScore}%
                </p>

              </div>

              <div className="bg-slate-800 p-6 rounded-2xl mb-6">

                <h2 className="text-2xl font-bold mb-4">
                  ✅ Strengths
                </h2>

                <ul className="space-y-3">

                  {result.strengths?.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="bg-slate-900 p-3 rounded-xl"
                      >
                        {item}
                      </li>
                    )
                  )}

                </ul>

              </div>

              <div className="bg-slate-800 p-6 rounded-2xl mb-6">

                <h2 className="text-2xl font-bold mb-4">
                  ❌ Weaknesses
                </h2>

                <ul className="space-y-3">

                  {result.weaknesses?.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="bg-slate-900 p-3 rounded-xl"
                      >
                        {item}
                      </li>
                    )
                  )}

                </ul>

              </div>

              <div className="bg-slate-800 p-6 rounded-2xl mb-6">

                <h2 className="text-2xl font-bold mb-4">
                  🚀 Suggestions
                </h2>

                <ul className="space-y-3">

                  {result.suggestions?.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="bg-slate-900 p-3 rounded-xl"
                      >
                        {item}
                      </li>
                    )
                  )}

                </ul>

              </div>

              <div className="bg-slate-800 p-6 rounded-2xl">

                <h2 className="text-2xl font-bold mb-4">
                  📄 Resume Preview
                </h2>

                <div className="bg-slate-900 p-4 rounded-xl max-h-[350px] overflow-y-auto whitespace-pre-wrap">
                  {result.extractedText}
                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default ResumeAnalyzer;