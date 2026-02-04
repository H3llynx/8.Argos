import { useEffect, useState } from 'react';
import Add from "../../assets/svg/add.svg?react";
import { Button } from '../../components/atoms/Button/Button';
import { AddForm } from './components/AddForm/AddForm';
import { AnimalTable } from './components/AnimalTable/AnimalTable';
import { EditForm } from './components/EditForm/EditForm';
import { deleteAnimal, fetchAnimals, updateAnimal } from './services/animals';
import { hostImg } from './services/picture-hosting';
import type { Animal } from './types';

export function Animals() {
    const [animals, setAnimals] = useState<Animal[] | null>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null)
    const [editedAnimal, setEditedAnimal] = useState<Animal | null>(null);
    const [animalToDelete, setAnimalToDelete] = useState<Animal | null>(null);
    const [newPhoto, setNewPhoto] = useState<File | null>(null);
    const [reload, setReload] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

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
        if (!isEditing) setAnimalToEdit(null);
    }, [isEditing]);

    useEffect(() => {
        if (isAdding) setIsEditing(false);
    }, [isAdding]);

    useEffect(() => {
        if (isEditing) setIsAdding(false);
    }, [isEditing]);

    const handleEdit = (animal: Animal) => {
        if (!animalToEdit || animalToEdit === animal) {
            setIsEditing(!isEditing);
        }
        setNewPhoto(null);
        setAnimalToEdit(animal);
        setEditedAnimal(animal)
    };

    const handleDelete = async (animal: Animal) => {
        setAnimalToDelete(animal);
        await deleteAnimal(animalToDelete!.id);
        setReload(true);
    };

    const handleAdd = () => {
        setIsAdding(!isAdding);
    }

    const handleChange = (field: keyof Animal, value: string) => {
        if (editedAnimal) {
            const required = ["name", "location"]
            const updatedValue = required.includes(field) && !value
                ? animalToEdit![field]
                : value;
            setEditedAnimal({ ...editedAnimal, [field]: updatedValue })
        }
    };

    const handlePhotoUpdate = async (file: File | null) => {
        if (editedAnimal && file) {
            setNewPhoto(file);
            const newUrl = await hostImg(file);
            setEditedAnimal({ ...editedAnimal, photo_url: newUrl })
        }
    };

    const handleUpdate = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (newPhoto) {
            await handlePhotoUpdate(newPhoto);
        }
        if (editedAnimal === animalToEdit) { return }
        else {
            updateAnimal(editedAnimal!);
            setReload(true);
            setAnimalToEdit(null);
            setIsEditing(false);
        }
    };

    return (
        <section className="flex justify-center xl:justify-between w-full flex-wrap gap-4">
            <div className="flex flex-col gap-1 pb-2 overflow-hidden max-w-full xl:max-w-1/2">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {animals &&
                    <AnimalTable
                        animals={animals}
                        onEditAnimal={handleEdit}
                        onDeleteAnimal={handleDelete}
                    />
                }
                <Button variant="add" className="w-min" onClick={handleAdd}><Add aria-hidden="true" className="w-1" />Add</Button>
            </div>
            <div className="flex flex-col gap-1 w-full max-w-xl">
                {isEditing && animalToEdit &&
                    <EditForm
                        animalToEdit={animalToEdit}
                        editedAnimal={editedAnimal!}
                        onNameChange={(e) => handleChange("name", e.target.value)}
                        onTypeChange={(e) => handleChange("type", e.target.value)}
                        onSexChange={(e) => handleChange("sex", e.target.value)}
                        onAgeChange={(e) => handleChange("age", e.target.value)}
                        onSizeChange={(e) => handleChange("size", e.target.value)}
                        onBreedChange={(e) => handleChange("breed", e.target.value)}
                        onLocationChange={(e) => handleChange("location", e.target.value)}
                        onPhotoSelected={handlePhotoUpdate}
                        handleUpdate={handleUpdate}
                    />
                }
                {isAdding &&
                    <AddForm />
                }
            </div>
        </section>
    );
}