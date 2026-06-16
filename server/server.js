const analyticsRoutes = require("./routes/analyticsRoutes");
const activityRoutes = require("./routes/activityRoutes");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");



dotenv.config();

const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const aiRoutes = require("./routes/aiRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const adminRoutes = require("./routes/adminRoutes");

const chatHistoryRoutes = require(
  "./routes/chatHistoryRoutes"
);



const fileRoutes = require(
  "./routes/fileRoutes"
);

const resumeRoutes = require(
  "./routes/resumeRoutes"
);

const resumeAI = require(
  "./routes/resumeAI"
);


connectDB();

setTimeout(() => {
  console.log(
    "Mongo State:",
    mongoose.connection.readyState
  );
}, 5000);

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// SOCKET.IO

io.on("connection", (socket) => {

  console.log("User Connected");

  socket.on("send_message", (data) => {

    io.emit("receive_message", data);

  });

  socket.on("join_room", (roomId) => {

    socket.join(roomId);

    socket.to(roomId).emit(
      "user_joined"
    );

    console.log(
      `User joined room: ${roomId}`
    );

  });

  socket.on(
    "offer",
    ({ roomId, offer }) => {

      socket.to(roomId).emit(
        "offer",
        offer
      );

    }
  );

  socket.on(
    "answer",
    ({ roomId, answer }) => {

      socket.to(roomId).emit(
        "answer",
        answer
      );

    }
  );

  socket.on(
    "ice_candidate",
    ({ roomId, candidate }) => {

      socket.to(roomId).emit(
        "ice_candidate",
        candidate
      );

    }
  );

  socket.on("disconnect", () => {

    console.log("User Disconnected");

  });

});

// MIDDLEWARE

app.use(cors());

app.use(express.json());

// SERVE UPLOADED FILES

app.use(
  "/uploads",
  express.static("uploads")
);
app.use(
  "/api/resume",
  resumeRoutes
);

app.use(
  "/api/resume-ai",
  resumeAI
);



// ROUTES

app.use("/api/auth", authRoutes);

app.use("/api/notes", noteRoutes);

app.use("/api/ai", aiRoutes);

app.use(
  "/api/history",
  chatHistoryRoutes
);

app.use("/api/upload", uploadRoutes);

app.use("/api/files", fileRoutes);

app.use("/api/admin", adminRoutes);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/activity",
  activityRoutes
);

// TEST ROUTE

app.get("/", (req, res) => {

  res.send("API Running");

});

// SERVER

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});