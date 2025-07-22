import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../utils/api";
import { useEffect, useState } from "react";
import Loader from "../Loader";

export default function GenreForm() {
  const api = useApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [sent, setSent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [genre, setGenre] = useState({ name: "" });

  useEffect(() => {
    if (id) {
      api
        .get(`/genres/${id}`)
        .then((res) => {
          setGenre((prev) => (prev.name ? prev : { name: res.data.name }));
        })
        .catch((err) => {
          setError("Genre could not be loaded");
          console.log(err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, api]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: genre.name,
    };

    const request = id
      ? api.put(`/genres/${id}`, payload)
      : api.post("/genres/", payload);
    console.log("Odesilam payload:", payload);

    request
      .then(() => {
        setSent(true);
        setSuccess(true);
        navigate("/genres");
      })
      .catch((error) => {
        console.error("Chyba pri odesilani:", error);
        setError(error.message);
        setSent(true);
        setSuccess(false);
      });
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">
        {id ? "Edit Genre" : "Add Genre"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-gray-900 p-4 rounded-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">
            Genre
          </label>
          <input
            id="name"
            type="text"
            value={genre.name}
            onChange={(e) => setGenre({ ...genre, name: e.target.value })}
            className="w-full p-2 rounded bg-gray-600 text-white"
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
