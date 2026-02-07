import Paw from "../../../../assets/images/paw.png";
import type { Animal } from "../../../animals/types";
import "./AnimalTile.css";

type AnimalTile = {
    animal: Animal;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function AnimalTile({ animal, ...props }: AnimalTile) {
    return (
        <button
            className="tile-btn shadow-1"
            {...props}>
            <img className="tile-img" src={animal.photo_url ?? Paw} />
            <div className="tile-text">
                <h3>{animal.name}</h3>
                <p className="text-xs capitalize font-medium">{animal.sex}</p>
            </div>
            {animal.adopted_at &&
                <p className="absolute top-0 right-0 bg-red text-white text-xs px-1 py-[5px] w-full uppercase">
                    ♥︎ Adopted</p>
            }
        </button>
    )
}