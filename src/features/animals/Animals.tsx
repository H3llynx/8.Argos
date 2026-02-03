import { useEffect, useState } from 'react';
import { fetchAnimals } from './services/animals';
import type { Animal } from './types';

export function Animals() {
    const [animals, setAnimals] = useState<Animal[] | null>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const init = async () => {
            const { data, error } = await fetchAnimals();
            if (error) setError(error.message ? error.message : "Error fetching data");
            else { setAnimals(data) }
            setLoading(false)
        }
        init();
    }, []);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {animals &&
                <div>
                    {animals.map(animal => (
                        <div key={animal.id}>
                            <h3>{animal.name}</h3>
                            <p>{animal.type} - {animal.breed}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}