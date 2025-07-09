import { useAuth } from "@clerk/clerk-react";

function MyComponent() {
    const { getToken } = useAuth();

    const fetchGameLogs = async () => {
        const token = await getToken();
        console.log("JWT token:", token); // jen pro ověření

        const res = await fetch("http://localhost:8000/api/game_logs/", {
            method: "GET", // nebo POST, PUT, atd.
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log("Backend response:", data);
    };

    return (
        <div>
            <button onClick={fetchGameLogs}>Načti game logy</button>
        </div>
    );
}
export default MyComponent;