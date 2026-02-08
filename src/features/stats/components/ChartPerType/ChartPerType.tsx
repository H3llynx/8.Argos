import type { ChartData, ChartOptions, ScriptableContext } from "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import type { animalFields } from "../../../../config";
import { useAnimalDatabase } from "../../../animals/hooks/useAnimalDatabase";
import { capitalize, getCountArr, getLabelsFromOptions, getValuesFromOptions } from "../../utils/chart";
import { chartColors, chartGradients, colors } from "../../utils/colors";

export function ChartPerType({ data }: { data: keyof typeof animalFields }) {
    const labels = getLabelsFromOptions(data);
    const values = getValuesFromOptions(data);
    const animalTypes = getLabelsFromOptions("type");
    const { animals } = useAnimalDatabase();

    const datasets = animalTypes.map((animalType, index) => {
        const animalsOfType = animals.filter(animal => animal.type === animalType.toLowerCase())
        const count = getCountArr(animalsOfType, data, values);
        const label = animalType + "s"

        const color = chartGradients[index]
            ? (context: ScriptableContext<"bar">) => chartGradients[index](context)
            : chartColors[index % chartColors.length];

        return {
            label: label,
            data: count,
            backgroundColor: color,
            borderColor: colors.whiteRgba,
            borderWidth: 1,
        };
    })

    const chartData: ChartData<"bar"> = {
        labels: labels,
        datasets: datasets
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: `${capitalize(data)} Distribution by Animal Type` },
        },
    };

    return <Bar data={chartData} options={options} />;
}