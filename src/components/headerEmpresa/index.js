import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function HeaderEmpresa({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <div className="font-Poppins">
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-5xl font-bold leading-relaxed mr-4 py-2 whitespace-nowrap text-white flex"
              href="#pablo"
            >
              <p className="text-black ">Hyde</p>
              <p className="text-azul-hyde">Desk</p>
            </a>
            <button
              className=" cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FontAwesomeIcon icon={faBars} className="h-10 w-10" />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-2xl uppercase font-bold leading-snug text-black hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-black opacity-75"></i>
                  <span className="ml-2">Chamados</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-2xl uppercase font-bold leading-snug text-black hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-black opacity-75"></i>
                  <span className="ml-2">Funcionarios</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="ml-5 px-3 py-2 flex items-center content-center text-2xl uppercase font-bold leading-snug rounded-2xl bg-azul-hyde hover:bg-black text-azul-hyde"
                  href="#pablo"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-black opacity-75 "></i>
                  <span className="text-white">Perfil</span>
                </a>
              </li>
              <li className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug"
                  type="button"
                  onClick={() => ""}
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="h-10 w-10 ml-4 hover:text-azul-hyde"
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
