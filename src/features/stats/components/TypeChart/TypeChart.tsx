import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip, type ChartOptions, type ScriptableContext } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useAnimalDatabase } from '../../../animals/hooks/useAnimalDatabase';
import { colors, getLabelsFromOptions, getNumbers } from '../../utils';

ChartJS.register(ArcElement, Tooltip, Legend, Title);


export function TypeChart() {
    const { animals } = useAnimalDatabase();
    const labels = getLabelsFromOptions("type");
    const numbers = getNumbers(animals, "type", labels)

    const createGradient = (ctx: CanvasRenderingContext2D, color1: string, color2: string) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    };

    const data = {
        labels: labels,
        datasets: [
            {
                data: numbers,
                backgroundColor: (context: ScriptableContext<'doughnut'>) => {
                    const chart = context.chart;
                    const { ctx } = chart;

                    if (!ctx) return [colors.turquoise, colors.orange];

                    return context.dataIndex === 0
                        ? createGradient(ctx, colors.turquoise, colors.turquoiseRgba)
                        : createGradient(ctx, colors.orangeRgba, colors.orange);
                },
                borderColor: [
                    colors.border
                ],
                borderWidth: 2,
            },
        ]
    };

    const options: ChartOptions<"doughnut"> = {
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "white"
                }
            },
            title: {
                display: true,
                text: "Animal Type Distribution",
                color: "white"
            },
        },
    };

    return <Doughnut data={data} options={options} />;
}
