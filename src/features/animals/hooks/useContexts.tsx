import { useContext } from "react";
import { AnimalContext } from "../context/AnimalContext";
import { AnimalUpdateContext } from "../context/AnimalUpdateContext";
import { AnimalTableContext } from "../context/TableContext";

export const useAnimal = () => {
    const context = useContext(AnimalContext);
    if (!context) {
        throw new Error("Context / provider issue")
    }
    return context;
};

export const useEdit = () => {
    const context = useContext(AnimalUpdateContext);
    if (!context) {
        throw new Error("Context / provider issue")
    }
    return context;
};

export const useTable = () => {
    const context = useContext(AnimalTableContext);
    if (!context) {
        throw new Error("Context / provider issue")
    }
    return context;
};