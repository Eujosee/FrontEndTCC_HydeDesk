import { useContext, useState, useEffect } from "react";
import api from "../../api";
import { Context } from "../../Context/AuthContext";
import Footer from "../Footer";

export default function CardPerfil(props) {
  const { handleLogout } = useContext(Context)
  const { busca } = props
  const id = JSON.parse(localStorage.getItem("Id"));
  const tipo = JSON.parse(localStorage.getItem("Tipo"));
  const [dados, setDados] = useState([]);

  useEffect(() => {
    (async () => {
      switch (tipo) {
        case "empresas":
          const { data } = await api.get("/empresas/" + id);
          setDados(data);
          console.log(data);
          break;
        case "funcionarios":
          const response = await api.get("/funcionarios/" + id);
          break;
        case "tecnicos":
          const res = await api.get("/tecnicos/" + id);
          break;
        default:
          break;
      }
    })();
  }, [tipo, id]);


  switch (tipo) {
    case "tecnicos":
      return (
        <div className="bg-white px-10 py-10 rounded-3xl dark:bg-preto">
          <div className="flex mb-10">
            <div className="w-40 h-40 flex items-center justify-center">
              <img className="rounded-full" src={"https://hdteste.azurewebsites.net/" + props.foto} alt='sua foto de perfil'></img>
            </div>
            <div className="flex flex-col px-4 justify-between">
              <h1 className="font-black dark:text-white">Meu perfil</h1>
              <div>
              <p className="font-medium text-lg mb-0">{props.nome}</p>
              <p className="font-medium text-lg mb-0">{props.email}</p>
              </div>
            </div>
          </div>
          <div className="text-black text-opacity-25 ">
            <p className="border-b-2"><strong>Matricula:</strong> {props.matricula} </p>
            <p className="border-b-2"><strong>Especialidade:</strong> {props.especialidade} </p>
            <p className="border-b-2"><strong>CPF:</strong> {props.cpf} </p>
            <p className="border-b-2"><strong>Telefone:</strong> {props.telefone} </p>
            <button
                className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-3xl text-white font-bold text-lg "
                onClick={() => {
                  handleLogout()
                  }}>Deslogar</button>
          </div>
        </div>
      );
    case "empresas":
		return (
			<div className="font-Poppins dark:bg-gray-900">
			  <div className="flex w-full h-screen items-center justify-center">
				<div className="w-8/12  h-full dark:text-white dark:border-white border-r-2 border-gray-900">
				  <div className="p-8">
					<h1 className="font-bold text-4xl">Meu perfil</h1>
					<p className="text-gray-600 dark:text-gray-400">
					  Gerencie as informações
					</p>
				  </div>
				  <div className="flex w-full mt-6 space-y-2">
					<div className="flex flex-col justify-center items-center w-1/4">
					  <h1 className="text-2xl dark:text-white font-bold mb-2">Foto de perfil</h1>
					  <img
						src={"https://hdteste.azurewebsites.net/" + dados.foto}
						alt="Foto de perfil"
						className="rounded-full w-52"
					  />
					</div>
					<div className="flex justify-center flex-col px-6 w-3/4 space-y-4">
					  <p className="dark:text-white text-2xl font-bold">CNPJ: <span className="text-lg	font-normal">{dados.cnpj}</span> </p>
					  <label
						htmlFor="foto"
						className="p-2 bg-azul-hyde rounded-xl w-60 text-center cursor-pointer"
					  >
						Trocar foto
					  </label>
					  <input type="file" id="foto" className="hidden" />
					</div>
				  </div>
					<div className="w-full grid grid-cols-2 grid-rows-3 p-2 gap-x-2 gap-y-4">
						<div className="flex flex-col">
							<label htmlFor="nome">Nome</label>
							<input type="text" id="nome" value={dados.nome} className="p-2 dark:text-black"/>
						</div>
						<div className="flex flex-col">
							<label htmlFor="telefone">Telefone</label>
							<input type="text" id="telefone" value={dados.telefone} className="p-2 dark:text-black"/>
						</div>
						<div className="flex flex-col">
							<label htmlFor="email">Email</label>
							<input type="text" id="email" value={dados.email} className="p-2 dark:text-black"/>
						</div>
					</div>
				</div>
				<div className="w-4/12  h-full"></div>
			  </div>
			</div>
		  );
    case "funcionarios":
      return (
				<div className="bg-white px-10 py-10 rounded-3xl  dark:bg-preto">
					<div className="flex flex-row">
						<div className="flex flex-col mb-10 justify-between ">
							<h1 className="font-black">Meu perfil</h1>
							<div>
								<p className="font-medium mb-0">{props.nome}</p>
								<p className="font-medium mb-0">{props.email}</p>
							</div>
						</div>
						<div className="w-40 h-40"></div>
					</div>
					<div className="text-black text-opacity-25">
						<p className="border-b-2">
							<strong>Nome:</strong> {props.nome}{" "}
						</p>
						<p className="border-b-2">
							<strong>Matrícula:</strong> {props.matricula}{" "}
						</p>
						<button
							className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-3xl text-white font-bold text-lg"
							onClick={() => {
								handleLogout();
							}}
						>
							Deslogar
						</button>
					</div>
				</div>
			);
    default:
      break;
  }
  
}

;
