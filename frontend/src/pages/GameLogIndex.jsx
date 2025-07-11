import { useEffect, useState } from "react";
import { useApi } from "../utils/api.js";
import GameLogTable from "../components/GameLogTable";
import Loader from "../components/Loader.jsx";

export default function GameLogList() {
    const api = useApi();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("/game_logs/")
            .then(setLogs)
            .catch((err) => {
                console.error("Chyba při načítání:", err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500">❌ {error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Game Logs</h1>
            <GameLogTable logs={logs} />
        </div>
    );
}
