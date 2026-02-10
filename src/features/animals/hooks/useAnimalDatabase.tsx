import { useEffect, useState } from "react";
import { fetchData } from "../../../services/services";
import type { Animal } from "../types";

export function useAnimalDatabase() {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [isSorted, setIsSorted] = useState<string | null>(null);
    const [filter, setFilter] = useState("");
    const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);

    useEffect(() => {
        const init = async () => {
            const { data, error } = await fetchData("animals");
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
    }, [reload]);

    useEffect(() => {
        if (filter.trim() === "") setFilteredAnimals(animals);
        else {
            const filteredAnimals = animals.find(animal => animal.name.toLowerCase().includes(filter.trim().toLowerCase()));
            setFilteredAnimals(filteredAnimals ? [filteredAnimals] : []);
        }
    }, [filter, animals])

    const sortBy = (label: keyof Animal) => {
        const newOrder = !isAscending;
        console.log(newOrder);
        setIsSorted(label);
        const sortedAnimals = [...animals].sort((a, b) => {
            const valueA = a[label] ?? "";
            const valueB = b[label] ?? "";
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
        setAnimals,
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