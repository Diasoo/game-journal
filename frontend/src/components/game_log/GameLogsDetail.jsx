import { useEffect, useState } from "react";
import Loader from "../Loader.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../utils/api.js";
import ConfirmDeleteModal from "../ConfirmDeleteModal.jsx";
import formatHours from "../../utils/formatHours.js";
import formatDate from "../../utils/formatDate.js";
import capitalizeWords from "../../utils/capitalizeWords.js";

export default function GameLogsDetail() {
  const api = useApi();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [gameLog, setGameLog] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const playthroughOptions = [
    { value: "story", label: "Story" },
    { value: "story_side", label: "Story + Side Quests" },
    { value: "completionist", label: "Completionist" },
  ];

  const handleDelete = (id) => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/game_logs/${id}/`);
      console.log("Odstranuji zaznam");
      setIsModalOpen(false);
      navigate("/game-logs");
    } catch (err) {
      console.log("Chyba pri mazani: ", err);
    }
  };

  useEffect(() => {
    api
      .get(`/game_logs/${id}/`)
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4 float-left">
          {gameLog.game.title}
        </h1>
        <Link
          to={`/game-logs/edit/${gameLog.id}`}
          className="m-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded float-end"
        >
          Edit Game Log
        </Link>
        <button onClick={() => handleDelete()}>Delete Game Log</button>
        <ConfirmDeleteModal
          name="Game Log"
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>
      <hr className="mb-4" />
      <ul className="mb-1">Rating: {gameLog.rating}</ul>
      <ul className="mb-1">
        Hours played: {formatHours(gameLog.hours_played)}
      </ul>
      <ul className="mb-1">Started at: {formatDate(gameLog.started_at)}</ul>
      <ul className="mb-1">Finished at: {formatDate(gameLog.finished_at)}</ul>
      <ul className="mb-1">Status: {capitalizeWords(gameLog.status)}</ul>
      <ul className="mb-1">
        Type of playthrough:{" "}
        {playthroughOptions.find(
          (opt) => opt.value === gameLog.playthrough_type,
        )?.label || "-"}
      </ul>
      <ul className="mb-1">Replayed: {gameLog.replay ? "Yes" : "No"}</ul>
    </div>
  );
}
