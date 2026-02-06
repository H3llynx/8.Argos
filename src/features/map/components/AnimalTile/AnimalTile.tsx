import Paw from "../../../../assets/images/paw.png";
import type { Animal } from "../../../animals/types";

type AnimalTile = {
    animal: Animal;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function AnimalTile({ animal, ...props }: AnimalTile) {
    return (
        <button className="w-10 h-10 bg-grey-1 rounded-lg overflow-hidden shadow-1 relative"
            tabIndex={0}
            {...props}>
            <img className="w-full h-full object-cover" src={animal.photo_url ?? Paw} />
            <div className="absolute bottom-0 left-0 px-1 py-[5px] w-full bg-white-rgba-3 flex items-center justify-between">
                <h3>{animal.name}</h3>
                <p className="text-xs capitalize">{animal.sex}</p>
            </div>
            {animal.adopted_at &&
                <p className="absolute top-0 right-0 bg-red text-white text-xs px-1 py-[5px] w-full uppercase">
                    Adopted</p>
            }
        </button>
    )
}