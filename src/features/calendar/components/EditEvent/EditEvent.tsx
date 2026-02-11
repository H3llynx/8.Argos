import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../components/atoms/Button/Button";
import { Input } from "../../../../components/atoms/Input/Input";
import { Loading } from "../../../../components/atoms/Loading/Loading";
import { databases, eventFields } from "../../../../config";
import { updateData } from "../../../../services/services";
import { useAnimal } from "../../../animals/hooks/useContexts";
import type { Event } from "../../types";
import { dateTimeLocalToDb, dbDateToDateTimeLocal } from "../../utils";

type EditEventProps = {
    onSuccess: () => void;
    event: Event;
}

export function EditEvent({ onSuccess, event }: EditEventProps) {
    const { register, handleSubmit, watch, setValue, formState: { isSubmitting, errors } } = useForm<Event>();
    const [adoptionRelated, setAdoptionRelated] = useState<boolean>(event.event_type.includes("adoption") ?? false);
    const { title, type, start_date, end_date, organizer, location, visitor_name, visitor_phone, visitor_email } = eventFields;
    const { animals, loading } = useAnimal();

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value.includes("adoption")) setAdoptionRelated(true);
        else setAdoptionRelated(false);
        setValue(type.db_key as keyof Event, e.target.value);
    }

    const handleAnimalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value.length > 0) setValue("animal_id" as keyof Event, e.target.value)
        else setValue("animal_id" as keyof Event, null);
    }

    const onSubmit = async (updatedEvent: Event) => {
        const edittedEvent = {
            ...updatedEvent,
            id: event.id,
            start: dateTimeLocalToDb(updatedEvent.start),
            end: dateTimeLocalToDb(updatedEvent.end),
            status: "updated" as const
        };
        await updateData(edittedEvent, databases.events);
        onSuccess();
    };

    return (<>
        {loading && <Loading />}
        {!loading && <div className="form-container w-full max-w-md flex flex-col gap-1 pt-2 px-1 pb-4 md:py-1">
            <h2>Edit event</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex gap-y-1 gap-x-2 flex-wrap">

                <Input
                    label={title.label}
                    id={title.id}
                    type={title.input_type}
                    defaultValue={event.title}
                    {...register(title.db_key as keyof Event)}
                    required
                />

                <Input
                    label={start_date.label}
                    id={start_date.id}
                    type={start_date.input_type}
                    defaultValue={dbDateToDateTimeLocal(event.start)}
                    {...register(start_date.db_key as keyof Event)}
                    required
                />

                <div>
                    <Input
                        label={end_date.label}
                        id={end_date.id}
                        type={end_date.input_type}
                        defaultValue={dbDateToDateTimeLocal(event.end)}
                        {...register(end_date.db_key as keyof Event, {
                            validate: (value) => {
                                const start = watch("start");
                                return new Date(value!) > new Date(start) ||
                                    "End date must be after start date";
                            }
                        })}
                        required
                    />
                    {errors.end && (
                        <span className="text-error">
                            {errors.end.message}
                        </span>
                    )}
                </div>


                <label className="label flex flex-col" htmlFor={type.id}>
                    <span>{type.label}</span>
                    <select
                        id={type.id}
                        className="bg-blur"
                        defaultValue={event.event_type}
                        {...register(type.db_key as keyof Event, { required: true })}
                        onChange={(e) => { handleTypeChange(e) }}
                    >
                        {type.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        })}
                    </select>
                </label>


                <label className="label flex flex-col" htmlFor="animal-edit">
                    <p>Select an animal {!adoptionRelated && <span>(if applicable)</span>}</p>
                    <select
                        id="animal-edit"
                        className="bg-blur capitalize"
                        {...(event.animal_id && { defaultValue: event.animal_id })}
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
                            {...(event.visitor_name && { defaultValue: event.visitor_name })}
                            {...register(visitor_name.db_key as keyof Event)}
                        />

                        <Input
                            label={visitor_phone.label}
                            id={visitor_phone.id}
                            type={visitor_phone.input_type}
                            {...(event.visitor_phone && { defaultValue: event.visitor_phone })}
                            {...register(visitor_phone.db_key as keyof Event)}
                        />

                        <Input
                            label={visitor_email.label}
                            id={visitor_email.id}
                            type={visitor_email.input_type}
                            {...(event.visitor_email && { defaultValue: event.visitor_email })}
                            {...register(visitor_email.db_key as keyof Event)}
                        />
                    </>
                }

                <label className="label flex flex-col" htmlFor="description-edit">
                    <span>Description:</span>
                    <textarea id="description-edit"
                        {...(event.description && { defaultValue: event.description })}
                        {...register("description" as keyof Event)}
                    />
                </label>

                <Input
                    label={location.label}
                    id={location.id}
                    type={location.input_type}
                    {...(event.location && { defaultValue: event.location })}
                    {...register(location.db_key as keyof Event)}
                />

                <Input
                    label={organizer.label}
                    id={organizer.id}
                    type={organizer.input_type}
                    {...(event.organizer && { defaultValue: event.organizer })}
                    {...register(organizer.db_key as keyof Event)}
                />

                <Button variant="update" className="w-full md:w-auto m-auto">
                    {isSubmitting && <Loading />}
                    {!isSubmitting && <span>Update event</span>}
                </Button>
            </form>
        </div>
        }</>
    )
}