import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../components/atoms/Button/Button";
import { Input } from "../../../../components/atoms/Input/Input";
import { Loading } from "../../../../components/atoms/Loading/Loading";
import { eventFields } from "../../../../config";
import { useAnimalDatabase } from "../../../animals/hooks/useAnimalDatabase";
import type { Animal } from "../../../animals/types";
import { addEvent } from "../../services/events";
import type { Event } from "../../types";

type AddEventProps = {
    onSuccess: () => void;
    date: string[];
}

export function AddEvent({ onSuccess, date }: AddEventProps) {
    const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<Event>();
    const [adoptionRelated, setAdoptionRelated] = useState<boolean>(false);
    const [animal, setAnimal] = useState<Animal | null>(null)
    const { title, type, start_date, end_date, organizer, location, visitor_name, visitor_phone, visitor_email } = eventFields;
    const { animals } = useAnimalDatabase();

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value.includes("adoption")) setAdoptionRelated(true);
        else setAdoptionRelated(false);
        setValue(type.db_key as keyof Event, e.target.value);
    }

    const handleAnimalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedAnimal = animals.find(animal => animal.id === e.target.value);
        if (selectedAnimal) setAnimal(selectedAnimal); else setAnimal(null);
        if (e.target.value.length > 0) setValue("animal_id" as keyof Event, e.target.value)
        else setValue("animal_id" as keyof Event, null);
    }

    const onSubmit = async (event: Event) => {
        setValue("status", "scheduled");
        await addEvent(event);
        onSuccess();
    };

    return (
        <div className="white-container flex flex-col gap-1">
            <h2>Add a new event:</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex gap-y-1 gap-x-2 flex-wrap">

                <Input
                    label={title.label}
                    id={title.id}
                    type={title.input_type}
                    {...register(title.db_key as keyof Event)}
                    required
                />

                <Input
                    label={start_date.label}
                    id={start_date.id}
                    type={start_date.input_type}
                    defaultValue={date[0]}
                    {...register(start_date.db_key as keyof Event)}
                    required
                />

                <Input
                    label={end_date.label}
                    id={end_date.id}
                    type={end_date.input_type}
                    defaultValue={date[1]}
                    {...register(end_date.db_key as keyof Event)}
                    required
                />

                <label className="label flex flex-col" htmlFor={type.id}>
                    <span>{type.label}</span>
                    <select
                        id={type.id}
                        className="bg-blur"
                        {...register(type.db_key as keyof Event, { required: true })}
                        onChange={(e) => {
                            handleTypeChange(e);
                        }}
                    >
                        {type.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        })}
                    </select>
                </label>

                <label className="label flex flex-col" htmlFor="animal">
                    <p>Select an animal {!adoptionRelated && <span>(if applicable)</span>}</p>
                    <select
                        id="animal"
                        className="bg-blur capitalize"
                        onChange={handleAnimalChange}
                    >
                        <option value="">None</option>
                        {animals.map(animal => {
                            return (
                                <option key={animal.id} value={animal.id}>{animal.name} - {animal.type}</option>
                            )
                        })}
                    </select>
                </label>

                {adoptionRelated &&
                    <>
                        <Input
                            label={visitor_name.label}
                            id={visitor_name.id}
                            type={visitor_name.input_type}
                            {...register(visitor_name.db_key as keyof Event)}
                        />

                        <Input
                            label={visitor_phone.label}
                            id={visitor_phone.id}
                            type={visitor_phone.input_type}
                            {...register(visitor_phone.db_key as keyof Event)}
                        />

                        <Input
                            label={visitor_email.label}
                            id={visitor_email.id}
                            type={visitor_email.input_type}
                            {...register(visitor_email.db_key as keyof Event)}
                        />
                    </>
                }

                <label className="label flex flex-col" htmlFor="description">
                    <span>Description:</span>
                    <textarea
                        {...register("description" as keyof Event)}
                    />
                </label>

                <Input
                    label={location.label}
                    id={location.id}
                    type={location.input_type}
                    defaultValue={animal ? animal.location : ""}
                    {...register(location.db_key as keyof Event)}
                />

                <Input
                    label={organizer.label}
                    id={organizer.id}
                    type={organizer.input_type}
                    {...register(organizer.db_key as keyof Event)}
                />

                <Button variant="update" className="w-full md:w-auto m-auto">{isSubmitting ? <Loading /> : "Add event"}</Button>
            </form>
        </div>
    )
}