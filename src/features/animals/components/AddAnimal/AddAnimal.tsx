import Camera from "../../../../assets/svg/photo.svg?react";
import { Button } from "../../../../components/atoms/Button/Button";
import { Input } from "../../../../components/atoms/Input/Input";
import { formFields } from "../../config";

export function AddAnimal() {
    const { name, type, age, sex, breed, size, location } = formFields;
    return (
        <>
            <h2 className="animal-h2">Add a new rescue:</h2>
            <form className="flex gap-y-1 gap-x-2 flex-wrap">
                <Input
                    label={name.label}
                    id={name.id}
                    type={name.input_type}
                    placeholder="Animal name"
                    className="capitalize"
                    required
                />

                <label className="label" htmlFor="type">
                    <span>{type.label}</span>
                    <select
                        id="type"
                        className="bg-blur"
                        defaultValue="dog"
                    >{type.options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )
                    })}
                    </select>
                </label>

                <label className="label" htmlFor="sex">
                    <span>{sex.label}</span>
                    <select
                        id="sex"
                        className="bg-blur"
                        defaultValue="male"
                    >
                        {sex.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        })}
                    </select>
                </label>

                <label className="label" htmlFor="size">
                    <span>{size.label}</span>
                    <select
                        id="size"
                        className="bg-blur"
                        defaultValue="small"
                    >
                        {size.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        })}
                    </select>
                </label>

                <Input
                    label={breed.label}
                    id={breed.id}
                    type={breed.input_type}
                    placeholder="Breed (if any)"
                />

                <label className="label" htmlFor="age">
                    <span>{age.label}</span>
                    <select
                        id="age"
                        className="bg-blur"
                        defaultValue="adult"
                    >
                        {age.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.description}</option>
                            )
                        })}
                    </select>
                </label>

                <Input
                    label={location.label}
                    id={location.id}
                    type={location.input_type}
                    placeholder="Animal current location"
                    required
                />

                <label htmlFor="photo" className="flex gap-0.5 flex-wrap items-center cursor-pointer text-white md:text-dark">
                    <Camera className="w-1.5" aria-hidden="true" />
                    <input
                        id="photo"
                        className="text-xs font-medium self-center cursor-pointer"
                        type="file" />
                </label>
                <Button variant="update" className="m-auto">Add animal</Button>
            </form>
        </>
    )
}