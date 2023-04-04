import FormAbrirChamado from "../../components/FormAbrirChamado";
import Imagem from "../../images/imageCAD.svg";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function AbrirChamado() {
  return (
    <>
      <div className="flex w-screen min-h-screen md:h-screen items-center dark:text-branco  dark:bg-preto  ">
        <div className="flex w-full items-center">
          <div className="hidden w-2/6 h-screen lg:flex lg:flex-col bg-azul-claro-hyde dark:bg-azul-hyde justify-center items-center no-underline">
            <Link to="/">
              <h1 className="font-extrabold text-gray-900 mr-2 text-3xl mb-12 no-underline ">
                <span className="font-extrabold text-white text-3xl">Hyde</span>
                Desk
              </h1>
            </Link>
            <img
              className="w-3/4 h-3/4"
              src={Imagem}
              alt="Mulher mexendo no celular para fazer login"
            />
          </div>
          <div className="flex flex-col w-full h-full items-center overflow-y-auto">
            <div className="flex w-full mt-10 lg:px-20 px-10 items-start justify-start">
              <Link
                className=" no-underline text-black dark:text-branco "
                to="/lista-chamados"
              >
                <AiOutlineArrowLeft size={20} />
              </Link>
            </div>
            <div className="h-4/5">
              <FormAbrirChamado />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
