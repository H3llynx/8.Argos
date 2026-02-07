
export type Animal = {
    id: string;
    created_at: string;
    name: string;
    type: string;
    breed: string | null;
    sex: string;
    age: string;
    size: string;
    photo_url: string | null;
    adopted_at: string | null;
    location: string;
}

export type AnimalContextType = {
    animalToEdit: Animal | null;
    editedAnimal: Animal | null;
    setEditedAnimal: (animal: Animal | null) => void;
    handleUpdate: (e: React.SubmitEvent) => Promise<void>;
    setAnimalToEdit: (animal: Animal | null) => void;
};

export type TableContextType = {
    animalToEdit: Animal | null;
    handleEdit: (animal: Animal) => void;
    sortBy: (field: keyof Animal) => void;
    sortByDate: () => void;
    setReload: (value: boolean) => void
    isAscending: boolean;
    isSorted: string | null;
    setIsSorted: (value: string | null) => void,
    filteredAnimals: Animal[];
    setFilter: (value: string) => void
}