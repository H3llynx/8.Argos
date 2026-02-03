import Paw from "../../../assets/svg/paw.svg?react";
import "./Loading.css";

export function Loading() {
    return (
        <span className="loading-paws">
            <span className="mr-0.5">Connexion</span>
            <Paw className="paw w-1" aria-hidden="true" />
            <Paw className="paw w-1" aria-hidden="true" />
            <Paw className="paw w-1" aria-hidden="true" />
        </span>
    )
}