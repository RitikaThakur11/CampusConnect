import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ReactMarkdown from "react-markdown";
import { FaCopy, FaTrash } from "react-icons/fa";

function AIChat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [chat, setChat] = useState([]);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

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

  const askAI = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setChat((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/chat",
        {
          message: userMessage,
        }
      );

      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.reply,
        },
      ]);

      fetchHistory();
    } catch (error) {
      console.log(error);

      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      {/* HISTORY */}

      <div className="w-80 bg-slate-900 border-r border-slate-800 p-5 overflow-y-auto">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold">
            🕘 History
          </h2>

          <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm">
            {history.length}
          </span>

        </div>

        {history.length === 0 ? (

          <p className="text-gray-400">
            No chats yet
          </p>

        ) : (

          history.map((chatItem) => (

            <div
              key={chatItem._id}
              className="bg-slate-800 p-4 rounded-xl mb-3 hover:bg-slate-700 cursor-pointer"
            >

              <p className="truncate font-medium">
                {chatItem.question}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(
                  chatItem.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

          ))

        )}

      </div>

      {/* MAIN */}

      <div className="flex-1 flex flex-col">

        {/* HEADER */}

        <div className="border-b border-slate-800 p-8">

          <h1 className="text-5xl font-bold">
            🤖 CampusConnect AI
          </h1>

          <p className="text-gray-400 mt-2">
            Powered by Google Gemini
          </p>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-5 p-6">

          <div className="bg-slate-900 rounded-2xl p-5">

            <p className="text-slate-400">
              Total Chats
            </p>

            <h2 className="text-4xl font-bold text-indigo-400">
              {history.length}
            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-5">

            <p className="text-slate-400">
              AI Model
            </p>

            <h2 className="text-3xl font-bold text-green-400">
              Gemini
            </h2>

          </div>

          <div className="bg-slate-900 rounded-2xl p-5">

            <p className="text-slate-400">
              Status
            </p>

            <h2 className="text-3xl font-bold text-purple-400">
              Online
            </h2>

          </div>

        </div>

        {/* CHAT AREA */}

        <div className="flex-1 overflow-y-auto px-10 py-6 flex flex-col">

          {chat.length === 0 && (

            <div className="max-w-4xl mx-auto">

              <h2 className="text-4xl font-bold mb-4">
                Welcome to CampusConnect AI
              </h2>

              <p className="text-slate-400 mb-10">
                Ask coding, DBMS, OS, CN,
                aptitude, interview and
                placement questions.
              </p>

              <div className="grid md:grid-cols-2 gap-4">

                <button
                  onClick={() =>
                    setMessage(
                      "Explain DBMS with examples"
                    )
                  }
                  className="bg-slate-900 p-5 rounded-2xl text-left hover:bg-slate-800"
                >
                  📚 Explain DBMS
                </button>

                <button
                  onClick={() =>
                    setMessage(
                      "Difference between TCP and UDP"
                    )
                  }
                  className="bg-slate-900 p-5 rounded-2xl text-left hover:bg-slate-800"
                >
                  🌐 TCP vs UDP
                </button>

                <button
                  onClick={() =>
                    setMessage(
                      "Write Java Stack Program"
                    )
                  }
                  className="bg-slate-900 p-5 rounded-2xl text-left hover:bg-slate-800"
                >
                  💻 Java Stack Program
                </button>

                <button
                  onClick={() =>
                    setMessage(
                      "How to prepare for placements?"
                    )
                  }
                  className="bg-slate-900 p-5 rounded-2xl text-left hover:bg-slate-800"
                >
                  🎯 Placement Preparation
                </button>

              </div>

            </div>

          )}

          <div className="max-w-5xl mx-auto w-full">

            {chat.map((item, index) => (

              <div
                key={index}
                className={`flex mb-5 ${
                  item.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                {item.sender === "user" ? (

                  <div className="bg-indigo-600 max-w-md p-5 rounded-3xl shadow-lg">

                    <div className="font-semibold mb-2">
                      👤 You
                    </div>

                    {item.text}

                  </div>

                ) : (

                  <div className="bg-slate-900 border border-slate-800 max-w-3xl p-5 rounded-3xl shadow-lg">

                    <div className="flex justify-between items-center mb-4">

                      <div className="font-semibold text-indigo-400">
                        🤖 CampusConnect AI
                      </div>

                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(
                            item.text
                          )
                        }
                        className="text-slate-400 hover:text-white"
                      >
                        <FaCopy />
                      </button>

                    </div>

                    <div className="prose prose-invert max-w-none">

                      <ReactMarkdown>
                        {item.text}
                      </ReactMarkdown>

                    </div>

                  </div>

                )}

              </div>

            ))}

            {loading && (

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl w-fit">

                <div className="font-semibold mb-3">
                  🤖 Thinking...
                </div>

                <div className="flex gap-2 text-2xl">

                  <span className="animate-bounce">
                    •
                  </span>

                  <span className="animate-bounce">
                    •
                  </span>

                  <span className="animate-bounce">
                    •
                  </span>

                </div>

              </div>

            )}

          </div>

        </div>

        {/* INPUT */}

        <div className="border-t border-slate-800 p-4">

          <div className="max-w-5xl mx-auto flex gap-4">

            <button
              onClick={() => setChat([])}
              className="bg-red-600 px-5 rounded-2xl"
            >
              <FaTrash />
            </button>

            <input
              type="text"
              value={message}
              placeholder="Ask anything..."
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askAI();
                }
              }}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl p-4 outline-none"
            />

            <button
              onClick={askAI}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 px-8 rounded-2xl font-semibold"
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIChat;