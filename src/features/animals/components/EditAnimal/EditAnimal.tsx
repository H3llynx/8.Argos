import Camera from "../../../../assets/svg/photo.svg?react";
import { Button } from "../../../../components/atoms/Button/Button";
import { Input } from "../../../../components/atoms/Input/Input";
import { formFields } from "../../config";
import { useAnimal } from "../../hooks/useContexts";
import { hostImg } from "../../services/picture-hosting";
import type { Animal } from "../../types";

const { name, type, age, sex, breed, size, location } = formFields;

export function EditAnimal() {
    const { animalToEdit, editedAnimal, setEditedAnimal, handleUpdate } = useAnimal();

    if (!animalToEdit || !editedAnimal) return null;

    const handleChange = (field: keyof Animal, value: string) => {
        if (editedAnimal) {
            const required = ["name", "location"]
            const updatedValue = required.includes(field) && !value
                ? animalToEdit![field]
                : value;
            setEditedAnimal({ ...editedAnimal, [field]: updatedValue })
        }
    };

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (editedAnimal && file) {
            const newUrl = await hostImg(file);
            setEditedAnimal({ ...editedAnimal, photo_url: newUrl })
        };
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
                    value={editedAnimal.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="capitalize"
                />

                <label className="label" htmlFor="type">
                    <span>{type.label}</span>
                    <select
                        key={animalToEdit.id}
                        id="type"
                        className="bg-blur"
                        defaultValue={animalToEdit.type}
                        onChange={(e) => handleChange("type", e.target.value)}
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
                        key={animalToEdit.id}
                        id="sex"
                        className="bg-blur"
                        defaultValue={animalToEdit.sex}
                        onChange={(e) => handleChange("sex", e.target.value)}
                    >
                        {sex.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        })}
                    </select>
                </label>

                <label className="label" htmlFor="size">
                    <span>{size.label}</span>
                    <select
                        key={animalToEdit.id}
                        id="size"
                        className="bg-blur"
                        defaultValue={animalToEdit.size}
                        onChange={(e) => handleChange("size", e.target.value)}
                    >
                        {size.options.map(option => {
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
                    value={editedAnimal.breed || ""}
                    onChange={(e) => handleChange("breed", e.target.value)}
                />

                <label className="label" htmlFor="age">
                    <span>{age.label}</span>
                    <select
                        key={animalToEdit.id}
                        id="age"
                        className="bg-blur"
                        defaultValue={animalToEdit.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                    >
                        {age.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.description}</option>
                            )
                        })}
                    </select>
                </label>

                <Input
                    label={location.label}
                    id={location.id}
                    type={location.input_type}
                    placeholder={`initially: ${animalToEdit.location}`}
                    value={editedAnimal.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                />

                <label htmlFor="photo" className="flex gap-0.5 flex-wrap items-center cursor-pointer text-white md:text-dark">
                    {animalToEdit.photo_url && <img src={animalToEdit.photo_url} className="w-1.5 h-1.5 object-cover rounded-md border border-dark-rgba" alt="" />}
                    {!animalToEdit.photo_url && <Camera className="w-1.5" aria-hidden="true" />}
                    <input
                        key={animalToEdit.id}
                        id="photo"
                        className="text-xs font-medium self-center cursor-pointer"
                        type="file"
                        onChange={handlePhotoChange} />
                </label>
                <Button variant="update" className="m-auto">Update<span className="capitalize">{animalToEdit.name}</span></Button>
            </form>
        </>
    )
}