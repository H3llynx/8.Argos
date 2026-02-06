import type { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useAnimalDatabase } from '../animals/hooks/useAnimalDatabase';
import { AnimalMarker } from './components/AnimalMarker/AnimalMarker';
import { AnimalTile } from './components/AnimalTile/AnimalTile';
import "./Map.css";
import { getAnimalCoordinates } from './services.ts/location';
import type { AnimalWithCoordinates } from './types';

export function Map() {
    const { animals } = useAnimalDatabase();
    const [animalsWithCoordinates, setAnimalWithCoordinates] = useState<AnimalWithCoordinates[]>([]);
    const [center, setCenter] = useState<LatLngExpression | null>(null);
    const [selectedAnimal, setSelectedAnimal] = useState<AnimalWithCoordinates | null>(null);

    useEffect(() => {
        const loadAnimals = async () => {
            const locatedAnimals = await getAnimalCoordinates(animals);
            setAnimalWithCoordinates(locatedAnimals);
        }
        loadAnimals();
    }, [animals])

    useEffect(() => {
        if (!animalsWithCoordinates || animalsWithCoordinates.length === 0) {
            return;
        }
        let latitudes = 0;
        let longitudes = 0;
        let divider = 0;
        for (const animal of animalsWithCoordinates) {
            latitudes += animal.coordinates.lat;
            longitudes += animal.coordinates.lon;
            divider++;
        }
        setCenter([(latitudes / divider), longitudes / divider])
    }, [animalsWithCoordinates]);

    return (
        <main className="main-map">
            <section className="flex justify-center xl:justify-between w-full flex-wrap gap-2">
                <div className="relative z-0 w-full xl:w-2xl">
                    {center &&
                        <div className="map-div-container shadow-1">
                            <MapContainer center={center} zoom={3} scrollWheelZoom={false}
                                style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {animalsWithCoordinates.map(animal => {
                                    return (
                                        <AnimalMarker
                                            key={animal.id}
                                            animal={animal}
                                            isOpen={selectedAnimal === animal}
                                        />
                                    )
                                })}
                            </MapContainer>
                        </div>
                    }
                </div>
                <div className="tile-div-container">
                    {animalsWithCoordinates.map(animal => {
                        return (
                            <AnimalTile
                                key={animal.id}
                                animal={animal}
                                onClick={() => setSelectedAnimal(animal)} />
                        )
                    })}
                </div>
            </section>
        </main>
    )
}