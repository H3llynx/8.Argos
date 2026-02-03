export type Animal = {
    id: string;
    created_at: string;
    name: string;
    type: string;
    breed: string | null;
    sex: string;
    age: number;
    size: string;
    description: string | null;
    photo_url: string | null;
    adopted_at: string | null;
    shelter_id: string;
}