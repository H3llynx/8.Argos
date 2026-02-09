import type { LatLngExpression } from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { LayerGroup, LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import { Loading } from '../../components/atoms/Loading/Loading';
import { capitalize } from '../../utils/ui';
import { useAnimalDatabase } from '../animals/hooks/useAnimalDatabase';
import { AnimalMarker } from './components/AnimalMarker/AnimalMarker';
import { AnimalTile } from './components/AnimalTile/AnimalTile';
import "./Map.css";
import { getAnimalCoordinates } from './services.ts/location';
import type { AnimalWithCoordinates } from './types';

export function Map() {
    const { animals, reload, setReload } = useAnimalDatabase();
    const [animalsWithCoordinates, setAnimalWithCoordinates] = useState<AnimalWithCoordinates[]>([]);
    const [center, setCenter] = useState<LatLngExpression | null>(null);
    const [selectedAnimal, setSelectedAnimal] = useState<AnimalWithCoordinates | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAnimals = async () => {
            const locatedAnimals = await getAnimalCoordinates(animals);
            setAnimalWithCoordinates(locatedAnimals);
        }
        loadAnimals();
    }, [animals, reload])

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
        setCenter([(latitudes / divider), longitudes / divider]);
        setLoading(false);
    }, [animalsWithCoordinates]);

    useEffect(() => {
        if (selectedAnimal) {
            setTimeout(() => {
                setSelectedAnimal(null)
            }, 100)
        }
    }, [selectedAnimal]);

    const animalsByType = useMemo(() => {
        const animalTypes = [...new Set(animalsWithCoordinates.map(animal => animal.type))];
        const animalsByType: Record<string, AnimalWithCoordinates[]> = {};

        for (const type of animalTypes) {
            animalsByType[type] = animalsWithCoordinates.filter(a => a.type === type);
        }

        return animalsByType;
    }, [animalsWithCoordinates]);

    return (
        <main className="main-map">
            <section className="flex justify-center xl:justify-between w-full flex-wrap gap-2">
                <div className="relative z-0 w-full xl:w-2xl">
                    {loading && <div className="p-5 absolute"><Loading /></div>}
                    {center &&
                        <div className="map-div-container shadow-1">
                            <MapContainer center={center} zoom={4} scrollWheelZoom={false}
                                style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LayersControl position="topright" collapsed={false}>
                                    {Object.entries(animalsByType).map(([type, animalsOfType]) => (
                                        <LayersControl.Overlay
                                            key={type}
                                            checked
                                            name={capitalize(`${type}s`)}
                                        >
                                            <LayerGroup>
                                                {animalsOfType.map((animal) => (
                                                    <AnimalMarker
                                                        key={animal.id}
                                                        animal={animal}
                                                        animals={animals}
                                                        isOpen={selectedAnimal === animal}
                                                        loading={loading}
                                                        setLoading={setLoading}
                                                        setReload={setReload}
                                                    />
                                                ))}
                                            </LayerGroup>
                                        </LayersControl.Overlay>
                                    ))}
                                </LayersControl>
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
        </main >
    )
}