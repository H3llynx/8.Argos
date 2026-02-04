import { createContext } from "react";
import type { Animal } from "../types";

type EditingContextType = {
    animalToEdit: Animal | null;
}

export const EditingContext = createContext<EditingContextType | null>(null);