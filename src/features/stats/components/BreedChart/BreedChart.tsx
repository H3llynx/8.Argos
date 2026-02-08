import type { ChartData, ChartOptions } from "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';
import { useAnimalDatabase } from "../../../animals/hooks/useAnimalDatabase";
import { capitalize } from "../../../utils";
import { countPerBreed } from "../../utils/chart_data";
import { colors, setChartColors } from "../../utils/ui";

export function BreedChart({ type }: { type: string }) {
    const { animals } = useAnimalDatabase();
    const animalsOfType = animals.filter(animal => animal.type === type);
    const breeds = [...new Set(animalsOfType.map(animal => animal.breed))];
    const labels = breeds.map(breed => capitalize(breed));
    const count = breeds.map(breed => countPerBreed(animalsOfType, breed));

    const data: ChartData<"doughnut"> = {
        labels: labels,
        datasets: [
            {
                data: count,
                backgroundColor: setChartColors,
                borderColor: [
                    colors.whiteRgba
                ],
                borderWidth: 1,
            },
        ]
    };

    const options: ChartOptions<"doughnut"> = {
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#333"
                }
            },
            title: {
                display: true,
                text: `${capitalize(type)} Breed Distribution`,
                color: "#333"
            },
        },
    };

    return <Doughnut data={data} options={options} />;
}