import { Footer } from "../../components/footer/Footer"
import { Header } from "../../components/header/Header"
export function Home() {
    return (
        <div className="flex flex-col justify-between min-h-dvh">
            <Header />
            <main><p>Contenu</p></main>
            <Footer />
        </div>
    )
}