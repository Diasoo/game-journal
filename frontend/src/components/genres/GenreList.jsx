import { useState } from "react";
import ConfirmDeleteModal from "../ConfirmDeleteModal.jsx";
import { useApi } from "../../utils/api.js";
import { Link } from "react-router-dom";

export default function GenreList({ data, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const api = useApi();

  const handleDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/genres/${selectedId}/`);
      console.log("Odstranuji zaznam");
      setIsModalOpen(false);
      if (onDelete) onDelete(selectedId);
    } catch (err) {
      console.log("Chyba pri mazani: ", err);
    }
  };

  if (!data.length) return <p className="pt-16">No records</p>;

  return (
    <>
      <ul>
        {data.map((genre) => (
          <li key={genre.id} className="my-1 group flex">
            {genre.name}
            <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link to={`/genres/edit/${genre.id}`} className="ml-2">
                ✏️
              </Link>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(genre.id);
                }}
                className="inline-flex items-center"
              >
                🗑️
              </a>
            </div>
          </li>
        ))}
      </ul>
      <ConfirmDeleteModal
        name="Genre"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
