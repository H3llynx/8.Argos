import { useEffect, useRef, useState } from 'react';
import { default as Add, default as Close } from "../../assets/svg/add.svg?react";
import { Button } from '../../components/atoms/Button/Button';
import { Loading } from '../../components/atoms/Loading/Loading';
import { Popup } from '../../components/molecules/popup/Popup';
import { AddAnimal } from './components/AddAnimal/AddAnimal';
import { AnimalTable } from './components/AnimalTable/AnimalTable';
import { EditAnimal } from './components/EditAnimal/EditAnimal';
import type { AnimalContextType } from './context/AnimalContext';
import { AnimalContext } from './context/AnimalContext';
import { EditingContext } from './context/EditingContext';
import { fetchAnimals, updateAnimal } from './services/animals';
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
    const popupRef = useRef<HTMLDialogElement>(null)

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
            setIsAdding(false);
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

    useEffect(() => {
        if (animalToDelete) popupRef.current?.showModal();
    }, [animalToDelete]);

    const handleEdit = (animal: Animal) => {
        if (!animalToEdit || animalToEdit === animal) {
            setIsEditing(!animalToEdit);
        }
        setAnimalToEdit(animal);
        setEditedAnimal(animal);
    };

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

    const handleDelete = (animal: Animal) => {
        setAnimalToDelete(animal)
    };

    const cancelDelete = () => {
        setAnimalToDelete(null);
        popupRef.current?.close();
    }

    const handleAdd = () => {
        setIsAdding(!isAdding);
    }

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
                {loading && <Loading />}
                {error && <p>{error}</p>}
                {animals &&
                    <>
                        <EditingContext value={{ animalToEdit }}>
                            <AnimalTable
                                animals={animals}
                                onEditAnimal={handleEdit}
                                onDeleteAnimal={handleDelete}
                            />
                        </EditingContext>
                        {animalToDelete &&
                            <Popup
                                ref={popupRef}
                                close={cancelDelete}
                            >
                                <p>Are you sure you want to delete <span className="capitalize font-caveat text-3xl pr-[5px]">{animalToDelete.name}</span>?</p>
                                {animalToDelete.photo_url &&
                                    <div className="m-auto w-20 h-10 overflow-hidden mt-1 border border-dark-rgba shadow-1 rounded-lg">
                                        <img className="w-full h-full object-cover" src={animalToDelete.photo_url} alt={`photo of ${animalToDelete.name}`} />
                                    </div>
                                }
                                <div className="flex gap-[5px] justify-center mt-1.5 mb-0.5">
                                    <Button>Confirm</Button>
                                    <Button className="dialog-btn-secondary" onClick={cancelDelete}>Cancel</Button>
                                </div>
                            </Popup>
                        }
                    </>
                }
                <Button variant="add" className="w-min" onClick={handleAdd}>
                    {isAdding ?
                        <>
                            <Close aria-hidden="true" className="w-1" />
                            Cancel
                        </> :
                        <>
                            <Add aria-hidden="true" className="w-1" />
                            Add
                        </>
                    }
                </Button>
            </div>
            <div className="flex flex-col gap-1 w-full max-w-xl">
                {isEditing && animalToEdit &&
                    <AnimalContext value={AnimalContextValue}>
                        <EditAnimal />
                    </AnimalContext>
                }
                {isAdding &&
                    <AddAnimal onSuccess={() => setReload(true)} />
                }
            </div>
        </section>
    );
}