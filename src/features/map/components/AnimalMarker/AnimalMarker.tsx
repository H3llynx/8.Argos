import L from 'leaflet';
import { useEffect, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import Cat from "../../../../assets/svg/cat.svg";
import Dog from "../../../../assets/svg/dog.svg";
import Location from "../../../../assets/svg/marker.svg?react";
import { ageDescription } from '../../../animals/config';
import type { AnimalWithCoordinates } from '../../types';
import "./AnimalMarker.css";

type AnimalMarkerProps = {
    animal: AnimalWithCoordinates;
    isOpen: boolean;
}

export const AnimalMarker = ({ animal, isOpen }: AnimalMarkerProps) => {
    const animalIcon = animal.photo_url ? animal.photo_url : animal.type === "dog" ? Dog : Cat;
    const imageClassName = animal.photo_url ? "object-cover rounded-full border border-dark-rgba shadow-3" : "object-contain";
    const markerRef = useRef<L.Marker>(null);

    useEffect(() => {
        if (isOpen && markerRef.current) {
            markerRef.current.openPopup();
        }
    }, [isOpen]);

    const getAgeDetail = (animal: AnimalWithCoordinates) => {
        const age = ageDescription.find(age => age.value === animal.age);
        return age?.description
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
                <div className="flex-popup-container">
                    <img src={animalIcon} alt={animal.name} className={imageClassName} />
                    <div>
                        <h3>{animal.name}</h3>
                        <p className="flex items-center font-bold"><Location className="text-grey-3 mr-[3px] w-[20px]" />{animal.location}</p>
                        <p className="text-xs text-grey-2">{getAgeDetail(animal)}</p>
                    </div>
                </div>
                <p className="font-caveat text-xl pt-0.5 text-right">
                    {animal.adopted_at
                        ? (<span className="text-red">Adopted ♥︎</span>)
                        : "Available for adoption"}
                </p>
            </Popup>
        </Marker>
    );
};