import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import MainLayout from "./layout/MainLayout.jsx";
import Home from './pages/Home';
import GameLogIndex from './pages/GameLogIndex.jsx';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/game-log" element={<GameLogIndex />} />
                </Route>
                <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
                <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
            </Routes>
        </Router>
    );
}