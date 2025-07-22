import { useEffect, useState } from "react";
import { useApi } from "../../utils/api.js";
import GameTable from "./GameTable.jsx";
import Loader from "../Loader.jsx";
import { Link } from "react-router-dom";

export default function GameList() {
  const api = useApi();
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/games")
      .then((res) => setGames(res.data))
      .catch((err) => {
        console.log(err);
        setError("Login or register to see your game logs. ");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold float-start">Games</h1>
        <Link
          to="/games/create"
          className="m-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded float-end"
        >
          ➕ Create New Game
        </Link>
      </div>
      <hr className="mb-4" />
      <GameTable data={games} />
    </div>
  );
}
