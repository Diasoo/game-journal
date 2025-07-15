import { useEffect, useState } from "react";
import Loader from "../Loader.jsx";
import { useParams } from "react-router-dom";
import { useApi } from "../../utils/api.js";
import formatHours from "../../utils/formatHours.js";
import formatDate from "../../utils/formatDate.js";
import playthroughLabel from "../../utils/playthroughLabel.js";


export default function GameLogsDetail() {
    const api = useApi();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [gameLog, setGameLog] = useState({});
    const [error, setError] = useState(null);

    const playthroughOptions = [
        { value: "story", label: "Story" },
        { value: "story_side", label: "Story + Side Quests" },
        { value: "completionist", label: "Completionist" },
    ];

    useEffect(() => {
        api.get(`/game_logs/${id}/`)
            .then((res) => setGameLog(res.data))
            .catch((err) => {
                console.error("Error when loading:", err);
                setError(err.message);
        })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500">❌ {error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{gameLog.game.title}</h1>
            <hr className="mb-4"/>
            <ul className="mb-1">Rating: {gameLog.rating}</ul>
            <ul className="mb-1">Hours played: {formatHours(gameLog.hours_played)}</ul>
            <ul className="mb-1">Started at: {formatDate(gameLog.started_at)}</ul>
            <ul className="mb-1">Finished at: {formatDate(gameLog.finished_at)}</ul>
            <ul className="mb-1">Status: {gameLog.status}</ul>
            <ul className="mb-1">
                Type of playthrough: {
                playthroughOptions.find(opt => opt.value === gameLog.playthrough_type)?.label || "-"
            }
            </ul>
            <ul className="mb-1">Replayed: {gameLog.replay? "YES": "NO"}</ul>
        </div>
    );
}