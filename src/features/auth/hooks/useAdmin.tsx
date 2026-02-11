import { useEffect, useState } from "react";
import { getUserRole } from "../services/auth";
import { useAuth } from "./useAuth";

export const useAdmin = () => {
    const { user } = useAuth();
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        const init = async () => {
            if (!user) {
                setIsAdmin(false);
                return;
            }
            const role = await getUserRole(user.id);
            if (role === "admin") setIsAdmin(true);
        }
        init();
    }, [user]);

    return isAdmin;
}