import { useEffect, useState } from "react";
import type { Animal } from "../types";
import { useAnimal } from "./useContexts";

export function useAnimalDatabase() {
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [isSorted, setIsSorted] = useState<string | null>(null);
    const [filter, setFilter] = useState("");
    const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);

    const { animals, setAnimals } = useAnimal();

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
        sortBy,
        sortByDate,
        isAscending,
        isSorted,
        setIsSorted,
        filteredAnimals,
        setFilter
    };
}