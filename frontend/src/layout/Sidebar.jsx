import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white h-screen p-4 flex flex-col gap-4">
      <div className="font-sans text-xl font-bold mb-6">GameJournal</div>

      <nav className="flex flex-col gap-2">
        <Link to="/" className="hover:bg-gray-700 rounded p-1 ps-2">
          🏠 Home
        </Link>
        <Link to="/game-logs" className="hover:bg-gray-700 rounded p-1 ps-2">
          🎮 Game Log
        </Link>
        <Link to="/platforms" className="hover:bg-gray-700 rounded p-1 ps-2">
          🖥️ Platforms
        </Link>
        <Link to="/genres" className="hover:bg-gray-700 rounded p-1 ps-2">
          🏷️ Genres
        </Link>
        <Link to="/games" className="hover:bg-gray-700 rounded p-1 ps-2">
          🎮 Games
        </Link>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <SignedIn>
          <UserButton></UserButton>
          <SignOutButton className="m-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded float-end">
            🚪 Sign Out
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <Link
            to="/sign-in"
            className="m-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded float-end"
          >
            🔑 Log In
          </Link>
          <Link
            to="/sign-up"
            className="m-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded float-end"
          >
            📝 Sign Up
          </Link>
        </SignedOut>
      </div>
    </aside>
  );
}
