import { useEffect, useRef, useState } from 'react';
import ErrorPitbull from "../../assets/images/error.png";
import { default as Add, default as Close } from "../../assets/svg/add.svg?react";
import { Button } from '../../components/atoms/Button/Button';
import { Loading } from '../../components/atoms/Loading/Loading';
import { useAuth } from '../auth/hooks/useAuth';
import { AddAnimal } from './components/AddAnimal/AddAnimal';
import { AnimalTable } from './components/AnimalTable/AnimalTable';
import { EditAnimal } from './components/EditAnimal/EditAnimal';
import { AnimalUpdateContext } from './context/AnimalUpdateContext';
import { AnimalTableContext } from './context/TableContext';
import { useAnimalDatabase } from './hooks/useAnimalDatabase';
import { useAnimalEdit } from './hooks/useAnimalEdit';
import { useAnimal } from './hooks/useContexts';
import type { AnimalTableType, AnimalUpdateType } from './types';

export function Animals() {
    const { animals, loading, error, setReload } = useAnimal();
    const {
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
    const { isAdmin } = useAuth();
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (animalToEdit || isAdding) {
            formRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    })
    useEffect(() => {
        if (animalToEdit) setIsAdding(false);
    }, [animalToEdit]);

    useEffect(() => {
        if (isAdding) setAnimalToEdit(null);
    }, [isAdding, setAnimalToEdit]);

    const handleAdd = () => {
        setIsAdding(!isAdding);
    }

    const AnimalUpdateValue: AnimalUpdateType = {
        loading,
        animalToEdit,
        setAnimalToEdit,
        editedAnimal,
        setEditedAnimal,
        handleUpdate: (e: React.SubmitEvent) => handleUpdate(e, () => setReload(true))
    };

    const TableContextValue: AnimalTableType = {
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
            <div className="flex flex-col gap-1 pb-2 overflow-hidden w-full max-w-[680px]">
                {loading && <Loading />}
                {error && <img className="bg-white-rgba-2 p-1 rounded-lg" src={ErrorPitbull} alt="Oops, something went wrong..." />}
                {!error && animals &&
                    <>
                        <AnimalTableContext value={TableContextValue}>
                            <AnimalTable />
                        </AnimalTableContext>
                        {isAdmin &&
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
                            </Button>}
                    </>
                }
            </div>
            <div className="flex flex-col gap-1 w-full max-w-xl" ref={formRef}>
                {animalToEdit &&
                    <AnimalUpdateContext value={AnimalUpdateValue}>
                        <EditAnimal />
                    </AnimalUpdateContext>
                }
                {isAdding &&
                    <AddAnimal onSuccess={() => { setReload(true); setIsAdding(false) }} />
                }
            </div>
        </section>
    );
}