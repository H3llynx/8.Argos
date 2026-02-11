import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { databases } from "../../../config";
import { fetchData } from "../../../services/services";
import { useAuth } from "../../auth/hooks/useAuth";
import type { Animal } from "../types";
import { AnimalContext } from "./AnimalContext";

export function AnimalProvider({ children }: { children: ReactNode }) {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);
    const { user } = useAuth();

    useEffect(() => {
        const init = async () => {
            const { data, error } = await fetchData(databases.animal);
            if (error) setError(error.message ? error.message : "Error fetching data");
            else if (data) {
                const sortedAnimals = [...data].sort((a, b) => {
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                });
                setAnimals(sortedAnimals)
            }
            setLoading(false);
            setReload(false);
        }
        init();
    }, [reload, user]);

    return (
        <AnimalContext value={{ animals, loading, error, reload, setAnimals, setReload }}>
            {children}
        </AnimalContext>
    );
}