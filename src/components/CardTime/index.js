import  { BsLinkedin } from "react-icons/bs"
import  { BsGithub } from "react-icons/bs"

export default function Card ({item}) {
    return(
        <div className="m-5 w-5/6 md:w-96  lg:m-auto lg:mb-10 flex flex-col justify-center bg-azul-hyde rounded-xl shadow-md ">
            <div className="flex py-10 justify-center items-center border-4 border-white rounded-full w-36 h-36 overflow-hidden m-auto my-10">
                <img className="object-cover" src={item.Foto} alt="foto"/>
            </div>
            <div className="bg-white dark:bg-pretosec w-full rounded-t-3xl rounded-b-md flex flex-col text-center justify-center items-center">
                <h1 className="text-lg font-semibold m-4 dark:text-branco">{item.Nome}</h1>
                <p className="mb-4 w-2/3 text-center text-gray-500 dark:text-branco"><span className="font-bold">Atuação: </span>{item.Atuacao}</p>
                <div className="mb-4 space-x-5 flex flex-row text-azul-hyde">
                    <a href={item.Linkedin} target="_blank">
                        <BsLinkedin size={30}/>
                    </a>
                    <a href={item.Github} target="_blank">
                        <BsGithub size={30}/>
                    </a>
                </div>
            </div>
        </div>
    )
}