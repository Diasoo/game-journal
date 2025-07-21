import { useState } from "react";
import { useApi } from "../../utils/api";
import Loader from "../Loader";
import { useEffect } from "react";
import PlatformTable from "./PlatformList.jsx";
import { Link } from "react-router-dom";

export default function PlatformIndex() {
  const api = useApi();
  const [platforms, setPlatforms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/platforms")
      .then((res) => setPlatforms(res.data))
      .catch((err) => {
        console.log(err);
        setError("Could not get the data.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (deletedId) => {
    setPlatforms((prev) => prev.filter((p) => p.id !== deletedId));
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl float-start font-bold">Platforms</h1>
        <Link
          to="/platforms/create"
          className="m-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded float-end"
        >
          ➕ Create New Platform
        </Link>
      </div>
      <hr className="mb-4" />
      <PlatformTable data={platforms} onDelete={handleDelete} />
    </div>
  );
}
