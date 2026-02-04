import { useContext } from "react";
import { AnimalContext } from "../context/AnimalContext";
import { EditingContext } from "../context/EditingContext";

export const useAnimal = () => {
    const context = useContext(AnimalContext);
    if (!context) {
        throw new Error("Context / provider issue")
    }
    return context;
}

export const useEditing = () => {
    const context = useContext(EditingContext);
    if (!context) {
        throw new Error("Context / provider issue")
    }
    return context;
}