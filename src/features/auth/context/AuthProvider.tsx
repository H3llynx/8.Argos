
import type { User } from "@supabase/supabase-js";
import { useEffect, useState, type ReactNode } from "react";
import supabase from "../../../utils/supabase";
import { loadUser } from "../services/auth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const user = await loadUser();
            setUser(user);
            setLoading(false);
        }
        init();
        const result = supabase.auth.onAuthStateChange((event, session) => {
            const user = session ? session.user : null
            setUser(user);
        });
        const subscription = result.data.subscription;
        return () => subscription.unsubscribe();
    }, []);


    return (
        <AuthContext value={{ user, loading }}>
            {children}
        </AuthContext>
    );
}