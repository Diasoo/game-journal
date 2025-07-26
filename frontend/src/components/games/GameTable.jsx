import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";

export default function GameTable({ data }) {
  const navigate = useNavigate();

  if (!data.length) return <p className="pt-16">No records</p>;

  return (
    <table className="min-w-full table-auto border-collapse border-2 border-gray-600">
      <thead className="bg-gray-700 text-left uppercase text-gray-300">
        <tr>
          <th className="px-4 py-2 border border-gray-600">Title</th>
          <th className="px-4 py-2 border border-gray-600">Release date</th>
          <th className="px-4 py-2 border border-gray-600">Genre</th>
          <th className="px-4 py-2 border border-gray-600">Platforms</th>
          <th className="px-4 py-2 border border-gray-600">Developer</th>
          <th className="px-4 py-2 border border-gray-600">Publisher</th>
        </tr>
      </thead>
      <tbody className="text-gray-200">
        {data.map((game) => (
          <tr
            key={game.id}
            onClick={() => navigate(`/games/${game.id}`)}
            className="hover:bg-gray-800 hover:cursor-pointer  even:bg-black"
          >
            <td className="px-4 py-2 border border-gray-600 text-gray-200">
              {game.title}
            </td>
            <td className="px-4 py-2 border border-gray-600 text-gray-200">
              {formatDate(game.release_date)}
            </td>
            <td className="px-4 py-2 border border-gray-600 text-gray-200">
              {game.genre.map((genre) => (
                <li
                  key={genre.id}
                  className="bg-blue-200 text-blue-800 px-2 py-1 rounded flex my-2"
                >
                  {genre.name}
                </li>
              ))}
            </td>
            <td className="px-4 py-2 border border-gray-600 text-gray-200">
              {game.platform.map((platform) => (
                <li
                  key={platform.id}
                  className="bg-green-200 text-green-800 px-2 py-1 rounded flex my-2"
                >
                  {platform.name}
                </li>
              ))}
            </td>
            <td className="px-4 py-2 border border-gray-600 text-gray-200">
              {game.developer}
            </td>
            <td className="px-4 py-2 border border-gray-600 text-gray-200">
              {game.publisher}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
