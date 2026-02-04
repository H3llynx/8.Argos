import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Animals } from "../animals/Animals";
import { useAuth } from "../auth/hooks/useAuth";

export function Home() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !loading) {
            navigate("/auth")
        }
    })

    return (
        <main className="flex w-full max-w-[1400px] m-auto p-2">
            {loading && <p>Loading</p>}
            {user && <Animals />}
        </main>
    )
}