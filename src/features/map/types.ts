export type Coordinates = {
    lat: number;
    lon: number;
}

export type AnimalWithCoordinates = {
    id: string;
    created_at: string;
    name: string;
    type: string;
    breed: string;
    sex: string;
    age: string;
    size: string;
    photo_url: string | null;
    adopted_at: string | null;
    location: string;
    coordinates: Coordinates;
}