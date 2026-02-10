import { useEffect, useState } from 'react';
import { default as Add, default as Close } from "../../assets/svg/add.svg?react";
import { Button } from '../../components/atoms/Button/Button';
import { Loading } from '../../components/atoms/Loading/Loading';
import { AddAnimal } from './components/AddAnimal/AddAnimal';
import { AnimalTable } from './components/AnimalTable/AnimalTable';
import { EditAnimal } from './components/EditAnimal/EditAnimal';
import { AnimalContext } from './context/AnimalContext';
import { TableContext } from './context/TableContext';
import { useAnimalDatabase } from './hooks/useAnimalDatabase';
import { useAnimalEdit } from './hooks/useAnimalEdit';
import type { AnimalContextType, TableContextType } from './types';

export function Animals() {
    const {
        animals,
        loading,
        error,
        setReload,
        sortBy,
        sortByDate,
        isAscending,
        isSorted,
        setIsSorted,
        filteredAnimals,
        setFilter
    } = useAnimalDatabase();
    const {
        animalToEdit,
        setAnimalToEdit,
        editedAnimal,
        setEditedAnimal,
        handleEdit,
        handleUpdate
    } = useAnimalEdit();

    const [isAdding, setIsAdding] = useState<boolean>(false);

    useEffect(() => {
        if (animalToEdit) setIsAdding(false);
    }, [animalToEdit]);

    useEffect(() => {
        if (isAdding) setAnimalToEdit(null);
    }, [isAdding]);

    const handleAdd = () => {
        setIsAdding(!isAdding);
    }

    const AnimalContextValue: AnimalContextType = {
        loading,
        animalToEdit,
        setAnimalToEdit,
        editedAnimal,
        setEditedAnimal,
        handleUpdate: (e: React.SubmitEvent) => handleUpdate(e, () => setReload(true))
    };

    const TableContextValue: TableContextType = {
        animalToEdit,
        handleEdit,
        sortBy,
        sortByDate,
        setReload,
        isAscending,
        isSorted,
        setIsSorted,
        filteredAnimals,
        setFilter
    }

    return (
        <section className="flex justify-center items-center xl:justify-between w-full flex-wrap gap-2 xl:gap-0">
            <div className="flex flex-col gap-1 pb-2 overflow-hidden xl:w-[680px]">
                {loading && <Loading />}
                {error && <p>{error}</p>}
                {animals &&
                    <>
                        <TableContext value={TableContextValue}>
                            <AnimalTable />
                        </TableContext>

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
                {animalToEdit &&
                    <AnimalContext value={AnimalContextValue}>
                        <EditAnimal />
                    </AnimalContext>
                }
                {isAdding &&
                    <AddAnimal onSuccess={() => { setReload(true); setIsAdding(false) }} />
                }
            </div>
        </section>
    );
}