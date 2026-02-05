import { useEffect, useState } from "react";
import { fetchAnimals } from "../services/animals";
import type { Animal } from "../types";

export function useAnimalDatabase() {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [isSorted, setIsSorted] = useState<string | null>(null);
    const [filter, setFilter] = useState("");
    const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);

    useEffect(() => {
        const init = async () => {
            const { data, error } = await fetchAnimals();
            if (error) setError(error.message ? error.message : "Error fetching data");
            else if (data) {
                const sortedAnimals = [...data].sort((a, b) => {
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                });
                setAnimals(sortedAnimals)
            }
            setLoading(false);
            setReload(false);
        }
        init();
    }, [reload]);

    useEffect(() => {
        if (filter.trim() === "") setFilteredAnimals(animals);
        else {
            const filteredAnimals = animals.find(animal => animal.name.toLowerCase().includes(filter.trim().toLowerCase()));
            setFilteredAnimals(filteredAnimals ? [filteredAnimals] : []);
        }
    }, [filter, animals])

    const sortBy = (field: keyof Animal) => {
        const newOrder = !isAscending;
        console.log(newOrder);
        setIsSorted(field);
        const sortedAnimals = [...animals].sort((a, b) => {
            const valueA = a[field] ?? "";
            const valueB = b[field] ?? "";
            return newOrder ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        });
        setIsAscending(newOrder);
        setAnimals(sortedAnimals);
    };

    const sortByDate = () => {
        const sortedAnimals = [...animals].sort((a, b) => {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        });
        setAnimals(sortedAnimals);
    };

    return {
        animals,
        loading,
        error,
        reload,
        setReload,
        sortBy,
        sortByDate,
        isAscending,
        isSorted,
        setIsSorted,
        filteredAnimals,
        setFilter
    };
}