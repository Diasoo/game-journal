import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout.jsx";
import Home from "./pages/Home";
import GameLogIndex from "./components/game_log/GameLogsIndex.jsx";
import GameLogsForm from "./components/game_log/GameLogsForm.jsx";
import GameLogsDetail from "./components/game_log/GameLogsDetail.jsx";
import PlatformIndex from "./components/platforms/PlatformIndex.jsx";
import PlatformForm from "./components/platforms/PlatformForm.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/game-logs">
            <Route index element={<GameLogIndex />} />
            <Route path=":id" element={<GameLogsDetail />} />
            <Route path="create" element={<GameLogsForm />} />
            <Route path="edit/:id" element={<GameLogsForm />} />
          </Route>
          <Route path="/platforms">
            <Route index element={<PlatformIndex />} />
            <Route path="create" element={<PlatformForm />} />
            <Route path="edit/:id" element={<PlatformForm />} />
          </Route>
        </Route>
        <Route
          path="/sign-in"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up"
          element={<SignUp routing="path" path="/sign-up" />}
        />
      </Routes>
    </Router>
  );
}
