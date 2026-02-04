import Camera from "../../../../assets/svg/photo.svg?react";
import { Button } from "../../../../components/atoms/Button/Button";
import type { AnimalTableProps } from "../../types";
import "./AnimalTable.css";

export function AnimalTable({ animals, onEditAnimal, onDeleteAnimal }: AnimalTableProps) {


    return (
        <>
            <h2 id="animals-table" className="animal-h2">Animal listings</h2>
            <div className="shadow-1 table-container">
                <table aria-labelledby="animals-table">
                    <thead>
                        <tr>
                            <th scope="col"><Camera aria-label="Photo" /></th>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Breed</th>
                            <th scope="col">Sex</th>
                            <th scope="col">Age</th>
                            <th scope="col">Size</th>
                            <th scope="col">Location</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {animals.map(animal => (
                            <tr key={animal.id}>
                                <th scope="row" className="h-3">
                                    {animal.photo_url &&
                                        <div className="animal-photo shadow-3">
                                            <img
                                                alt={`Picture of ${animal.name}`}
                                                src={animal.photo_url ?? ""} />
                                        </div>
                                    }
                                </th>
                                <td><span>{animal.name}</span></td>
                                <td><span>{animal.type}</span></td>
                                <td><span>{animal.breed}</span></td>
                                <td><span>{animal.sex}</span></td>
                                <td><span>{animal.age}</span></td>
                                <td><span>{animal.size}</span></td>
                                <td><span>{animal.location}</span></td>
                                <td>{animal.adopted_at ? "adopted" : "available"}</td>
                                <td className="min-w-8 flex h-3 gap-[5px] items-center">
                                    <Button variant="edit" onClick={() => { onEditAnimal(animal) }}>Edit</Button>
                                    <Button variant="delete" onClick={() => onDeleteAnimal(animal)}>Delete</Button>
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </>)
}