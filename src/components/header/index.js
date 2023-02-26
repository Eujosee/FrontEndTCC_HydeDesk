import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Context } from "../../Context/AuthContext";
import { FiLogOut } from "react-icons/fi"


export default function HeaderEmpresa({ fixed }) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const type = JSON.parse(localStorage.getItem("Tipo"))
  const { authenticated, handleLogout }  = useContext(Context)

  return (
    <div className="font-Poppins">
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-3xl font-bold leading-relaxed mr-4 py-2 whitespace-nowrap text-white flex"
              to="/"
            >
              <p className="text-black ">Hyde</p>
              <p className="text-azul-hyde">Desk</p>
            </Link>
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
                <Link
                  className="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-black hover:opacity-75"
                  to="/"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-black opacity-75"></i>
                  <span className="ml-2">Página inicial</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-black hover:opacity-75"
                  to="/"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-black opacity-75"></i>
                  <span className="ml-2">Quem somos?</span>
                </Link>
              </li>
              {authenticated && <li className="nav-item">
              <Link
                  className="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-black hover:opacity-75"
                  to="/lista-chamados"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-black opacity-75 "></i>
                  <span className="ml-2">Chamados</span>
                </Link>
              </li>}
              {type === "empresas" && <li className="nav-item">
              <Link
                  className="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-black hover:opacity-75"
                  to="/lista-funcionarios"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-black opacity-75 "></i>
                  <span className="ml-2">Funcionários</span>
                </Link>
              </li>}
              <li className="nav-item">
                {!authenticated ? <Link
                  className="ml-5 px-3 py-2 flex items-center content-center text-xl uppercase font-bold leading-snug rounded-2xl bg-azul-hyde hover:bg-cyan-600 text-azul-hyde"
                  to="/login"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-black opacity-75 "></i>
                  <span className="text-white">Login</span>
                </Link> :  <Link
                  className="ml-5 px-3 py-2 flex items-center content-center text-xl uppercase font-bold leading-snug rounded-2xl bg-azul-hyde hover:bg-cyan-600 text-azul-hyde"
                  to="/perfil"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-black opacity-75 "></i>
                  <span className="text-white">Perfil</span>
                </Link>}
                
              </li>
              {authenticated && <li className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug"
                  type="button"
                  onClick={() => handleLogout()}
                >
                  <FiLogOut
                    size={30}
                    className="ml-4 hover:text-azul-hyde"
                  />
                </button>
              </li>}
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
