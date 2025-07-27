import { useEffect, useState } from "react";
import Loader from "../Loader.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../utils/api.js";
import ConfirmDeleteModal from "../ConfirmDeleteModal.jsx";
import formatDate from "../../utils/formatDate.js";

export default function GameDetail() {
  const api = useApi();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [game, setGame] = useState({});

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/games/${id}/`);
      setIsModalOpen(false);
      navigate("/games");
    } catch (err) {
      console.log("Chyba pri mazani: ", err);
    }
  };

  useEffect(() => {
    api
      .get(`/games/${id}/`)
      .then((res) => setGame(res.data))
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
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4 float-left">{game.title}</h1>
        <div>
          <Link to={`/games/edit/${game.id}`}>
            <button className="m-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded h-8">
              ✏️ Edit Game
            </button>
          </Link>
          <button
            onClick={() => handleDelete()}
            className="m-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded h-8"
          >
            🗑️ Delete Game
          </button>
        </div>
        <ConfirmDeleteModal
          name="Game"
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>
      <hr className="mb-4" />
      <ul className=" text-gray-200 border border-gray-700 rounded-xl p-3 mb-4">
        {game.description}
      </ul>
      <ul className="mb-2 text-gray-200">DEVELOPER: {game.developer}</ul>
      <ul className="mb-2 text-gray-200">PUBLISHER: {game.publisher}</ul>
      <ul className="mb-2 text-gray-200">
        RELEASE DATE: {formatDate(game.release_date)}
      </ul>
      <ul className="mb-2 text-gray-200 flex items-center">
        <p className="mr-2">GENRES:</p>
        {game.genre.map((genre) => (
          <li
            key={genre.id}
            className="bg-blue-200 text-blue-800 px-2 py-1 rounded m-1 inline-flex"
          >
            {genre.name}
          </li>
        ))}
      </ul>
      <ul className="mb-2 text-gray-200 flex items-center">
        <p className="mr-2">PLATFORMS:</p>
        {game.platform.map((platform) => (
          <li
            key={platform.id}
            className="bg-green-200 text-green-800 px-2 py-1 rounded m-1 inline-flex"
          >
            {platform.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
