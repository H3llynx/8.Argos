
import type { User } from "@supabase/supabase-js";
import { useEffect, useState, type ReactNode } from "react";
import supabase from "../../../utils/supabase";
import { getUserRole, loadUser } from "../services/auth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        const init = async () => {
            const user = await loadUser();
            setUser(user);
            setLoading(false);
        }
        init();
        const result = supabase.auth.onAuthStateChange((_event, session) => {
            const user = session ? session.user : null
            setUser(user);
        });
        const subscription = result.data.subscription;
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const checkAdmin = async () => {
            if (!user) {
                setIsAdmin(false);
                return;
            }
            const role = await getUserRole(user.id);
            if (role === "admin") setIsAdmin(true);
        }
        checkAdmin();
    }, [user]);

    return (
        <AuthContext value={{ user, loading, isAdmin }}>
            {children}
        </AuthContext>
    );
}