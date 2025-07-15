import {useEffect, useState} from "react";
import {useApi} from "../../utils/api.js";
import GameLogsTable from "./GameLogsTable.jsx";
import Loader from "../Loader.jsx";
import {Link} from 'react-router-dom';

export default function GameLogList() {
    const api = useApi();
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/game_logs')
            .then((res) => setLogs(res.data))
            .catch((err) => {
                console.log(err);
                setError("Failed to load");
            })
            .finally(() => setLoading(false));
    }, []);


if (loading) return <Loader/>;
if (error) return <div className="text-red-500">❌ {error}</div>;

return (
    <div>
        <h1 className="text-2xl font-bold mb-4 float-start">My Game Logs</h1>
        <Link to="/game-logs/create"
              className="m-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded float-end">
            Create New Game Log
        </Link>
        <GameLogsTable data={logs}/>

    </div>
);
}
