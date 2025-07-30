import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useApi } from "../../utils/api.js";
import Loader from "../Loader.jsx";

export default function GameForm() {
  const api = useApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [sent, setSent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [games, setGames] = useState({
    title: "",
    description: "",
    developer: "",
    publisher: "",
    release_date: "",
    genre: null,
    platform: null,
  });

  useEffect(() => {
    api
      .get("/genres/")
      .then((res) => {
        console.log("Genres from backend: ", res.data);
        const genreOptions = res.data.map((genre) => ({
          value: genre.id,
          label: genre.name,
        }));
        setGenres(genreOptions);
      })
      .catch((err) => {
        setError("Genres could not be loaded");
        console.log(err);
      });

    api
      .get("/platforms")
      .then((res) => {
        console.log("Platforms from backend: ", res.data);
        const platformOptions = res.data.map((platform) => ({
          value: platform.id,
          label: platform.name,
        }));
        setPlatforms(platformOptions);
      })
      .catch((err) => {
        setError("Platforms could not be loaded");
        console.log(err);
      });

    if (id) {
      api
        .get(`/games/${id}`)
        .then((game) => {
          setGames({
            ...game.data,
            genre: Array.isArray(game.data.genre)
              ? game.data.genre.map((g) => ({
                  value: g.id,
                  label: g.name,
                }))
              : [],
            platform: Array.isArray(game.data.platform)
              ? game.data.platform.map((p) => ({
                  value: p.id,
                  label: p.name,
                }))
              : [],
          });
        })
        .catch((err) => {
          setError("Games could not be loaded");
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
      title: games.title,
      description: games.description,
      developer: games.developer,
      publisher: games.publisher,
      release_date: games.release_date,
      genre: games.genre?.map((g) => g.value),
      platform: games.platform?.map((p) => p.value),
    };

    const request = id
      ? api.put(`/games/${id}`, payload)
      : api.post("/games/", payload);
    console.log("Odesilam payload:", payload);

    request
      .then(() => {
        setSent(true);
        setSuccess(true);
        navigate("/games");
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
    <div>
      <h1 className="mb-4 text-xl font-bold">
        {id ? "Edit Game" : "Add Game"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={games.title}
            onChange={(e) => setGames({ ...games, title: e.target.value })}
            className="w-full p-2 rounded bg-gray-600 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <input
            id="description"
            type="text"
            value={games.description}
            onChange={(e) =>
              setGames({ ...games, description: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-600 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="developer" className="block font-medium">
            Developer
          </label>
          <input
            id="developer"
            type="text"
            value={games.developer}
            onChange={(e) => setGames({ ...games, developer: e.target.value })}
            className="w-full p-2 rounded bg-gray-600 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="publisher" className="block font-medium">
            Publisher
          </label>
          <input
            id="publisher"
            type="text"
            value={games.publisher}
            onChange={(e) => setGames({ ...games, publisher: e.target.value })}
            className="w-full p-2 rounded bg-gray-600 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="release_date" className="block font-medium">
            Release date
          </label>
          <input
            id="release_date"
            type="date"
            value={games.release_date}
            onChange={(e) =>
              setGames({ ...games, release_date: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-600 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="genre" className="block font-medium">
            Genre
          </label>
          <Select
            id="genre"
            value={games.genre}
            options={genres}
            isMulti
            onChange={(selectedOptions) =>
              setGames({ ...games, genre: selectedOptions })
            }
            placeholder="Choose genres..."
            className="text-black bg-gray-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="platform" className="block font-medium">
            Platform
          </label>
          <Select
            id="platform"
            value={games.platform}
            options={platforms}
            isMulti
            onChange={(selectedOptions) =>
              setGames({ ...games, platform: selectedOptions })
            }
            placeholder="Choose platforms..."
            className="text-black bg-gray-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>

      {sent && success && (
        <div className="text-green-400 mt-3">✅ Záznam úspěšně uložen.</div>
      )}
      {sent && !success && (
        <div className="text-red-400 mt-3">❌ Chyba při ukládání: {error}</div>
      )}
    </div>
  );
}
