import { animalFields } from "../../../config";
import type { Animal } from "../../animals/types";

export const capitalize = (label: string) => {
    return (label).charAt(0).toUpperCase() + (label).slice(1);
};

export const getLabelsFromOptions = (field: keyof typeof animalFields,) => {
    const labels: string[] = []
    const fieldData = animalFields[field];
    if ("options" in fieldData) {
        for (const option of fieldData.options) {
            const label = capitalize(option.name);
            labels.push(label);
        }
    }
    return labels;
};

export const getValuesFromOptions = (field: keyof typeof animalFields) => {
    const values: string[] = []
    const fieldData = animalFields[field];
    if ("options" in fieldData) {
        for (const option of fieldData.options) {
            values.push(option.value);
        }
    }
    return values;
};

export const getCount = (AnimalList: Animal[], field: keyof typeof animalFields, option: string) => {
    let count = 0;
    AnimalList.forEach(animal => {
        if (animal[field as keyof Animal] === option.toLowerCase())
            count++
    });
    return count;
};

export const getCountArr = (list: Animal[], field: keyof typeof animalFields, labels: string[]) => {
    const numbers: number[] = [];
    labels.forEach(label => {
        const n = getCount(list, field, label)
        numbers.push(n);
    })
    return numbers;
};