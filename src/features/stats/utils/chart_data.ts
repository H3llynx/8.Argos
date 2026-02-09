import { animalFields } from "../../../config";
import { capitalize } from "../../../utils/ui";
import type { Animal } from "../../animals/types";

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

export const getCount = (animalList: Animal[], field: keyof typeof animalFields, option: string) => {
    let count = 0;
    animalList.forEach(animal => {
        if (animal[field as keyof Animal] === option.toLowerCase())
            count++
    });
    return count;
};

export const getCountArr = (animalList: Animal[], field: keyof typeof animalFields, labels: string[]) => {
    const numbers: number[] = [];
    labels.forEach(label => {
        const n = getCount(animalList, field, label)
        numbers.push(n);
    })
    return numbers;
};

export const countPerBreed = (animalList: Animal[], breed: string) => {
    let count = 0;
    animalList.forEach(animal => {
        if (animal.breed === breed)
            count++
    });
    return count;
};