import {useNavigate} from "react-router-dom";
import formatHours from "../../utils/formatHours.js";


export default function GameLogsTable({ data }) {
    const navigate = useNavigate();

    if (!data.length) return <p className="pt-16">No records</p>;

    return (
        <table className="min-w-full table-auto border-collapse border-2 border-neutral-600">
            <thead className="bg-neutral-900 text-left uppercase text-neutral-400">
            <tr>
                <th className="px-4 py-2 border border-neutral-600">Game</th>
                <th className="px-4 py-2 border border-neutral-600">Status</th>
                <th className="px-4 py-2 border border-neutral-600">Spent time</th>
                <th className="px-4 py-2 border border-neutral-600">Rating</th>
                <th className="px-4 py-2 border border-neutral-600">Playstyle</th>
            </tr>
            </thead>
            <tbody className="text-neutral-200">
            {data.map((log) => (
                    <tr key={log.id} onClick={() => navigate(`/game-logs/${log.id}`)} className="hover:bg-gray-800 hover:cursor-pointer">
                        <td className="px-4 py-2 border border-neutral-600 ">{log.game.title}</td>
                        <td className="px-4 py-2 border border-neutral-600">{log.status_display}</td>
                        <td className="px-4 py-2 border border-neutral-600">{formatHours(log.hours_played)} h</td>
                        <td className="px-4 py-2 border border-neutral-600">{log.rating ?? "–"}</td>
                        <td className="px-4 py-2 border border-neutral-600">{log.playthrough_type_display}</td>
                    </tr>
            ))}
            </tbody>
        </table>
    );
}