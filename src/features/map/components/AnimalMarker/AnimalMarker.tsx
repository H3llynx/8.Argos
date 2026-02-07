import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import Cat from "../../../../assets/svg/cat.svg";
import Close from "../../../../assets/svg/close.svg?react";
import Dog from "../../../../assets/svg/dog.svg";
import Edit from "../../../../assets/svg/edit.svg?react";
import Location from "../../../../assets/svg/marker.svg?react";
import { Button } from '../../../../components/atoms/Button/Button';
import { Input } from '../../../../components/atoms/Input/Input';
import { Loading } from '../../../../components/atoms/Loading/Loading';
import { ageDescription, animalFields } from '../../../../config';
import { updateAnimal } from '../../../animals/services/animals';
import type { Animal } from '../../../animals/types';
import type { AnimalWithCoordinates } from '../../types';
import "./AnimalMarker.css";

type AnimalMarkerProps = {
    animal: AnimalWithCoordinates;
    isOpen: boolean;
    setReload: (value: boolean) => void;
    animals: Animal[];
    loading: boolean;
    setLoading: (value: boolean) => void;
}

export function AnimalMarker({ animal, isOpen, setReload, animals, loading, setLoading }: AnimalMarkerProps) {
    const animalIcon = animal.photo_url ? animal.photo_url : animal.type === "dog" ? Dog : Cat;
    const imageClassName = animal.photo_url ? "object-cover rounded-full border border-dark-rgba shadow-3" : "object-contain";
    const markerRef = useRef<L.Marker>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null);
    const [editedAnimal, setEditedAnimal] = useState<Animal | null>(null);
    const { adoption_date } = animalFields;

    useEffect(() => {
        if (isOpen && markerRef.current) {
            markerRef.current.openPopup();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isEditing) {
            setAnimalToEdit(null);
            setEditedAnimal(null);
        }
    }, [isEditing]);

    const handleEdit = (animal: Animal) => {
        setIsEditing(true);
        const originalAnimal = animals.find(a => a.id === animal.id);
        if (originalAnimal) {
            setAnimalToEdit(originalAnimal);
            setEditedAnimal(originalAnimal);
        }
    }

    const handleChange = (field: keyof Animal, value: string | null) => {
        if (editedAnimal && value) {
            setEditedAnimal({ ...editedAnimal, [field]: value })
        }
    };

    const handleUpdate = async () => {
        if (editedAnimal !== animalToEdit) {
            await updateAnimal(editedAnimal!);
            setReload(true);
            setLoading(true);
        }
        setIsEditing(false);
    }

    const getAgeDetail = (animal: AnimalWithCoordinates) => {
        const age = ageDescription.find(age => age.value === animal.age);
        return age?.name
    }

    const customIcon = L.icon({
        iconUrl: animalIcon,
        iconSize: [50, 50],
        iconAnchor: [25, 55],
        popupAnchor: [0, -50],
        className: "bg-grey rounded-full object-cover border border-dark-rgba-3 shadow-1"
    });

    return (
        <Marker
            position={[animal.coordinates.lat, animal.coordinates.lon]}
            icon={customIcon}
            ref={markerRef}
        >
            <Popup className="animal-popup">
                <div className="flex-popup-container bg-blur">
                    <img src={animalIcon} alt={animal.name} className={imageClassName} />
                    <div>
                        <h3>{animal.name}</h3>
                        <p className="flex items-center font-bold"><Location className="text-grey-3 mr-[3px] w-[20px]" />{animal.location}</p>
                        <p className="text-xs text-grey-2">{getAgeDetail(animal)}</p>
                    </div>
                </div>
                <div className="pt-0.5 flex flex-col items-end">
                    {loading && <Loading />}
                    {animal.adopted_at && <span className="font-caveat text-xl text-red">Adopted ♥︎</span>}
                    {!animal.adopted_at && !loading &&
                        <>
                            {!isEditing &&
                                <span className="font-caveat text-xl flex gap-[5px] items-center">
                                    Available for adoption
                                    <button
                                        type="button"
                                        aria-label="edit"
                                        tabIndex={0}
                                        onClick={(e) => { e.stopPropagation(); handleEdit(animal) }}
                                    >
                                        <Edit />
                                    </button>
                                </span>
                            }
                        </>
                    }
                    {
                        isEditing &&
                        <form onSubmit={handleUpdate}
                            className="flex gap-0.5 items-center">
                            <Input
                                aria-label={adoption_date.date_aria_label}
                                id={adoption_date.id}
                                type={adoption_date.input_type_2}
                                onChange={(e) => handleChange(adoption_date.field as keyof Animal, e.target.value)}
                            />
                            <Button variant="edit">Update</Button>
                            <Button
                                variant="cancelFile"
                                onClick={(e) => { e.stopPropagation(); setIsEditing(false) }}
                            ><Close className="w-1.5" /></Button>
                        </form>
                    }
                </div>
            </Popup>
        </Marker>
    );
};