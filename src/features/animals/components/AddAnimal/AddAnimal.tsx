import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Camera from "../../../../assets/svg/photo.svg?react";
import { Button } from "../../../../components/atoms/Button/Button";
import { Input } from "../../../../components/atoms/Input/Input";
import { Loading } from "../../../../components/atoms/Loading/Loading";
import { animalFields } from "../../../../config";
import { addAnimal } from "../../services/animals";
import { hostImg } from "../../services/picture-hosting";
import type { Animal } from "../../types";

export function AddAnimal({ onSuccess }: { onSuccess: () => void }) {
    const { name, type, age, sex, breed, size, location, photo } = animalFields;
    const { register, handleSubmit, setValue, watch
        , formState: { isSubmitting } } = useForm<Animal>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const hasPhoto = watch(photo.db_key as keyof Animal);
    const [animalType, setAnimalType] = useState("dog");

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAnimalType(e.target.value);
        setValue(type.db_key as keyof Animal, e.target.value)
    }

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            const url = await hostImg(file);
            setValue(photo.db_key as keyof Animal, url)
        } else setValue(photo.db_key as keyof Animal, null);
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
        <div className="white-container flex flex-col gap-1">
            <h2>Add a new rescue:</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex gap-y-1 gap-x-2 flex-wrap">
                <Input
                    label={name.label}
                    id={name.id}
                    type={name.input_type}
                    placeholder="Animal name"
                    className="capitalize"
                    {...register(name.db_key as keyof Animal)}
                    required
                />

                <label className="label flex flex-col" htmlFor={type.id}>
                    <span>{type.label}</span>
                    <select
                        id={type.id}
                        className="bg-blur"
                        {...register(type.db_key as keyof Animal)}
                        onChange={handleTypeChange}
                    >{type.options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )
                    })}
                    </select>
                </label>

                <label className="label flex flex-col" htmlFor={sex.id}>
                    <span>{sex.label}</span>
                    <select
                        id={sex.id}
                        className="bg-blur"
                        {...register(sex.db_key as keyof Animal)}
                    >
                        {sex.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        })}
                    </select>
                </label>

                <label className="label flex flex-col" htmlFor={size.id}>
                    <span>{size.label}</span>
                    <select
                        id={size.id}
                        className="bg-blur"
                        {...register(size.db_key as keyof Animal)}
                    >
                        {size.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        })}
                    </select>
                </label>

                {animalType === "dog" &&
                    <label className="label flex flex-col" htmlFor={breed.id}>
                        <span>{breed.label}</span>
                        <select
                            id={breed.id}
                            className="bg-blur"
                            {...register(breed.db_key as keyof Animal)}
                        >
                            {breed.dogOptions.map(option => {
                                return (
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                )
                            })}
                        </select>
                    </label>}

                {animalType === "cat" &&
                    <label className="label flex flex-col" htmlFor={breed.id}>
                        <span>{breed.label}</span>
                        <select
                            id={breed.id}
                            className="bg-blur"
                            {...register(breed.db_key as keyof Animal)}
                        >
                            {breed.catOptions.map(option => {
                                return (
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                )
                            })}
                        </select>
                    </label>}


                <label className="label flex flex-col" htmlFor={age.id}>
                    <span>{age.label}</span>
                    <select
                        id={age.id}
                        className="bg-blur"
                        {...register(age.db_key as keyof Animal)}
                    >
                        {age.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        })}
                    </select>
                </label>

                <Input
                    label={location.label}
                    id={location.id}
                    type={location.input_type}
                    placeholder="Animal current location"
                    {...register(location.db_key as keyof Animal)}
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

                <Button variant="update" className="m-auto">
                    {isSubmitting && <Loading />}
                    {!isSubmitting && <span>Add animal</span>}
                </Button>
            </form>
        </div>
    )
}