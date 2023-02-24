import Header from "../../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import api from "../../api";
import { BiSearchAlt2 } from "react-icons/bi";
import "./index.css";

function ListaChamados() {
  const [chamados, setChamados] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/chamados");
        setChamados(data);
        setLoading(false);
      } catch (error) {
        setStatus("Erro ao buscar seus chamados!");
      }
    })();
  }, []);

  return (
		<div className=" dark:bg-preto font-Poppins teste h-screen">
			<Header />
			<main class="dark:bg-preto">
				<div class="relative px-6 lg:px-8">
					<div class=" max-w-2xl py-5 :py-16 lg:py-16">
						<div class="text-center flex flex-row">
							<h1 class=" texto text-2xl ml-6 first-letter:font-semibold sm:ml-0 text-gray-900 sm:text-4xl dark:text-white">
								Lista de chamados
							</h1>
						</div>
					</div>
				</div>
			</main>

			<section className="response ml-6 sm:ml-0 flex w-full p-4 lg:flex-row dark:bg-preto">
				<div className=" pesquisa w-1/3 flex items-center relative">
					<input
						className="focus:outline-none focus:border-b-azul-hyde border-b-2 w-full  p-2  dark:text-branco  dark:bg-preto"
						placeholder="Nome completo"
						name="nome"
						required
					/>
					<BiSearchAlt2 size={20} className="absolute right-3" />
				</div>
				<div className="filtro w-1/4 ml-4  flex items-center mr-8">
					<div className="w-full">
						<select
							className="focus:outline-none focus:border-b-azul-hyde border-b-2 w-full p-2  dark:text-branco  dark:bg-preto"
							name="especialidade"
							required
						>
							<option selected disabled>
								Selecione uma opção
							</option>
							<option value="Desenvolvedor">Desenvolvedor</option>
							<option value="Infraestrutura">Infraestrutura</option>
							<option value="Sistemas operacionais">
								Sistemas operacionais
							</option>
						</select>
					</div>
				</div>
				<button
					type="submit"
					className=" botao hover:bg-cyan-600  bg-azul-hyde p-2 rounded-xl text-white font-bold text-lg    "
				>
					Pesquisar
				</button>
			</section>

			<body className="dark:bg-preto">
				<div className=" w-full  sm:ml-0 sm:mr-0">
					<div class="flex  flex-col ">
						<div class="overflow-x-auto  lg:-mx-8">
							<div class="py-8 inline-block min-w-full sm:px-2 lg:px-">
								<div class="overflow-hidden">
									<table class="min-w-full">
										<thead align="center" class="border-b-2 w-full">
											<tr>
												<th
													scope="col"
													class="text-lg font-bold text-gray-900 px-6 py-4 dark:text-white"
												>
													Nome
												</th>
												<th
													scope="col"
													class="text-lg font-bold text-gray-900 px-6 py-4 dark:text-white"
												>
													Problema
												</th>
												<th
													scope="col"
													class="text-lg font-bold text-gray-900 px-6 py-4 dark:text-white"
												>
													Protocolo
												</th>
												<th
													scope="col"
													class="text-lg font-bold text-gray-900 px-6 py-4 dark:text-white"
												>
													Status
												</th>
												<th
													scope="col"
													class="text-lg font-bold text-gray-900 px-6 py-4 dark:text-white"
												>
													Detalhes
												</th>
												<th
													scope="col"
													class="text-lg font-bold text-gray-900 px-6 py-4 dark:text-white"
												>
													Conclusão
												</th>
												<th
													scope="col"
													class="text-lg font-bold text-gray-900 px-6 py-4 dark:text-white"
												>
													Excluir
												</th>
											</tr>
										</thead>
										<tbody classname="dark:bg-preto">
											<tr align="center" class="border-b">
												{chamados.map((item) => {
													return (
														<>
															<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap dark:text-white">
																{item.empresa.nome_empresa}
															</td>
															<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap dark:text-white">
																{item.problema}
															</td>
															<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap dark:text-white">
																{item.cod_verificacao}
															</td>
															<td class="text-lg text-red-600 font-bold underline px-6 py-4  whitespace-nowrap dark:text-white">
																{item.status_chamado}
															</td>
															<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap dark:text-white">
																<Link to="" className="text-azul-hyde">
																	<FontAwesomeIcon icon={faEye} />
																</Link>
															</td>
															<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap dark:text-white">
																<a href="/" className="text-azul-hyde">
																	<FontAwesomeIcon icon={faEllipsis} />
																</a>
															</td>
															<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap dark:text-white">
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
									{loading && (
										<div className="flex gap-2 items-center m-auto w-64 mt-10">
											<AiOutlineLoading3Quarters size={25} className="icon" />
											<p className=""> Carregando...</p>
										</div>
									)}

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
