import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Float } from "@headlessui-float/react";
import {
  StarIcon,
  CheckBadgeIcon,
  ArchiveBoxIcon,
  XCircleIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon
} from "@heroicons/react/24/outline";
import Modais from "../ModaisChamado";
import ModalCancelar from "../ModalCancelar"
import ModalAceitar from "../ModalAceitar";
import ModalSuspender from "../ModalSuspender";
import ModalConcluir from "../ModalConcluir";
import { useNavigate } from "react-router-dom";

export default function Dropdown({ item }) {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("Id"));
  const type = JSON.parse(localStorage.getItem("Tipo"));
  let [isOpenConclusao, setIsOpenConclusao] = useState(false);
  let [IsOpenAvaliacao, setIsOpenAvaliacao] = useState(false);
  let [IsOpenCancel, setIsOpenCancel] = useState(false);
  let [IsOpenAceitar, setIsOpenAceitar] = useState(false);
  let [IsOpenSuspender, setIsOpenSuspender] = useState(false);
  let [IsOpenConcluir, setIsOpenConcluir] = useState(false);

  return (
    <>
    <Modais open={isOpenConclusao} type="conclusao" dataChamado={item} onClose={() => setIsOpenConclusao(false)}/>
    <Modais open={IsOpenAvaliacao} type="avaliacao" dataChamado={item} onClose={() => setIsOpenAvaliacao(false)}/>
    <ModalCancelar open={IsOpenCancel} id={item.id_chamado} onClose={() => setIsOpenCancel(false)}/>
    <ModalAceitar open={IsOpenAceitar} ids={ {id_chamado: item.id_chamado, tecnico_id:id}} onClose={() => setIsOpenAceitar(false)} navigate={(e) => navigate(e)}/>
    <ModalSuspender open={IsOpenSuspender} id={item.id_chamado} onClose={() => setIsOpenSuspender(false)} navigate={(e) => navigate(e)}/>
    <ModalConcluir open={IsOpenConcluir} id={item.id_chamado} onClose={() => setIsOpenConcluir(false)}/>


      <Menu as="div" className="relative z-50 inline-block text-left">
        <Float portal>
          <div>
            <Menu.Button>
              {" "}
              <FontAwesomeIcon className="text-azul-hyde" icon={faEllipsis} />
            </Menu.Button>
          </div>

          <Menu.Items className="absolute -right-5 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-2 ">
              <Menu.Item>
                <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                  <ArchiveBoxIcon
                    className="h-6 w-6 text-azul-hyde group-hover:text-white"
                    aria-hidden="true"
                  />
                  <Link
                    to={"/detalhes/" + item.id_chamado}
                    className="block w-full px-2 py-2 text-left text-sm  font-semibold group-hover:text-white"
                  >
                    Detalhes
                  </Link>
                </div>
              </Menu.Item>
              <Menu.Item>
                <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                  <CheckBadgeIcon
                    className="h-6 w-6 text-azul-hyde group-hover:text-white"
                    aria-hidden="true"
                  />
                  <button
                    onClick={() => setIsOpenConclusao(true)}
                    className="block w-full px-2 py-2 text-left text-sm font-semibold group-hover:text-white"
                  >
                    Conclusão
                  </button>
                </div>
              </Menu.Item>
              <Menu.Item>
                <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                  <StarIcon
                    className="h-6 w-6 text-azul-hyde group-hover:text-white"
                    aria-hidden="true"
                  />
                  <button
                    onClick={() => setIsOpenAvaliacao(true)}
                    className="block w-full px-2 py-2 text-left text-sm font-semibold group-hover:text-white"
                  >
                    Avaliação
                  </button>
                </div>
              </Menu.Item>
              {item.status_chamado !== "cancelado" && type !== "tecnicos" &&
                (<Menu.Item>
                  <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                    <XCircleIcon
                      className="h-6 w-6 text-azul-hyde group-hover:text-white"
                      aria-hidden="true"
                    />
                    <button
                      onClick={() => setIsOpenCancel(true)}
                      className="block w-full px-2 py-2 text-left text-sm font-semibold group-hover:text-white"
                    >
                      Suspender
                    </button>
                  </div>
                </Menu.Item>)
              }
              {item.status_chamado == "pendente" && type == "tecnicos" &&
                (<Menu.Item>
                  <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                    <CheckCircleIcon
                      className="h-6 w-6 text-azul-hyde group-hover:text-white"
                      aria-hidden="true"
                    />
                    <button
                      onClick={() => setIsOpenAceitar(true)}
                      className="block w-full px-2 py-2 text-left text-sm font-semibold group-hover:text-white"
                    >
                      Aceitar
                    </button>
                  </div>
                </Menu.Item>)
              }
              {item.tecnico_id == id && type == "tecnicos" && item.status_chamado == "andamento" &&
                (<Menu.Item>
                  <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                    <ClipboardDocumentCheckIcon
                      className="h-6 w-6 text-azul-hyde group-hover:text-white"
                      aria-hidden="true"
                    />
                    <button
                      onClick={() => setIsOpenConcluir(true)}
                      className="block w-full px-2 py-2 text-left text-sm font-semibold group-hover:text-white"
                    >
                     Concluir
                    </button>
                  </div>
                </Menu.Item>)
              }
              {item.tecnico_id == id && type == "tecnicos" && item.status_chamado == "andamento" &&
                (<Menu.Item>
                  <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                    <XCircleIcon
                      className="h-6 w-6 text-azul-hyde group-hover:text-white"
                      aria-hidden="true"
                    />
                    <button
                      onClick={() => setIsOpenSuspender(true)}
                      className="block w-full px-2 py-2 text-left text-sm font-semibold group-hover:text-white"
                    >
                      Suspender
                    </button>
                  </div>
                </Menu.Item>)
              }
            </div>
          </Menu.Items>
        </Float>
      </Menu>
    </>
  );
}
