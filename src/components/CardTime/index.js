import Teste from "../../images/floppa.jpg"
import  { BsLinkedin } from "react-icons/bs"
import  { BsGithub } from "react-icons/bs"
import { Link } from "react-router-dom"

export default function Card (props) {
    return(
        <div className="w-96 flex flex-col justify-center bg-azul-hyde rounded-xl shadow-2xl dark:bg-preto">
            <div className="flex py-10 justify-center items-center">
                <img className="border-4 border-white rounded-full w-36 h-36" src={Teste} alt=""/>
            </div>
            <div className="bg-white w-full rounded-t-3xl rounded-b-xl flex flex-col text-center justify-center items-center">
                <h1 className=" text-lg font-semibold m-4">Fulano de tal</h1>
                <p className="mb-4 w-2/3 text-justify  text-gray-500">Participou do time de front end e back, auxiliando na criação das páginas e nas rotas da API.</p>
                <div className="mb-4 space-x-5 flex flex-row text-azul-hyde">
                    <Link to="">
                        <BsLinkedin size={30}/>
                    </Link>
                    <Link to="">
                        <BsGithub size={30}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}