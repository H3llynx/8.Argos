import { useRef, useState } from "react";
import Camera from "../../../../assets/svg/photo.svg?react";
import { Button } from "../../../../components/atoms/Button/Button";
import { Input } from "../../../../components/atoms/Input/Input";
import { formFields } from "../../config";
import { useAnimal } from "../../hooks/useContexts";
import { hostImg } from "../../services/picture-hosting";
import type { Animal } from "../../types";

const { name, type, age, sex, breed, size, location, photo, adoption_date } = formFields;

export function EditAnimal() {
    const { animalToEdit, editedAnimal, setEditedAnimal, handleUpdate } = useAnimal();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isAdopted, setIsAdopted] = useState(animalToEdit!.adopted_at ? true : false);

    if (!animalToEdit || !editedAnimal) return null;

    const handleChange = (field: keyof Animal, value: string | null) => {
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

    const handlePhotoClear = () => {
        setEditedAnimal({ ...editedAnimal, photo_url: animalToEdit.photo_url });
        if (fileInputRef.current)
            fileInputRef.current.value = "";
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
                    onChange={(e) => handleChange(name.field as keyof Animal, e.target.value)}
                    className="capitalize"
                />

                <label className="label" htmlFor={type.id}>
                    <span>{type.label}</span>
                    <select
                        key={animalToEdit.id}
                        id={type.id}
                        className="bg-blur"
                        defaultValue={animalToEdit.type}
                        onChange={(e) => handleChange(type.field as keyof Animal, e.target.value)}
                    >{type.options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )
                    })}
                    </select>
                </label>

                <label className="label" htmlFor={sex.id}>
                    <span>{sex.label}</span>
                    <select
                        key={animalToEdit.id}
                        id={sex.id}
                        className="bg-blur"
                        defaultValue={animalToEdit.sex}
                        onChange={(e) => handleChange(sex.field as keyof Animal, e.target.value)}
                    >
                        {sex.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        })}
                    </select>
                </label>

                <label className="label" htmlFor={size.id}>
                    <span>{size.label}</span>
                    <select
                        key={animalToEdit.id}
                        id={size.id}
                        className="bg-blur"
                        defaultValue={animalToEdit.size}
                        onChange={(e) => handleChange(size.field as keyof Animal, e.target.value)}
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
                    onChange={(e) => handleChange(breed.field as keyof Animal, e.target.value)}
                />

                <label className="label" htmlFor={age.id}>
                    <span>{age.label}</span>
                    <select
                        key={animalToEdit.id}
                        id={age.id}
                        className="bg-blur"
                        defaultValue={animalToEdit.age}
                        onChange={(e) => handleChange(age.field as keyof Animal, e.target.value)}
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
                    onChange={(e) => handleChange(location.field as keyof Animal, e.target.value)}
                />
                <div className="flex gap-2 items-center mt-1.5">
                    <Input
                        variant="checkbox"
                        label="Adopted?"
                        type="checkbox"
                        checked={isAdopted}
                        onChange={() => {
                            setIsAdopted(!isAdopted);
                            handleChange(adoption_date.field as keyof Animal, null)
                        }}
                    />
                    {isAdopted &&
                        <Input
                            aria-label="Set adoption date"
                            id={adoption_date.id}
                            type={adoption_date.input_type}
                            onChange={(e) => handleChange(adoption_date.field as keyof Animal, e.target.value)}
                            required
                        />
                    }
                </div>
                <div className="flex mt-1.5">
                    <label className="flex gap-0.5 flex-wrap items-center cursor-pointer text-white md:text-dark">
                        {animalToEdit.photo_url && <img src={animalToEdit.photo_url} className="w-1.5 h-1.5 object-cover rounded-md border border-dark-rgba" alt="" />}
                        {!animalToEdit.photo_url && <Camera className="w-1.5" aria-hidden="true" />}
                        <input
                            key={animalToEdit.id}
                            id={photo.id}
                            className="text-xs font-medium self-center cursor-pointer"
                            type={photo.input_type}
                            ref={fileInputRef}
                            onChange={handlePhotoChange} />
                    </label>
                    {fileInputRef.current?.value && fileInputRef.current.value.length > 0 &&
                        <Button type="button" variant="cancelFile" onClick={handlePhotoClear}>Cancel</Button>
                    }
                </div>
                <Button variant="update" className="w-full md:w-auto m-auto">Update<span className="capitalize">{animalToEdit.name}</span></Button>
            </form >
        </>
    )
}