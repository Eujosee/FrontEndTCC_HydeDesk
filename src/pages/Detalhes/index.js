import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./index.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams } from "react-router-dom";
import api from "../../api";
import InputMask from "react-input-mask";

export default function Detalhes() {
	const { id } = useParams();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [statusErro, setStatusErro] = useState("");
	const [user, setUser] = useState([]);

	const [adress, setAdress] = useState({
		rua: "",
		estado: "",
		cidade: "",
		bairro: "",
	});

	useEffect(() => {
		(async () => {
			try {
				const { data } = await api.get("/chamados/" + id);
				console.log(data);
				setData(data);
				checkCEP(data[0].cep);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [id]);

	async function checkCEP(cep) {
		if (!cep) {
			setAdress({
				rua: "",
				estado: "",
				cidade: "",
				bairro: "",
			});
			return;
		}

		try {
			const res = await fetch(`http://viacep.com.br/ws/${cep}/json/`);
			const json = await res.json();
			setAdress({
				rua: json.logradouro,
				estado: json.uf,
				cidade: json.localidade,
				bairro: json.bairro,
			});
		} catch (erro) {
			setStatusErro("CEP inválido!");
		}
	}

useEffect(() => {
	(async () => {
					try {
						const { data } = await api.get("/tecnicos/" + id);
						setUser({nome: data.nome, tel: data.telefone});
					} catch (error) {}			
		}
	)();
}, []);
	return (
		<>
			<Header />
			{!loading && (
				<div className="flex flex-col w-full h-1/4 p-8">
					<div className="mb-5">
						<AiOutlineArrowLeft
							size={20}
							onClick={() => (window.location.href = "/lista-chamados")}
							className="cursor-pointer"
						/>
						<h1 className="text-2xl font-bold mt-2 ml-3">
							Detalhes - 22/01/2023
						</h1>
					</div>
					<div className="flex flex-col lg:flex-row w-full space-x-10">
						<div className="flex flex-col w-full lg:w-1/2 bg-slate-100 p-6 rounded-lg">
							<h1 className="font-bold text-md">Informações do problema</h1>
							<div className="grid grid-cols-2 gap-x-5 gap-y-5">
								<div className="flex flex-col">
									<label className="font-medium text-gray-500">Problema:</label>
									<input
										type="text"
										className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
										value={data[0].problema}
										disabled
									/>
								</div>
								<div className="flex flex-col">
									<label className="font-medium">Setor:</label>
									<input
										type="text"
										className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
										value={data[0].setor}
										disabled
									/>
								</div>

								<div className="flex flex-col w-full">
									<label className="font-medium text-gray-500">
										Patrimonio:
									</label>
									<input
										type="text"
										className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
										value={data[0].patrimonio}
										disabled
									/>
								</div>
								<div className="flex flex-col w-full">
									<label className="font-medium text-gray-500">
										Prioridade:
									</label>
									<input
										type="text"
										className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
										value={data[0].prioridade}
										disabled
									/>
								</div>
								<div className="flex flex-col w-full col-span-2">
									<label className="font-medium text-gray-500">
										Descrição:
									</label>
									<textarea
										className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
										value={data[0].descricao}
										disabled
									/>
								</div>
							</div>
							{data[0].anexo && (
								<div className="flex flex-col w-full pl-8">
									<label className="font-medium text-gray-500">Anexo:</label>
									<img
										src={"https://hdteste.azurewebsites.net/" + data[0].anexo}
										className="w-full h-60"
										alt="anexo do chamado"
									/>
								</div>
							)}
							<div className="flex w-full mt-5 justify-center items-center">
								<div className="flex flex-col text-center items-center justify-center w-1/2 pl-8">
									<label className="font-medium text-gray-500">
										Código de Verificação:
									</label>
									<p className="text-lg font-bold rounded w-1/2">
										{data[0].cod_verificacao}
									</p>
								</div>
								<div className="flex flex-col justify-center items-center text-center w-1/2 pl-8">
									<label className="font-medium text-gray-500">Status:</label>
									<p
										data-type={data[0].status_chamado}
										className="first-letter:uppercase data-[type=pendente]:text-red-500 data-[type=andamento]:text-yellow-500 data-[type=concluido]:text-green-500 rounded text-center w-1/2 font-semibold"
									>
										{data[0].status_chamado}
									</p>
								</div>
							</div>
						</div>

						<div className="w-full lg:w-1/2">
							<div className="flex flex-col w-full  bg-slate-100 p-6 rounded-lg">
								<h1 className="font-bold text-md">Informações da empresa</h1>
								<div className="grid grid-cols-2 gap-x-5 gap-y-5">
									<div className="flex flex-col">
										<label className="font-medium text-gray-500">Nome:</label>
										<input
											type="text"
											className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
											value={data[0].nome_empresa}
											disabled
										/>
									</div>
									<div className="flex flex-col">
										<label className="font-medium">Telefone:</label>
										<input
											type="text"
											className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
											value={data[0].telefone}
											disabled
										/>
									</div>
									<div className="col-start-1 col-end-3">
										<h1 className="font-bold text-md">Endereço</h1>
									</div>
								</div>
								<div className="grid grid-cols-3 gap-x-5 gap-y-5">
									<div className="mt-2 col-3">
										<label className="text-lg font-medium text-gray-900">
											CEP *
										</label>
										<InputMask
											className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
											placeholder="CEP"
											name="cep"
											mask="99999-999"
											value={data[0].cep}
											disabled
										/>
									</div>
									<div className="mt-2 col-span-1">
										<label className="text-lg font-medium text-gray-900">
											Rua
										</label>
										<input
											className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
											placeholder="Rua"
											name="Rua"
											value={adress.rua}
											disabled
										/>
									</div>
									<div className="mt-2 col-span-1">
										<label className="text-lg font-medium text-gray-900">
											N°
										</label>
										<input
											className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
											placeholder="N°"
											name="numero_endereco"
											value={data[0].numero_endereco}
											disabled
										/>
									</div>
									<div className="mt-2 col-span-1">
										<label className="text-lg font-medium text-gray-900">
											Bairro
										</label>
										<input
											className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
											placeholder="Bairro"
											name="bairro"
											value={adress.bairro}
											disabled
										/>
									</div>
									<div className="mt-2 col-span-1">
										<label className="text-lg font-medium text-gray-900">
											Cidade
										</label>
										<input
											className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
											placeholder="Cidade"
											name="cidade"
											value={adress.cidade}
											disabled
										/>
									</div>
									<div className="mt-2 col-span-1">
										<label className="text-lg font-medium text-gray-900">
											UF
										</label>
										<input
											className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
											placeholder="Estado"
											name="estado"
											value={adress.estado}
											disabled
										/>
									</div>
								</div>
							</div>
							<div className="flex flex-col mt-3 w-full bg-slate-100 p-6 rounded-lg">
								<h1 className="font-bold text-md">Informações do técnico</h1>
								<div className="grid grid-cols-2 gap-x-5 gap-y-5">
									<div className="flex flex-col">
										<label className="font-medium text-gray-500">Nome:</label>
										<input
											type="text"
											className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
											value={user.nome}
											disabled
										/>
									</div>
									<div className="flex flex-col">
										<label className="font-medium text-gray-500">
											Telefone:
										</label>
										<InputMask
											className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
											placeholder="CEP"
											name="cep"
											mask="(99) 99999-9999"
											value={user.tel}
											disabled
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<Footer />
		</>
	);
}
