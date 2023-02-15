import Header from "../../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";
import "./index.css"

function ListaChamados() {
  const [chamados, setChamados] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/chamados");
        setChamados(data);
        setLoading(false)
      } catch (error) {
        setStatus("Erro ao buscar seus chamados!");
      }
    })();
  }, []);

  return (
    <div className="font-Poppins">
      <Header />
      <main>
        <div class="relative px-6 lg:px-8">
          <div class=" max-w-2xl py-5 sm:py-16 lg:py-16">
            <div class="text-center flex flex-row">
              <h1 class="text-2xl font-semi-bold  text-gray-900 sm:text-4xl">
                Lista de chamados
              </h1>
            </div>
          </div>
        </div>
      </main>
      <body>
        <div className=" w-auto mr-10 ml-10 ">
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead align="center" class="border-b-2">
                      <tr>
                        <th
                          scope="col"
                          class="text-lg font-bold text-gray-900 px-6 py-4"
                        >
                          Nome
                        </th>
                        <th
                          scope="col"
                          class="text-lg font-bold text-gray-900 px-6 py-4 "
                        >
                          Problema
                        </th>
                        <th
                          scope="col"
                          class="text-lg font-bold text-gray-900 px-6 py-4"
                        >
                          Protocolo
                        </th>
                        <th
                          scope="col"
                          class="text-lg font-bold text-gray-900 px-6 py-4 "
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          class="text-lg font-bold text-gray-900 px-6 py-4 "
                        >
                          Detalhes
                        </th>
                        <th
                          scope="col"
                          class="text-lg font-bold text-gray-900 px-6 py-4"
                        >
                          Conclusão
                        </th>
                        <th
                          scope="col"
                          class="text-lg font-bold text-gray-900 px-6 py-4 "
                        >
                          Excluir
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr align="center" class="border-b">
                        {chamados.map((item) => {
                          return (
                            <>
                              <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item.empresa.nome_empresa}
                              </td>
                              <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item.problema}
                              </td>
                              <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item.cod_verificacao}
                              </td>
                              <td class="text-lg text-red-600 font-bold underline px-6 py-4  whitespace-nowrap">
                                {item.status_chamado}
                              </td>
                              <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <Link to="" className="text-azul-hyde">
                                  <FontAwesomeIcon icon={faEye} />
                                </Link>
                              </td>
                              <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
                                <a href="/" className="text-azul-hyde">
                                  <FontAwesomeIcon icon={faEllipsis} />
                                </a>
                              </td>
                              <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
                                <a href="/" className="text-azul-hyde">
                                  <FontAwesomeIcon icon={faTrash} />
                                </a>
                              </td>
                            </>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                      {loading && <div className="flex gap-2 items-center m-auto w-64 mt-10">
                              <AiOutlineLoading3Quarters size={25} className="icon"/>
                              <p className=""> Carregando...</p>
                            </div>}

                      {chamados.length < 1 && (
                        
							<div className="flex gap-2 items-center m-auto w-64 mt-10">
                          		
								<p className=""> Você não possui chamados.</p>
							</div>
                      )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}
export default ListaChamados;
