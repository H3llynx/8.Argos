import { animalFields } from "../../config";
import type { Animal } from "../animals/types";

export const colors = {
    dark: "#242424",
    white: "#ffffff",
    turquoise: "#0097a7",
    turquoiseRgba: "rgba(0, 151, 167, 0.4)",
    red: "#e73737",
    orange: "#FF7F11",
    orangeRgba: "rgba(255, 127, 17, 0.6)",
    border: "rgba(255, 255, 255, 0.6)"
}

export const getLabelsFromOptions = (field: keyof typeof animalFields) => {
    const labels: string[] = []
    const fieldData = animalFields[field];
    if ("options" in fieldData) {
        for (const option of fieldData.options) {
            const label = (option.name).charAt(0).toUpperCase() + (option.name).slice(1)
            labels.push(label);
        }
    }
    return labels;
};

export const getCount = (AnimalList: Animal[], field: keyof Animal, option: string) => {
    let count = 0;
    AnimalList.forEach(animal => {
        if (animal[field] === option.toLowerCase())
            count++
    });
    return count;
};

export const getNumbers = (list: Animal[], field: keyof Animal, labels: string[]) => {
    const numbers: number[] = [];
    labels.forEach(label => {
        const n = getCount(list, field, label)
        numbers.push(n);
    })
    return numbers;
}