import { useState } from "react";
import ConfirmDeleteModal from "../ConfirmDeleteModal.jsx";
import { useApi } from "../../utils/api.js";

export default function PlatformTable({ data, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const api = useApi();

  const handleDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/platforms/${selectedId}/`);
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
        {data.map((platform) => (
          <li key={platform.id} className="my-1 group flex">
            {platform.name}
            <div class="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <a href={`/platforms/edit/${platform.id}`} className="ml-2">
                ✏️
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(platform.id);
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
        name="Platform"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
