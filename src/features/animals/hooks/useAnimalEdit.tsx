import { useEffect, useState } from "react";
import { updateAnimal } from "../services/animals";
import type { Animal } from "../types";

export function useAnimalEdit() {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null)
    const [editedAnimal, setEditedAnimal] = useState<Animal | null>(null);

    useEffect(() => {
        if (!isEditing) {
            setAnimalToEdit(null);
            setEditedAnimal(null);
        }
    }, [isEditing]);

    const handleEdit = (animal: Animal) => {
        if (!animalToEdit || animalToEdit === animal) {
            setIsEditing(!animalToEdit);
        }
        setAnimalToEdit(animal);
        setEditedAnimal(animal);
    };

    const handleUpdate = async (e: React.SubmitEvent, onSuccess: () => void) => {
        e.preventDefault();
        if (editedAnimal === animalToEdit) { return }
        else {
            updateAnimal(editedAnimal!);
            onSuccess();
            setAnimalToEdit(null);
            setIsEditing(false);
        }
    };

    return {
        isEditing,
        setIsEditing,
        animalToEdit,
        editedAnimal,
        setEditedAnimal,
        handleEdit,
        handleUpdate,
        setAnimalToEdit
    };
}