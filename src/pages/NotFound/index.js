import Notfound from "../../images/404.svg"
import Header from "../../components/header"
import { Link } from "react-router-dom"

export default function Pag404 () {
    return(
        <>
        <Header/>
        <div className="flex w-full h-full items-center justify-center">
            <div className="flex justify-center items-center">
            <div className="p-10 max-w-sm flex flex-col items-center justify-center">
                <div className="flex flex-col justify-start">
                    <h1 className="font-bold text-6xl">Erro 404</h1>
                    <h1 className="text-2xl mb-10">Página não encontrada</h1>
                    <p className="text-gray-500 mb-10">Opss, a página que você procura foi movida, excluida, renomeada ou talvez nunca existiu!</p>
                    <Link className="bg-azul-hyde w-2/3 text-center p-2 px-10 text-white font-semibold rounded-xl" to="/">
                        <span>Página Home</span>
                    </Link>
                </div>
            </div>
            <div className="hidden w-80 h-80 lg:flex justify-center items-center">
                <img className="w-full h-full" src={Notfound} alt="Rôbo quebrado com mensagem de erro 404"/>
                {/* <a href="https://storyset.com/web">Web illustrations by Storyset</a> */}
            </div>
            </div>
        </div>
        </>
    )
}