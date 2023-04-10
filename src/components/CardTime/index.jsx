import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";

export default function CardTime({ item }) {
  return (
    <div className="m-5 w-72 mb-10 md:w-80 flex flex-col justify-center bg-azul-hyde rounded-xl shadow-md ">
      <div className="flex py-10 justify-center items-center border-4 border-white rounded-full w-36 h-36 overflow-hidden m-auto my-10">
        <img className="object-cover" src={item.Foto} alt="foto" />
      </div>
      <div className="bg-white h-[12rem] dark:bg-pretosec w-full rounded-t-3xl rounded-b-md grid text-center justify-center items-center">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-lg font-semibold m-4 dark:text-branco">
            {item.Nome}
          </h1>
          <p className="w-4/5 text-gray-500 dark:text-branco">
            <span className="font-bold">Atuação: </span>
            {item.Atuacao}
          </p>
        </div>
        <div className="mb-4 space-x-5 flex flex-row justify-center text-azul-hyde">
          <a href={item.Linkedin} target="_blank" rel="noreferrer">
            <BsLinkedin size={30} />
          </a>
          <a href={item.Github} target="_blank" rel="noreferrer">
            <BsGithub size={30} />
          </a>
        </div>
      </div>
    </div>
  );
}
