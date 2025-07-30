import { useEffect, useState } from "react";
import { useApi } from "../../utils/api.js";
import GameLogsTable from "./GameLogsTable.jsx";
import Loader from "../Loader.jsx";
import { Link } from "react-router-dom";

export default function GameLogList() {
  const api = useApi();
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({});
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
      <ul>
        <li>{stats.average_hours_played}</li>
        <li>{stats.total_logs}</li>
      </ul>
    </div>
  );
}
