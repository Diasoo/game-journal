import { useEffect, useState } from "react";
import { useApi } from "../../utils/api.js";
import GameLogsTable from "./GameLogsTable.jsx";
import Loader from "../Loader.jsx";
import { Link } from "react-router-dom";

export default function GameLogList() {
  const api = useApi();
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({});
  const [statsPerYear, setStatsPerYear] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/game_logs")
      .then((res) => setLogs(res.data))
      .catch((err) => {
        console.log(err);
        setError("Data could not be loaded.");
      })
      .finally(() => setLoading(false));

    api
      .get("/game_logs/stats")
      .then((res) => setStats(res.data))
      .catch((err) => {
        console.log(err);
        setError("Data could not be loaded.");
      });

    api
      .get("game_logs/stats/per_year")
      .then((res) => setStatsPerYear(res.data))
      .catch((err) => {
        console.log(err);
        setError("Data could not be loaded.");
      });
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold float-start">My Game Logs</h1>
        <Link
          to="/game-logs/create"
          className="m-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded float-end"
        >
          ➕ Create New Game Log
        </Link>
      </div>
      <hr className="mb-4" />
      <GameLogsTable data={logs} />
      <hr className="my-4" />
      <ul>
        <li className="mb-1 text-gray-200">
          Number of logs: {stats.total_logs}
        </li>
        <li className="mb-1 text-gray-200">
          Total playtime: {stats.total_hours_played}
        </li>
        <li className="mb-1 text-gray-200">
          Average playtime: {stats.average_hours_played}
        </li>
        <li className="mb-1 text-gray-200">
          Average rating: {stats.average_rating}
        </li>
        <li className="mb-1 text-gray-200">
          Number of replays: {stats.replay_count}
        </li>
        <li className="mb-1 text-gray-200">
          Best rated game: {stats.best_rated_game.game} -{" "}
          {stats.best_rated_game.rating}
        </li>
        <li className="mb-1 text-gray-200">
          Worst rated game: {stats.worst_rated_game.game} -{" "}
          {stats.worst_rated_game.rating}
        </li>
        <li className="mb-1 text-gray-200">
          Most played game: {stats.most_hours_played.game} -{" "}
          {stats.most_hours_played.hours_played} h
        </li>
      </ul>
      {statsPerYear.number_of_games}
    </div>
  );
}
