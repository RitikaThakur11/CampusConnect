import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Chat from "./pages/Chat";
import AIChat from "./pages/AIChat";
import Upload from "./pages/Upload";

import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

import ResumeAnalyzer from "./pages/ResumeAnalyzer";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/notes"
          element={<Notes />}
        />

        <Route
          path="/chat"
          element={<Chat />}
        />

        <Route
          path="/ai"
          element={<AIChat />}
        />
        <Route
  path="/upload"
  element={<Upload />}
/>
        

        <Route
          path="/profile"
          element={<Profile />}
        />

      <Route
  path="/admin"
  element={<Admin />}
/>
        

        <Route
          path="/resume"
          element={<ResumeAnalyzer />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;