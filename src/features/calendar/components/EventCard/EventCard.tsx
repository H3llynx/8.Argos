import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import Cat from "../../../../assets/svg/cat.svg";
import Dog from "../../../../assets/svg/dog.svg";
import Location from "../../../../assets/svg/marker.svg?react";
import { Button } from '../../../../components/atoms/Button/Button';
import { Loading } from '../../../../components/atoms/Loading/Loading';
import { capitalize } from '../../../../utils/ui';
import { useAnimalDatabase } from '../../../animals/hooks/useAnimalDatabase';
import type { Animal } from '../../../animals/types';
import { useAdmin } from '../../../auth/hooks/useAdmin';
import type { Event } from "../../types";
import { StatusTag } from '../StatusTag/StatusTag';
import "./EventCard.css";

const formatDate = (date: string) => {
    return format(new Date(date), "d MMMM yyyy");
}
const formatTime = (date: string) => {
    return format(new Date(date), "HH:mm");
}

type EventCardProps = {
    event: Event;
    onEdit: (event: Event) => void;
    onDelete: (event: Event) => void;
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
    const { animals, loading } = useAnimalDatabase();
    const [animal, setAnimal] = useState<Animal | null>(null);
    const animalIcon = animal?.photo_url ? animal.photo_url : animal?.type === "dog" ? Dog : Cat;
    const imageClassName = animal?.photo_url ? "w-5 h-5 object-cover rounded-full border border-dark-rgba shadow-3" : "object-contain";
    const isAdmin = useAdmin();

    useEffect(() => {
        if (event.animal_id) {
            const eventAnimal = animals.find(animal => animal.id === event.animal_id);
            if (eventAnimal) {
                setAnimal(eventAnimal)
            }
        } else setAnimal(null)
    }, [event, animal, animals]);

    return (
        <div className="event-card">
            <div className="event-card-top">
                <h2>{capitalize(event.title)}</h2>
                <div className="text-sm font-medium text-right w-max">
                    <p className="text-turquoise">{formatDate(event.start)}</p>
                    <p className="text-grey-2">{formatTime(event.start)} - {formatTime(event.end)}</p>
                </div>
            </div >
            <div className="event-card-type-cta">
                <p className="capitalize text-sm">{event.event_type}</p>
                <div className="flex gap-[5px]">
                    <StatusTag status={event.status} />
                    {isAdmin &&
                        <>
                            <Button variant="edit" onClick={() => onEdit(event)}>Edit</Button>
                            <Button variant="delete" onClick={() => onDelete(event)}>Delete</Button>
                        </>
                    }
                </div>
            </div>
            <div className="event-card-additional-info">
                <div className="flex flex-col justify-between gap-0.5">
                    {event.description &&
                        <div className="event-description">
                            <h4>Description:</h4>
                            <p>{event.description}</p>
                        </div>
                    }
                    <div className="flex gap-1 text-xs items-center">
                        {event.location &&
                            <p className="text-turquoise">
                                <Location className="text-grey-3 mr-[3px] w-[20px]" />{event.location}</p>
                        }
                        {event.organizer && <p>Organizer: {event.organizer}</p>}
                    </div>
                </div>
                {loading && <Loading />}
                {animal &&
                    <div className="text-center text-grey-1 self-end">
                        <img src={animalIcon} alt="" className={imageClassName} />
                        <p>Rescue: <span className="font-caveat text-2xl capitalize">{animal.name}</span></p>
                    </div>
                }
            </div>
        </div >
    )
}