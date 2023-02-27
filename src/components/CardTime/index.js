import Teste from "../../images/floppa.jpg"
import  { BsLinkedin } from "react-icons/bs"
import  { BsGithub } from "react-icons/bs"
import { Link } from "react-router-dom"

export default function Card (props) {
    return(
        <div className="m-5 w-84 md:w-96  lg:m-auto lg:mb-10 flex flex-col justify-center bg-azul-hyde rounded-xl shadow-md dark:bg-preto">
            <div className="flex py-10 justify-center items-center">
                <img className="border-4 border-white rounded-full w-36 h-36" src={Teste} alt=""/>
            </div>
            <div className="bg-white w-full rounded-t-3xl rounded-b-xl flex flex-col text-center justify-center items-center">
                <h1 className=" text-lg font-semibold m-4">Fulano de tal</h1>
                <p className="mb-4 w-2/3 text-justify  text-gray-500">Participou do time de front e back-end, auxiliando na criação das páginas e nas rotas da API.</p>
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