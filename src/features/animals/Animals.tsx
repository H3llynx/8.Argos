import { useEffect, useState } from 'react';
import Add from "../../assets/svg/add.svg?react";
import { Button } from '../../components/atoms/Button/Button';
import { AddAnimal } from './components/AddAnimal/AddAnimal';
import { AnimalTable } from './components/AnimalTable/AnimalTable';
import { EditAnimal } from './components/EditAnimal/EditAnimal';
import type { AnimalContextType } from './context/AnimalContext';
import { AnimalContext } from './context/AnimalContext';
import { EditingContext } from './context/EditingContext';
import { deleteAnimal, fetchAnimals, updateAnimal } from './services/animals';
import type { Animal } from './types';

export function Animals() {
    const [animals, setAnimals] = useState<Animal[] | null>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null)
    const [editedAnimal, setEditedAnimal] = useState<Animal | null>(null);
    const [animalToDelete, setAnimalToDelete] = useState<Animal | null>(null);
    const [reload, setReload] = useState<boolean>(false);
    const [isAdding, setIsAdding] = useState<boolean>(false);

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
        if (!isEditing) {
            setAnimalToEdit(null);
            setEditedAnimal(null);
        }
    }, [isEditing]);

    useEffect(() => {
        if (isEditing) setIsAdding(false);
    }, [isEditing]);

    useEffect(() => {
        if (isAdding) setIsEditing(false);
    }, [isAdding]);

    const handleEdit = (animal: Animal) => {
        if (!animalToEdit || animalToEdit === animal) {
            setIsEditing(!isEditing);
        }
        setAnimalToEdit(animal);
        setEditedAnimal(animal);
    };

    const handleDelete = async (animal: Animal) => {
        setAnimalToDelete(animal);
        await deleteAnimal(animalToDelete!.id);
        setReload(true);
    };

    const handleAdd = () => {
        setIsAdding(!isAdding);
    }

    const handleUpdate = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (editedAnimal === animalToEdit) { return }
        else {
            updateAnimal(editedAnimal!);
            setReload(true);
            setAnimalToEdit(null);
            setIsEditing(false);
        }
    };

    const AnimalContextValue: AnimalContextType = {
        animalToEdit,
        editedAnimal,
        setEditedAnimal,
        handleUpdate,
        setAnimalToEdit
    };

    return (
        <section className="flex justify-center xl:justify-between w-full flex-wrap gap-4">
            <div className="flex flex-col gap-1 pb-2 overflow-hidden max-w-full xl:w-1/2">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {animals &&
                    <EditingContext value={{ animalToEdit }}>
                        <AnimalTable
                            animals={animals}
                            onEditAnimal={handleEdit}
                            onDeleteAnimal={handleDelete}
                        />
                    </EditingContext>
                }
                <Button variant="add" className="w-min" onClick={handleAdd}><Add aria-hidden="true" className="w-1" />Add</Button>
            </div>
            <div className="flex flex-col gap-1 w-full max-w-xl">
                {isEditing && animalToEdit &&
                    <AnimalContext value={AnimalContextValue}>
                        <EditAnimal />
                    </AnimalContext>
                }
                {isAdding &&
                    <AddAnimal />
                }
            </div>
        </section>
    );
}