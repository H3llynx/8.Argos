import type { Animal } from "../../animals/types";
import type { AnimalWithCoordinates } from "../types";

export const getCoordinates = async (location: string) => {
    try {
        const response = await fetch(
            `https://photon.komoot.io/api/?q=${encodeURIComponent(location)}&limit=1`)
        const results = await response.json();
        if (results.features && results.features.length > 0) {
            const [lon, lat] = results.features[0].geometry.coordinates;
            return { lat, lon };
        }

    } catch (error) {
        console.error('Geocoding error:', error);
    }
};

export const getAnimalCoordinates = async (animals: Animal[]) => {
    const animalList: AnimalWithCoordinates[] = [];
    for (const animal of animals) {
        const coordinates = await getCoordinates(animal.location);
        if (coordinates) {
            const locatedAnimal = { ...animal, coordinates: coordinates };
            animalList.push(locatedAnimal);
        }
    }
    return animalList;
};