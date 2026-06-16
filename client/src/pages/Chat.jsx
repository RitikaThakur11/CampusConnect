import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Sidebar from "../components/Sidebar";

const socket = io("http://localhost:5000");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!message.trim()) return;

    const chatData = {
      sender: "Ritika",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("send_message", chatData);

    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10">
        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-5xl font-bold">
            💬 CampusConnect Chat
          </h1>

          <p className="text-slate-400 mt-2">
            Realtime communication powered by
            Socket.IO
          </p>
        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-slate-900 rounded-2xl p-5">
            <p className="text-slate-400">
              Messages
            </p>

            <h2 className="text-4xl font-bold text-indigo-400">
              {messages.length}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5">
            <p className="text-slate-400">
              Status
            </p>

            <h2 className="text-3xl font-bold text-green-400">
              Online
            </h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5">
            <p className="text-slate-400">
              Technology
            </p>

            <h2 className="text-3xl font-bold text-purple-400">
              Socket.IO
            </h2>
          </div>
        </div>

        {/* MAIN CHAT AREA */}

        <div className="grid grid-cols-12 gap-6">
          {/* LEFT PANEL */}

          <div className="col-span-3 bg-slate-900 rounded-3xl p-6 h-[700px]">
            <h2 className="text-3xl font-bold mb-6">
              🟢 Connected
            </h2>

            <div className="bg-slate-800 rounded-2xl p-5">
              <h3 className="font-semibold text-green-400">
                Active Session
              </h3>

              <p className="text-slate-400 mt-3">
                Messages are delivered in
                realtime using Socket.IO.
              </p>

              <p className="mt-4 font-semibold">
                1 User Online
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5 mt-5">
              <h3 className="font-semibold mb-3">
                Features
              </h3>

              <ul className="space-y-2 text-slate-300">
                <li>⚡ Instant Messaging</li>
                <li>🔄 Live Updates</li>
                <li>🌐 Socket.IO</li>
                <li>💬 Group Discussion</li>
              </ul>
            </div>
          </div>

          {/* CHAT BOX */}

          <div className="col-span-9 bg-slate-900 rounded-3xl flex flex-col h-[700px]">
            <div className="border-b border-slate-800 p-6">
              <h2 className="text-3xl font-bold">
                General Discussion
              </h2>
            </div>

            {/* MESSAGES */}

            <div className="flex-1 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">
                      Start a Conversation
                    </h2>

                    <p className="text-slate-400">
                      Send your first message to
                      begin chatting.
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className="flex justify-end mb-5"
                  >
                    <div
                      className="
                      bg-gradient-to-r
                      from-indigo-600
                      to-purple-600
                      p-4
                      rounded-2xl
                      max-w-md
                      shadow-lg
                    "
                    >
                      <p className="font-bold">
                        {msg.sender}
                      </p>

                      <p className="mt-2 break-words">
                        {msg.text}
                      </p>

                      <p className="text-xs opacity-70 mt-2">
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))
              )}

              <div ref={messagesEndRef}></div>
            </div>

            {/* INPUT */}

            <div className="border-t border-slate-800 p-6 flex gap-4">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  sendMessage()
                }
                className="
                  flex-1
                  bg-slate-800
                  rounded-2xl
                  p-4
                  outline-none
                "
              />

              <button
                onClick={sendMessage}
                className="
                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600
                  px-8
                  rounded-2xl
                  font-semibold
                  hover:scale-105
                  transition
                "
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;