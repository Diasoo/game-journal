import { useNavigate } from "react-router-dom";
import formatHours from "../../utils/formatHours.js";

export default function GameLogsTable({ data }) {
  const navigate = useNavigate();

  if (!data.length) return <p className="pt-16">No records</p>;

  return (
    <table className="min-w-full table-auto border-collapse border-2 border-gray-600">
      <thead className="bg-gray-700 text-left uppercase text-gray-300">
        <tr>
          <th className="px-4 py-2 border border-gray-600">Game</th>
          <th className="px-4 py-2 border border-gray-600">Status</th>
          <th className="px-4 py-2 border border-gray-600">Spent time</th>
          <th className="px-4 py-2 border border-gray-600">Rating</th>
          <th className="px-4 py-2 border border-gray-600">Playstyle</th>
        </tr>
      </thead>
      <tbody className="text-gray-200">
        {data.map((log) => (
          <tr
            key={log.id}
            onClick={() => navigate(`/game-logs/${log.id}`)}
            className="hover:bg-gray-800 hover:cursor-pointer even:bg-black"
          >
            <td className="px-4 py-2 border border-gray-600 text-gray-200">
              {log.game.title}
            </td>
            <td className="px-4 py-2 border border-gray-600 text-gray-200">
              {log.status_display}
            </td>
            <td className="px-4 py-2 border border-gray-600 text-gray-200">
              {formatHours(log.hours_played)} h
            </td>
            <td className="px-4 py-2 border border-gray-600 text-gray-200">
              {log.rating ?? "–"}
            </td>
            <td className="px-4 py-2 border border-gray-600 text-gray-200">
              {log.playthrough_type_display}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
