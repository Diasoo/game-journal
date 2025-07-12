import { useEffect, useState } from "react";
import Loader from "../Loader.jsx";
import { useParams } from "react-router-dom";
import { useApi } from "../../utils/api.js";


export default function GameLogsDetail() {
    const api = useApi();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [gameLog, setGameLog] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get(`/game_logs/${id}/`)
            .then(setGameLog)
            .catch((err) => {
                console.error("Chyba při načítání:", err);
                setError(err.message);
        })
            .finally(() => setLoading(false));
    }, [id, api]);

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500">❌ {error}</div>;

    return (
        <div>{gameLog.rating}</div>
    );
}