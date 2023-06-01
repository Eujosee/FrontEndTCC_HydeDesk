import { useState, useEffect } from "react";

export default function DashboardFuncionario({ chamados, funcionarios }) {
	const [dataFuncionario, setDataFuncionario] = useState(null);

	function handleData() {
		const dataLocal = [];

		funcionarios.forEach((funcionario) => {
			dataLocal.push({
				id_funcionario: funcionario.id_funcionario,
				nome: funcionario.nome_funcionario,
				foto: funcionario.foto,
				matricula: funcionario.matricula,
				total_chamado: 0,
			});
		});

		chamados.forEach((chamados) => {
			dataLocal.forEach((item) => {
				if (chamados.funcionario_id === item.id_funcionario) {
					item.total_chamado += 1;
				}
			});
		});

		setDataFuncionario(dataLocal);
	}

	useEffect(() => {
		handleData();
	}, []);

	return (
		<div className="w-full h-full p-6 mx-5 overflow-auto">
			<table className="w-full h-full">
				<thead align="start">
					<tr>
						<th
							scope="col"
							className="lg:px-2 px-6 py-2 text-start dark:text-white"
						>
							Nome completo
						</th>
						<th
							scope="col"
							className="lg:px-2 px-6 py-2 text-start dark:text-white"
						>
							Matrícula
						</th>
						<th
							scope="col"
							className="lg:px-2 px-6 py-2 text-start dark:text-white"
						>
							Total chamados
						</th>
					</tr>
				</thead>
				<tbody>
					{dataFuncionario ? (
						dataFuncionario.map((data) => {
							return (
								<tr key={data.id_funcionario} align="start">
									<td className="lg:px-2 px-6 min-w-[10rem]  items-center">
										<div className="flex flex-row items-center">
											<img
												src={`https://hjb33fpoxg.execute-api.us-east-1.amazonaws.com/${data.foto}`}
												className="w-16 h-16 mr-4 object-cover rounded-full"
											/>
											<p className="font-semibold dark:text-white">
												{data.nome}
											</p>
										</div>
									</td>
									<td className="lg:px-2 px-6 ">
										<p className="font-semibold dark:text-white">
											{data.matricula}
										</p>
									</td>
									<td className="lg:px-2 px-6 ">
										<p className="font-semibold dark:text-white">
											{data.total_chamado}
										</p>
									</td>
								</tr>
							);
						})
					) : (
						<tr>
							<td colSpan={3}>
								<span className="dark:text-gray-50 font-bold text-xl w-full">
									Não há dados disponíveis
								</span>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
