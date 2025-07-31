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

  const handleDelete = () => {
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
      <div className="flex mb-4 justify-between">
        <h1 className="text-2xl font-bold mb-4 float-left">
          {gameLog.game.title}
        </h1>
        <div>
          <Link to={`/game-logs/edit/${gameLog.id}`}>
            <button className="m-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded h-8">
              ✏️ Edit Game Log
            </button>
          </Link>
          <button
            onClick={() => handleDelete()}
            className="m-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded h-8"
          >
            🗑️ Delete Game Log
          </button>
        </div>
        <ConfirmDeleteModal
          name="Game Log"
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>
      <hr className="mb-4" />
      <ul>
        <li className="mb-1 text-gray-200">Rating: {gameLog.rating}</li>
        <li className="mb-1 text-gray-200">
          Hours played: {formatHours(gameLog.hours_played)}
        </li>
        <li className="mb-1 text-gray-200">
          Started at: {formatDate(gameLog.started_at)}
        </li>
        <li className="mb-1 text-gray-200">
          Finished at: {formatDate(gameLog.finished_at)}
        </li>
        <li className="mb-1 text-gray-200">
          Status: {capitalizeWords(gameLog.status)}
        </li>
        <li className="mb-1 text-gray-200">
          Type of playthrough:{" "}
          {playthroughOptions.find(
            (opt) => opt.value === gameLog.playthrough_type,
          )?.label || "-"}
        </li>
        <li className="mb-1 text-gray-200">
          Replayed: {gameLog.replay ? "Yes" : "No"}
        </li>
      </ul>
    </div>
  );
}
