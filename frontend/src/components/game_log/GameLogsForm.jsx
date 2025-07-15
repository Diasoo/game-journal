import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useApi } from "../../utils/api.js";
import Loader from "../Loader.jsx";
import playthroughLabel from "../../utils/playthroughLabel.js";

export default function GameLogsForm() {
    const api = useApi();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    const [games, setGames] = useState([]);
    const [gameLogs, setGameLogs] = useState({
        game: null,
        playthrough_type: null,
        status: null,
        rating: "",
        hours_played: "",
        started_at: "",
        finished_at: "",
        replay: false,
    });

    const playthroughOptions = [
        { value: "story", label: "Story" },
        { value: "story_side", label: "Story + Side Quests" },
        { value: "completionist", label: "Completionist" },
    ];

    const statusOptions = [
        { value: "planned", label: "Planned" },
        { value: "playing", label: "Playing" },
        { value: "paused", label: "Paused" },
        { value: "dropped", label: "Dropped" },
        { value: "completed", label: "Completed" },
    ];

    useEffect(() => {
        api.get("/games/")
            .then((res) => {
                console.log("Hry z backendu:", res.data);
                const gameOptions = res.data.map((game) => ({
                    value: game.id,
                    label: game.title,
                }));
                setGames(gameOptions);
            })
            .catch((err) => {
                setError("Games could not be loaded");
                console.error(err);
            });

        if (id) {
            api.get(`/game_logs/${id}/`)
                .then((gameLog) => {
                    setGameLogs({
                        ...gameLog.data,
                        game: { value: gameLog.data.game.id, label: gameLog.data.game.title },
                        status: gameLog.data.status,
                        playthrough_type: gameLog.data.playthrough_type,
                    });
                })
                .catch((err) => {
                    setError("Game logs could not be loaded");
                    console.error(err);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            game: gameLogs.game?.value,
            playthrough_type: gameLogs.playthrough_type,
            status: gameLogs.status,
            rating: Number(gameLogs.rating),
            hours_played: Number(gameLogs.hours_played),
            replay: gameLogs.replay,
        };

        if (gameLogs.started_at) {
            payload.started_at = gameLogs.started_at;
        }
        if (gameLogs.finished_at) {
            payload.finished_at = gameLogs.finished_at;
        }

        const request = id
            ? api.put(`/game_logs/${id}/`, payload)
            : api.post("/game_logs/", payload);
        console.log("Odesílám payload:", payload);


        request
            .then(() => {
                setSent(true);
                setSuccess(true);
                navigate("/game-logs");
            })
            .catch((error) => {
                console.error("Chyba při odesílání:", error);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    if (loading) return <Loader />;

    return (
        <div className="">
            <h1 className="mb-4 text-xl font-bold">{id ? "Edit Game Log" : "Add Game Log"}</h1>

            <form onSubmit={handleSubmit} className="bg-neutral-900 p-4 rounded-lg">
                <div className="mb-4">
                    <label htmlFor="game" className="block mb-1 font-medium">
                        Game
                    </label>
                    <Select
                        options={games}
                        value={gameLogs.game}
                        onChange={(option) => setGameLogs({ ...gameLogs, game: option })}
                        placeholder="Choose a game..."
                        className="text-black bg-neutral-600"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="playthrough_type" className="block mb-1 font-medium">
                        Playthrough Type
                    </label>
                    <Select
                        options={playthroughOptions}
                        value={playthroughLabel(gameLogs.playthrough_type)}
                        onChange={(option) =>
                            setGameLogs({ ...gameLogs, playthrough_type: option.value })
                        }
                        placeholder="Choose a playstyle..."
                        className="text-black bg-neutral-600"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="hours_played" className="block mb-1 font-medium">
                        Hours Played
                    </label>
                    <input
                        id="hours_played"
                        type="number"
                        value={gameLogs.hours_played}
                        onChange={(e) =>
                            setGameLogs({ ...gameLogs, hours_played: e.target.value })
                        }
                        className="w-full p-2 rounded bg-neutral-600 text-white"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="rating" className="block mb-1 font-medium">
                        Rating
                    </label>
                    <input
                        id="rating"
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={gameLogs.rating}
                        onChange={(e) => setGameLogs({ ...gameLogs, rating: e.target.value })}
                        className="w-full p-2 rounded bg-neutral-600 text-white"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="started_at" className="block mb-1 font-medium">
                        Started At
                    </label>
                    <input
                        id="started_at"
                        type="date"
                        value={gameLogs.started_at}
                        onChange={(e) => setGameLogs({ ...gameLogs, started_at: e.target.value })}
                        className="w-full p-2 rounded bg-neutral-600 text-white"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="finished_at" className="block mb-1 font-medium">
                        Finished At
                    </label>
                    <input
                        id="finished_at"
                        type="date"
                        value={gameLogs.finished_at}
                        onChange={(e) => setGameLogs({ ...gameLogs, finished_at: e.target.value })}
                        className="w-full p-2 rounded bg-neutral-600 text-white"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="status" className="block mb-1 font-medium">
                        Status
                    </label>
                    <Select
                        options={statusOptions}
                        value={statusOptions.find(
                            (option) => option.value === gameLogs.status
                        )}
                        onChange={(option) =>
                            setGameLogs({ ...gameLogs, status: option.value })
                        }
                        placeholder="Choose a status..."
                        className="text-black bg-neutral-600"
                    />
                </div>

                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={gameLogs.replay}
                            onChange={(e) => setGameLogs({ ...gameLogs, replay: e.target.checked })}
                            className="form-checkbox text-blue-600"
                        />
                        <span className="ml-2">Replay</span>
                    </label>
                </div>



                <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Uložit
                </button>
            </form>

            {sentState && successState && (
                <div className="text-green-400 mt-3">✅ Záznam úspěšně uložen.</div>
            )}
            {sentState && !successState && (
                <div className="text-red-400 mt-3">❌ Chyba při ukládání: {errorState}</div>
            )}
        </div>
    );
}
