import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Loading } from "../../components/atoms/Loading/Loading";
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
        <main>
            {loading && <Loading />}
            {user && <Animals />}
        </main>
    )
}