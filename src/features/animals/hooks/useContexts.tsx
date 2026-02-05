import { useContext } from "react";
import { AnimalContext } from "../context/AnimalContext";
import { TableContext } from "../context/TableContext";

export const useAnimal = () => {
    const context = useContext(AnimalContext);
    if (!context) {
        throw new Error("Context / provider issue")
    }
    return context;
}

export const useTable = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error("Context / provider issue")
    }
    return context;
}