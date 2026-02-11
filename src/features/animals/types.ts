
export type Animal = {
    id: string;
    created_at: string;
    name: string;
    type: string;
    breed: string;
    sex: string;
    age: string;
    size: string;
    photo_url: string | null;
    adopted_at: string | null;
    location: string;
}

export type AnimalUpdateType = {
    loading: boolean;
    animalToEdit: Animal | null;
    editedAnimal: Animal | null;
    setEditedAnimal: (animal: Animal | null) => void;
    handleUpdate: (e: React.SubmitEvent) => Promise<void>;
    setAnimalToEdit: (animal: Animal | null) => void;
};

export type AnimalTableType = {
    animalToEdit: Animal | null;
    handleEdit: (animal: Animal) => void;
    sortBy: (label: keyof Animal) => void;
    sortByDate: () => void;
    setReload: (value: boolean) => void
    isAscending: boolean;
    isSorted: string | null;
    setIsSorted: (value: string | null) => void,
    filteredAnimals: Animal[];
    setFilter: (value: string) => void
};

export type AnimalContextType = {
    animals: Animal[];
    reload: boolean;
    loading: boolean;
    error: string | null;
    setReload: (value: boolean) => void
    setAnimals: (value: Animal[]) => void
};