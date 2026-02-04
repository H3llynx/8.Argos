import Camera from "../../../../assets/svg/photo.svg?react";
import { Input } from "../../../../components/atoms/Input/Input";
import type { EditFormProps } from "../../types";
import { formFields } from "./config";
import "./EditForm.css";

const { name, type, age, sex, breed, size } = formFields;

export function EditForm({ animalToEdit, editedAnimal, onNameChange, onTypeChange, onSexChange, onAgeChange, onSizeChange, onBreedChange, onPhotoSelected, handleUpdate }: EditFormProps) {

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onPhotoSelected(file);
    };

    return (
        <>
            <h2 className="animal-h2">Edit <span className="capitalize">{animalToEdit.name}</span>:</h2>
            <form className="flex gap-y-1 gap-x-2 flex-wrap" onSubmit={handleUpdate}>
                <Input
                    label={name.label}
                    id={name.id}
                    type={name.input_type}
                    placeholder={animalToEdit.name}
                    value={editedAnimal?.name}
                    onChange={onNameChange}
                    className="capitalize"
                />

                <label className="label" htmlFor="type">
                    <span>{type.label}</span>
                    <select
                        id="type"
                        className="bg-blur"
                        defaultValue={editedAnimal?.type}
                        onChange={onTypeChange}
                    >{type.options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )
                    })}
                    </select>
                </label>

                <label className="label" htmlFor="sex">
                    <span>{sex.label}</span>
                    <select
                        id="sex"
                        className="bg-blur"
                        defaultValue={editedAnimal?.sex}
                        onChange={onSexChange}
                    >
                        {sex.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        })}
                    </select>
                </label>

                <Input
                    label={breed.label}
                    id={breed.id}
                    type={breed.input_type}
                    placeholder={`initially: ${animalToEdit.breed}`}
                    value={editedAnimal?.breed || ""}
                    onChange={onBreedChange}
                />

                <label className="label" htmlFor="age">
                    <span>{age.label}</span>
                    <select
                        id="age"
                        className="bg-blur"
                        defaultValue={editedAnimal?.age}
                        onChange={onAgeChange}
                    >
                        {age.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.description}</option>
                            )
                        })}
                    </select>
                </label>

                <label className="label" htmlFor="size">
                    <span>{size.label}</span>
                    <select
                        id="size"
                        className="bg-blur"
                        defaultValue={editedAnimal?.size}
                        onChange={onSizeChange}
                    >
                        {size.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        })}
                    </select>
                </label>

                <label htmlFor="photo" className="flex gap-0.5 flex-wrap items-center cursor-pointer">
                    {animalToEdit.photo_url && <img src={animalToEdit.photo_url} className="w-1.5 h-1.5 object-cover rounded-md border border-dark-rgba" alt="" />}
                    {!animalToEdit.photo_url && <Camera className="w-1.5" aria-hidden="true" />}
                    <input
                        key={animalToEdit.id}
                        id="photo"
                        className="text-xs font-medium self-center cursor-pointer"
                        type="file"
                        onChange={handlePhotoChange} />
                </label>

                <button className="cta font-open-sans text-xs font-medium py-0.5 gap-[5px]">Update<span className="capitalize">{animalToEdit.name}</span></button>
            </form>
        </>
    )
}