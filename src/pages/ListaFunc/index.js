import Header from "../../components/header";
import Footer from "../../components/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import api from "../../api";

function ListaFunc() {
  const [funcs, setFuncs] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/funcionarios");
        console.log(data)
        setFuncs(data);
        setLoading(false);
      } catch (error) {
        setStatus("Erro ao buscar seus funcionários!");
      }
    })();
  }, []);

  
    return (
			<div className="font-Poppins dark:bg-preto">
				<Header />
				<main>
					<div class="relative px-6 lg:px-8">
						<div class=" max-w-2xl py-5 sm:py-16 lg:py-16">
							<div class="text-center flex flex-row">
								<h1 class="text-2xl font-semi-bold  text-gray-900 sm:text-4xl dark:text-white">
									Funcionários cadastrados
								</h1>

								<div class="ml-6 flex items-center justify-center gap-x-6">
									<a
										href="cadastro-funcionario"
										class=" no-underline rounded-md bg-azul-hyde px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
									>
										Novo
									</a>
								</div>
							</div>
						</div>
					</div>
				</main>
        <section className="response ml-6 sm:ml-0 flex w-full p-4 lg:flex-row ">
          <div className=" pesquisa w-1/3 flex items-center relative">
            <input
              className="focus:outline-none focus:border-b-azul-hyde border-b-2 w-full  p-2"
              placeholder="Nome completo"
              name="nome"
              required
            />
            <BiSearchAlt2 size={20} className="absolute right-3" />
          </div>
        </section>

        <body className="h-screen">
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
                            class="text-lg font-medium text-gray-900 px-6 py-4"
                          >
                            Nome
                          </th>
                          <th
                            scope="col"
                            class="text-lg font-medium text-gray-900 px-6 py-4"
                          >
                            Matrícula
                          </th>
                          <th
                            scope="col"
                            class="text-lg font-medium text-gray-900 px-6 py-4"
                          >
                            Usuário
                          </th>
                          <th
                            scope="col"
                            class="text-lg font-bold text-gray-900 px-6 py-4 "
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            class="text-lg font-medium text-gray-900 px-6 py-4"
                          >
                            Editar
                          </th>
                          <th
                            scope="col"
                            class="text-lg font-medium text-gray-900 px-6 py-4"
                          >
                            Excluir
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                          {funcs.map((item) => {
                            return (
                              
                              <tr align="center" class="border-b">
                                <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item.nome}
                                </td>
                                <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item.matricula}
                                </td>
                                <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item.usuario}
                                </td>
                                <td class="text-lg text-red-600 font-bold underline px-6 py-4  whitespace-nowrap">
                                  {item.status_funcionario}
                                </td>
                                <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  <a href="/">
                                    <FontAwesomeIcon icon={faPen} />
                                  </a>
                                </td>
                                <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
                                  <a href="/">
                                    <FontAwesomeIcon icon={faTrash} />
                                  </a>
                                </td>
                                </tr>
                              
                            );
                          })}
                      </tbody>
                    </table>
                    {loading && (
                      <div className="flex gap-2 items-center m-auto w-64 mt-10">
                        <AiOutlineLoading3Quarters size={25} className="icon" />
                        <p className=""> Carregando...</p>
                      </div>
                    )}

                    {funcs.length < 1 && (
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
        <Footer/>
      </>
    );
  }

export default ListaFunc;
