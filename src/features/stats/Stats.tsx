import { TypeChart } from "./components/TypeChart/TypeChart";

export function Stats() {
    return (
        <main className="flex-col gap-4">
            <h1 className="font-caveat text-4xl text-center text-white">Rescued animals data</h1>
            <section className="flex flex-wrap gap-2 justify-center">
                <div className="w-full max-w-xs font-caveat">
                    <TypeChart />
                </div>
            </section>
        </main>
    )
}