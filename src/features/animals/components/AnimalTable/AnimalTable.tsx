import { useEffect, useRef, useState } from "react";
import Camera from "../../../../assets/svg/photo.svg?react";
import { Button } from "../../../../components/atoms/Button/Button";
import { Input } from "../../../../components/atoms/Input/Input";
import { Popup } from "../../../../components/molecules/popup/Popup";
import { tableColumns } from "../../config";
import { useTable } from "../../hooks/useContexts";
import { deleteAnimal } from "../../services/animals";
import type { Animal } from "../../types";
import { SortButton } from "../SortButton/SortButton";
import "./AnimalTable.css";

export function AnimalTable() {
    const { animalToEdit, sortBy, sortByDate, handleEdit, setReload, isAscending, isSorted, setIsSorted, filteredAnimals, setFilter } = useTable();
    const [animalToDelete, setAnimalToDelete] = useState<Animal | null>(null);
    const popupRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (animalToDelete) popupRef.current?.showModal();
    }, [animalToDelete]);

    const handleDelete = (animal: Animal) => {
        setAnimalToDelete(animal)
    };

    const cancelDelete = () => {
        setAnimalToDelete(null);
        popupRef.current?.close();
    }

    const confirmDelete = async (animal: Animal) => {
        await deleteAnimal(animal.id);
        setAnimalToDelete(null);
        setReload(true);
    }

    return (
        <>
            <div className="flex justify-between items-center flex-wrap gap-1">
                <h2 id="animals-table" className="animal-h2">Animal listings</h2>
                <Input
                    variant="filter"
                    type="text"
                    aria-label="Filter by name"
                    placeholder="Filter by name"
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <div className="shadow-1 table-container">
                <table aria-labelledby="animals-table">
                    <thead>
                        <tr>
                            <th scope="col"><Camera aria-label="Photo" className="w-[16px]" /></th>
                            {tableColumns.map(item => {
                                return (
                                    <th scope="col" aria-label={item}>
                                        <SortButton
                                            column={item}
                                            onClick={() => { sortBy(item as keyof Animal) }}
                                            isAscending={isAscending}
                                            isActive={isSorted === item}
                                        />
                                    </th>
                                )
                            })}
                            <th scope="col" className="min-w-8.5">
                                <div className="flex items-center gap-2">
                                    Actions
                                    <SortButton
                                        aria-label="Remove filters and sorting"
                                        isActive={isSorted !== null}
                                        onClick={() => {
                                            sortByDate();
                                            setIsSorted(null);
                                        }}
                                    />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAnimals.map(animal => (
                            <tr key={animal.id}>
                                <th scope="row">
                                    {animal.photo_url &&
                                        <div className="animal-photo shadow-3">
                                            <img
                                                alt={`Picture of ${animal.name}`}
                                                src={animal.photo_url ?? ""} />
                                        </div>
                                    }
                                </th>
                                <td><span>{animal.name}</span></td>
                                <td><span>{animal.type}</span></td>
                                <td><span>{animal.breed}</span></td>
                                <td><span>{animal.sex}</span></td>
                                <td><span>{animal.age.toLowerCase() === "puppy_kitten" ? "Baby" : animal.age}</span></td>
                                <td><span>{animal.size}</span></td>
                                <td><span>{animal.location}</span></td>
                                <td>{animal.adopted_at ? "adopted" : "available"}</td>
                                <td className="flex h-3 gap-[5px] items-center">
                                    <Button variant="edit" onClick={() => handleEdit(animal)}>{animalToEdit === animal ? "Cancel" : "Edit"}</Button>
                                    <Button variant="delete" onClick={() => handleDelete(animal)}>Delete</Button>
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
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
                        <Button onClick={() => confirmDelete(animalToDelete)}>Confirm</Button>
                        <Button className="dialog-btn-secondary" onClick={cancelDelete}>Cancel</Button>
                    </div>
                </Popup>
            }
        </>)
}