import { useEffect, useState } from "react";
import { databases } from "../../../config";
import { updateData } from "../../../services/services";
import type { Animal } from "../types";

export function useAnimalEdit() {
    const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null)
    const [editedAnimal, setEditedAnimal] = useState<Animal | null>(null);

    useEffect(() => {
        if (!animalToEdit) {
            setEditedAnimal(null);
        }
    }, [animalToEdit]);

    const handleEdit = (animal: Animal) => {
        if (animalToEdit && animalToEdit === animal) {
            setAnimalToEdit(null);
        } else {
            setAnimalToEdit(animal);
            setEditedAnimal(animal);
        }
    };

    const handleUpdate = async (e: React.SubmitEvent, onSuccess: () => void) => {
        e.preventDefault();
        if (editedAnimal === animalToEdit || !editedAnimal) return;
        else {
            await updateData(editedAnimal, databases.animal);
            onSuccess();
            setAnimalToEdit(null);
        }
    };

    return {
        animalToEdit,
        editedAnimal,
        setEditedAnimal,
        handleEdit,
        handleUpdate,
        setAnimalToEdit
    };
}