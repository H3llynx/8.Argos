import "chart.js/auto";
import { ChartPerType } from "./components/ChartPerType/ChartPerType";
import { TypeChart } from "./components/TypeChart/TypeChart";

export function Stats() {

    return (
        <main className="flex-col gap-4">
            <h1 className="font-caveat text-4xl text-center text-white">Rescued animals data</h1>
            <section className="flex flex-wrap gap-2 justify-center lg:justify-between items-center">
                <div className="w-full max-w-xs">
                    <TypeChart />
                </div>
                <div className="w-full max-w-md font-caveat">
                    <ChartPerType data={"age"} />
                </div>
                <div className="w-full max-w-md font-caveat">
                    <ChartPerType data={"sex"} />
                </div>
            </section>
        </main>
    )
}