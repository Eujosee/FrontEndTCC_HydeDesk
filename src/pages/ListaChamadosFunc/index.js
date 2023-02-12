import Header from "../../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

function ListaChamadosFunc() {
	return (
		<div className="font-Poppins">
			<Header />
			<main>
				<div class="relative px-6 lg:px-8">
					<div class=" max-w-2xl py-5 sm:py-48 lg:py-56">
						<div class="text-center flex flex-row">
							<h1 class="text-2xl font-semi-bold  text-gray-900 sm:text-4xl">
								Lista de chamados
							</h1>
                            <div class="ml-6 flex items-center justify-center gap-x-6">
								<a
									href="cadastro-funcionario"
									class=" no-underline rounded-md bg-azul-hyde px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
								>
									Novo
								</a>
							</div>
                            <div class="ml-6 flex items-center justify-center gap-x-6">
								<a
									href="cadastro-funcionario"
									class=" no-underline rounded-md bg-azul-hyde px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
								>
									Avaliar
								</a>
							</div>
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
										<thead class="border-b-2">
											<tr>
												<th
													scope="col"
													class="text-lg font-medium text-gray-900 px-6 py-4 text-left"
												>
													Nome
												</th>
												<th
													scope="col"
													class="text-lg font-medium text-gray-900 px-6 py-4 text-left"
												>
													Problema
												</th>
												<th
													scope="col"
													class="text-lg font-medium text-gray-900 px-6 py-4 text-left"
												>
													Protocolo
												</th>
												<th
													scope="col"
													class="text-lg font-medium text-gray-900 px-6 py-4 text-left"
												>
													Status
												</th>
												<th
													scope="col"
													class="text-lg font-medium text-gray-900 px-6 py-4 text-left"
												>
													Detalhes
												</th>
												<th
													scope="col"
													class="text-lg font-medium text-gray-900 px-6 py-4 text-left"
												>
													Conclusão
												</th>
												<th
													scope="col"
													class="text-lg font-medium text-gray-900 px-6 py-4 text-left"
												>
													Excluir
												</th>
											</tr>
										</thead>
										<tbody>
											<tr class="border-b">
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													Fulano da Silva
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													Hardware
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    0212112121
												</td>
												<td class="text-lg text-red-600 font-bold underline px-6 py-4  whitespace-nowrap">
                                                    Em aberto
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													<a href="/">
														<FontAwesomeIcon icon={faEye} />
													</a>
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
													<a href="/">
														<FontAwesomeIcon icon={faEllipsis} />
													</a>
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
													<a href="/">
														<FontAwesomeIcon icon={faTrash} />
													</a>
												</td>
											</tr>

                                            <tr class="border-c">
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													Fulano da Silva
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													Rede
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    219302401
												</td>
												<td class="text-lg text-yellow-600 font-bold underline px-6 py-4  whitespace-nowrap">
                                                    Em andamento
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													<a href="/">
														<FontAwesomeIcon icon={faEye} />
													</a>
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
													<a href="/">
														<FontAwesomeIcon icon={faEllipsis} />
													</a>
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
													<a href="/">
														<FontAwesomeIcon icon={faTrash} />
													</a>
												</td>
											</tr>
                                            <tr class="border-d">
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													Fulano da Silva
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													Software
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    45644564
												</td>
												<td class="text-lg text-green-600 font-bold underline px-6 py-4  whitespace-nowrap">
                                                    Concluído
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													<a href="/">
														<FontAwesomeIcon icon={faEye} />
													</a>
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
													<a href="/">
														<FontAwesomeIcon icon={faEllipsis} />
													</a>
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
													<a href="/">
														<FontAwesomeIcon icon={faTrash} />
													</a>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</body>
		</div>
	);
}
export default ListaChamadosFunc;
