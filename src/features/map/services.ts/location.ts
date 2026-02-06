import type { Animal } from "../../animals/types";
import type { AnimalWithCoordinates } from "../types";

export const getCoordinates = async (location: string) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` +
            `q=${encodeURIComponent(location)}` +
            `&format=json&limit=1`,
            {
                headers: {
                    useragent: "Argos"
                }
            })
        const results = await response.json();

        if (results.length > 0) {
            return {
                lat: Number(results[0].lat),
                lon: Number(results[0].lon)
            };
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