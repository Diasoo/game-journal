import { useState } from "react";
import { useApi } from "../../utils/api";
import Loader from "../Loader";
import { useEffect } from "react";
import PlatformTable from "./PlatformList.jsx";

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

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl float-start">Platforms</h1>
      </div>
      <PlatformTable data={platforms} />
    </div>
  );
}
