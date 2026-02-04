import { createContext } from 'react';
import type { Animal } from '../types';

export type AnimalContextType = {
    animalToEdit: Animal | null;
    editedAnimal: Animal | null;
    setEditedAnimal: (animal: Animal | null) => void;
    handleUpdate: (e: React.SubmitEvent) => Promise<void>;
    setAnimalToEdit: (animal: Animal | null) => void;
};

export const AnimalContext = createContext<AnimalContextType | null>(null);