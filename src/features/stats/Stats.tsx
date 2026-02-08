import "chart.js/auto";
import { BreedChart } from "./components/BreedChart/BreedChart";
import { ChartPerType } from "./components/ChartPerType/ChartPerType";
import { TypeChart } from "./components/TypeChart/TypeChart";
import "./Stats.css";

export function Stats() {

    return (
        <>
            <div className="stats-background" />
            <main className="flex-col gap-4">
                <h1 className="font-caveat text-4xl text-center text-dark">Rescued animals data</h1>
                <section className="flex flex-wrap gap-2 justify-center lg:justify-between items-center">
                    <div className="w-full max-w-xs">
                        <TypeChart />
                    </div>
                    <div className="chart-container bg-blur">
                        <ChartPerType data={"age"} />
                    </div>
                    <div className="chart-container bg-blur">
                        <ChartPerType data={"sex"} />
                    </div>
                    <div className="w-full max-w-xs">
                        <BreedChart type={"dog"} />
                    </div>
                    <div className="w-full max-w-xs">
                        <BreedChart type={"cat"} />
                    </div>
                </section>
            </main>
        </>
    )
}