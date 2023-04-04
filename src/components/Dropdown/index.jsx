// React
import { useState } from "react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  StarIcon,
  CheckBadgeIcon,
  ArchiveBoxIcon,
  XCircleIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

// Components
import ModalConclusao from "../ModalConclusao";
import ModalCancelar from "../ModalCancelar";
import ModalAceitar from "../ModalAceitar";
import ModalSuspender from "../ModalSuspender";
import ModalConcluir from "../ModalConcluir";
import ModalAvaliacao from "../ModalAvaliacao";

// Modal
import { Menu } from "@headlessui/react";
import { Float } from "@headlessui-float/react";

import secureLocalStorage from "react-secure-storage";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Dropdown({ item }) {
  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  const type = JSON.parse(secureLocalStorage.getItem("Tipo"));

  // Modals states
  const [isOpenConclusao, setIsOpenConclusao] = useState(false);
  const [IsOpenAvaliacao, setIsOpenAvaliacao] = useState(false);
  const [IsOpenCancel, setIsOpenCancel] = useState(false);
  const [IsOpenAceitar, setIsOpenAceitar] = useState(false);
  const [IsOpenSuspender, setIsOpenSuspender] = useState(false);
  const [IsOpenConcluir, setIsOpenConcluir] = useState(false);

  // Modal conditions
  const [estaConcluido, setEstaConcluido] = useState(null);
  const [estaAvaliado, setEstaAvaliado] = useState(null);
  const [request, setRequest] = useState(true);

  async function getConcluido() {
    const response = await api.get(`/conclusoes?chamado_id=${item.id_chamado}`);

    if (response.data.length > 0) {
      setEstaConcluido(true);

      if (response.data[0].num_avaliacao !== null) {
        setEstaAvaliado(true);
      }
    }

    setRequest(false);
  }

  return (
    <>
      <ModalConclusao
        open={isOpenConclusao}
        dataChamado={item}
        onClose={() => setIsOpenConclusao(false)}
      />
      <ModalAvaliacao
        open={IsOpenAvaliacao}
        dataChamado={item}
        onClose={() => setIsOpenAvaliacao(false)}
      />
      <ModalCancelar
        open={IsOpenCancel}
        id={item.id_chamado}
        onClose={() => setIsOpenCancel(false)}
      />
      <ModalAceitar
        open={IsOpenAceitar}
        ids={{ id_chamado: item.id_chamado, tecnico_id: id }}
        onClose={() => setIsOpenAceitar(false)}
      />
      <ModalSuspender
        open={IsOpenSuspender}
        id={item.id_chamado}
        onClose={() => setIsOpenSuspender(false)}
      />
      <ModalConcluir
        open={IsOpenConcluir}
        id={item.id_chamado}
        onClose={() => setIsOpenConcluir(false)}
      />

      <Menu as="div" className="relative z-10 inline-block text-left">
        <Float placement="bottom-end" offset={4} portal>
          <div>
            <Menu.Button
              onClick={() => {
                if (request) {
                  getConcluido();
                }
              }}
            >
              {" "}
              <FontAwesomeIcon className="text-azul-hyde" icon={faEllipsis} />
            </Menu.Button>
          </div>

          <Menu.Items className="absolute -right-5 z-10 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-2 ">
              {!request ? (
                <>
                  <Menu.Item>
                    <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                      <ArchiveBoxIcon
                        className="h-6 w-6 text-azul-hyde group-hover:text-white"
                        aria-hidden="true"
                      />
                      <Link
                        to={"/detalhes/" + item.id_chamado}
                        className="block w-full px-2 py-2 text-left text-sm dark:text-branco  font-semibold group-hover:text-white"
                      >
                        Detalhes
                      </Link>
                    </div>
                  </Menu.Item>
                  {estaConcluido && type !== "tecnicos" && (
                    <Menu.Item>
                      <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                        <CheckBadgeIcon
                          className="h-6 w-6 text-azul-hyde group-hover:text-white"
                          aria-hidden="true"
                        />
                        <button
                          onClick={() => setIsOpenConclusao(true)}
                          className="block w-full px-2 py-2 text-left text-sm dark:text-branco font-semibold group-hover:text-white"
                        >
                          Conclusão
                        </button>
                      </div>
                    </Menu.Item>
                  )}

                  {estaConcluido && !estaAvaliado && type !== "tecnicos" && (
                    <Menu.Item>
                      <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                        <StarIcon
                          className="h-6 w-6 text-azul-hyde group-hover:text-white"
                          aria-hidden="true"
                        />
                        <button
                          onClick={() => setIsOpenAvaliacao(true)}
                          className="block w-full px-2 py-2 text-left text-sm dark:text-branco font-semibold group-hover:text-white"
                        >
                          Avaliação
                        </button>
                      </div>
                    </Menu.Item>
                  )}

                  {item.status_chamado !== "cancelado" &&
                    item.status_chamado !== "concluido" &&
                    type !== "tecnicos" && (
                      <Menu.Item>
                        <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                          <XCircleIcon
                            className="h-6 w-6 text-azul-hyde group-hover:text-white"
                            aria-hidden="true"
                          />
                          <button
                            onClick={() => setIsOpenCancel(true)}
                            className="block w-full px-2 py-2 text-left text-sm dark:text-branco font-semibold group-hover:text-white"
                          >
                            Cancelar
                          </button>
                        </div>
                      </Menu.Item>
                    )}
                  {item.status_chamado === "pendente" &&
                    type === "tecnicos" && (
                      <Menu.Item>
                        <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                          <CheckCircleIcon
                            className="h-6 w-6 text-azul-hyde group-hover:text-white"
                            aria-hidden="true"
                          />
                          <button
                            onClick={() => setIsOpenAceitar(true)}
                            className="block w-full px-2 py-2 text-left text-sm dark:text-branco font-semibold group-hover:text-white"
                          >
                            Aceitar
                          </button>
                        </div>
                      </Menu.Item>
                    )}
                  {item.tecnico_id === id &&
                    type === "tecnicos" &&
                    item.status_chamado === "andamento" && (
                      <Menu.Item>
                        <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                          <ClipboardDocumentCheckIcon
                            className="h-6 w-6 text-azul-hyde group-hover:text-white"
                            aria-hidden="true"
                          />
                          <button
                            onClick={() => setIsOpenConcluir(true)}
                            className="block w-full px-2 py-2 text-left text-sm dark:text-branco font-semibold group-hover:text-white"
                          >
                            Concluir
                          </button>
                        </div>
                      </Menu.Item>
                    )}
                  {item.tecnico_id === id &&
                    type === "tecnicos" &&
                    item.status_chamado === "andamento" && (
                      <Menu.Item>
                        <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                          <XCircleIcon
                            className="h-6 w-6 text-azul-hyde group-hover:text-white"
                            aria-hidden="true"
                          />
                          <button
                            onClick={() => setIsOpenSuspender(true)}
                            className="block w-full px-2 py-2 text-left text-sm dark:text-branco font-semibold group-hover:text-white"
                          >
                            Suspender
                          </button>
                        </div>
                      </Menu.Item>
                    )}
                </>
              ) : (
                <Menu.Items>
                  <div className="flex gap-2 items-center justify-center m-auto w-full p-5">
                    <AiOutlineLoading3Quarters
                      size={25}
                      className="icon dark:text-gray-50"
                    />
                  </div>
                </Menu.Items>
              )}
            </div>
          </Menu.Items>
        </Float>
      </Menu>
    </>
  );
}
