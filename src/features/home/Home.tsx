import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Animals } from "../animals/Animals";
import { useAuth } from "../auth/hooks/useAuth";

export function Home() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/auth")
        }
    })

    return (
        <main>
            {loading && <p>Loading</p>}
            {user && <Animals />}
        </main>
    )
}