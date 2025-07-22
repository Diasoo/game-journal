import { useState } from "react";
import { useApi } from "../../utils/api";
import Loader from "../Loader";
import { useEffect } from "react";
import GenreList from "./GenreList.jsx";
import { Link } from "react-router-dom";

export default function GenreIndex() {
  const api = useApi();
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/genres")
      .then((res) => setGenres(res.data))
      .catch((err) => {
        console.log(err);
        setError("Could not get the data.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (deletedId) => {
    setGenres((prev) => prev.filter((p) => p.id !== deletedId));
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl float-start font-bold">Genres</h1>
        <Link
          to="/genres/create"
          className="m-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded float-end"
        >
          ➕ Create New Genre
        </Link>
      </div>
      <hr className="mb-4" />
      <GenreList data={genres} onDelete={handleDelete} />
    </div>
  );
}
