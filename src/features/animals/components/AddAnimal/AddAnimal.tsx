import { useRef } from "react";
import { useForm } from "react-hook-form";
import Camera from "../../../../assets/svg/photo.svg?react";
import { Button } from "../../../../components/atoms/Button/Button";
import { Input } from "../../../../components/atoms/Input/Input";
import { Loading } from "../../../../components/atoms/Loading/Loading";
import { animalFields } from "../../config";
import { addAnimal } from "../../services/animals";
import { hostImg } from "../../services/picture-hosting";
import type { Animal } from "../../types";

export function AddAnimal({ onSuccess }: { onSuccess: () => void }) {
    const { name, type, age, sex, breed, size, location, photo } = animalFields;
    const { register, handleSubmit, setValue, watch
        , formState: { isSubmitting } } = useForm<Animal>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const hasPhoto = watch(photo.field as keyof Animal);

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            const url = await hostImg(file);
            setValue(photo.field as keyof Animal, url)
        } else setValue(photo.field as keyof Animal, null);
    };

    const handlePhotoClear = () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
        setValue("photo_url", null);
    };

    const onSubmit = async (animal: Animal) => {
        await addAnimal(animal);
        onSuccess();
    };

    return (
        <div className="form flex flex-col gap-1">
            <h2 className="animal-h2">Add a new rescue:</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex gap-y-1 gap-x-2 flex-wrap">
                <Input
                    label={name.label}
                    id={name.id}
                    type={name.input_type}
                    placeholder="Animal name"
                    className="capitalize"
                    {...register(name.field as keyof Animal)}
                    required
                />

                <label className="label flex flex-col" htmlFor="type">
                    <span>{type.label}</span>
                    <select
                        id={type.id}
                        className="bg-blur"
                        {...register(type.field as keyof Animal)}
                    >{type.options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )
                    })}
                    </select>
                </label>

                <label className="label flex flex-col" htmlFor="sex">
                    <span>{sex.label}</span>
                    <select
                        id={sex.id}
                        className="bg-blur"
                        {...register(sex.field as keyof Animal)}
                    >
                        {sex.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        })}
                    </select>
                </label>

                <label className="label flex flex-col" htmlFor="size">
                    <span>{size.label}</span>
                    <select
                        id={size.id}
                        className="bg-blur"
                        {...register(size.field as keyof Animal)}
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
                    placeholder="Breed (if any)"
                    {...register(breed.field as keyof Animal)}
                />

                <label className="label flex flex-col" htmlFor="age">
                    <span>{age.label}</span>
                    <select
                        id={age.id}
                        className="bg-blur"
                        {...register(age.field as keyof Animal)}
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
                    placeholder="Animal current location"
                    {...register(location.field as keyof Animal)}
                    required
                />

                <div className="flex gap-0.5">
                    <label htmlFor={photo.id} className="flex gap-0.5 flex-wrap items-center cursor-pointer">
                        <Camera className="w-1.5" aria-hidden="true" />
                        <input
                            id={photo.id}
                            className="text-xs font-medium self-center cursor-pointer"
                            type={photo.input_type}
                            ref={fileInputRef}
                            onChange={handlePhotoChange}
                        />
                    </label>
                    {hasPhoto &&
                        <Button type="button" variant="cancelFile" onClick={handlePhotoClear}>Cancel</Button>
                    }
                </div>

                <Button variant="update" className="m-auto">{isSubmitting ? <Loading /> : "Add animal"}</Button>
            </form>
        </div>
    )
}