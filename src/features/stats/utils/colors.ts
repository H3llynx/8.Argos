import type { ChartType, ScriptableContext } from "chart.js";

export const colors = {
    dark: "#242424",
    white: "#ffffff",
    whiteRgba: "rgba(255, 255, 255, 0.6)",
    orange: "#FF7F11",
    orangeRgba: "rgba(255, 127, 17, 0.6)",
    turquoise: "#0097a7",
    turquoiseRgba: "rgba(0, 151, 167, 0.4)",
}

export const createGradient = (ctx: CanvasRenderingContext2D, color1: string, color2: string) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
};

export const turquoiseGradient = <T extends ChartType = ChartType>(context: ScriptableContext<T>) => {
    const { ctx } = context.chart;
    return createGradient(ctx, colors.turquoise, colors.turquoiseRgba)
};

export const orangeGradient = <T extends ChartType = ChartType>(context: ScriptableContext<T>) => {
    const { ctx } = context.chart;
    return createGradient(ctx, colors.orangeRgba, colors.orange)
};

export const chartGradients = [
    turquoiseGradient,
    orangeGradient,
];

export const chartColors = [
    "#14B8A6", "#ffbf00", "#e73737", "#3d95ff"
];

export const setChartColors = <T extends ChartType = ChartType>(
    context: ScriptableContext<T>
) => {
    const index = context.dataIndex;
    if (chartGradients[index]) {
        return chartGradients[index](context);
    }
    return chartColors[index] ?? chartColors[0];
};