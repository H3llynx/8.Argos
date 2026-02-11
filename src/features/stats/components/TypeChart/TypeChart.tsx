import type { ChartData, ChartOptions } from "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';
import { useAnimal } from "../../../animals/hooks/useContexts";
import { getCountArr, getLabelsFromOptions, getValuesFromOptions } from "../../utils/chart_data";
import { colors, setChartColors } from '../../utils/ui';

const labels = getLabelsFromOptions("type");
const values = getValuesFromOptions("type");

export function TypeChart() {
    const { animals } = useAnimal();
    const count = getCountArr(animals, "type", values)
    const labelsInPlural = labels.map(label => label += "s")

    const data: ChartData<"doughnut"> = {
        labels: labelsInPlural,
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
                text: "Animal Type Distribution",
                color: "#333"
            },
        },
    };

    return <Doughnut data={data} options={options} />;
}
