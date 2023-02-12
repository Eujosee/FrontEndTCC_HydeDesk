import Header from "../../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ListaFunc() {
	return (
		<div className="font-Poppins">
			<Header />
			<main>
				<div class="relative px-6 lg:px-8">
					<div class=" max-w-2xl py-5 sm:py-48 lg:py-56">
						<div class="text-center flex flex-row">
							<h1 class="text-2xl font-semi-bold  text-gray-900 sm:text-4xl">
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
											<tr align="center" class="border-b">
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													Fulano da Silva
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													000000000
												</td>
												<td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													Fulano123
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
export default ListaFunc;
