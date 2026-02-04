
export type Animal = {
    id: string;
    created_at: string;
    name: string;
    type: string;
    breed?: string | null;
    sex: string;
    age: string;
    size: string;
    photo_url?: string | null;
    adopted_at?: string | null;
    location: string
}

export type EditFormProps = {
    animalToEdit: Animal;
    editedAnimal: Animal;
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBreedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSexChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onAgeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPhotoSelected: (file: File | null) => void;
    handleUpdate: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export type AnimalTableProps = {
    animals: Animal[];
    onEditAnimal: (animal: Animal) => void;
    onDeleteAnimal: (animal: Animal) => void;
}