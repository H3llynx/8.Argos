import { Animals } from "../animals/Animals";
import { Login } from "../auth/components/login/Login";
import { useAuth } from "../auth/hooks/useAuth";

export function Home() {
    const { user, loading } = useAuth();

    return (
        <main>
            {loading && <p>Loading</p>}
            {!user && !loading && <Login />}
            {user && <Animals />}
        </main>
    )
}