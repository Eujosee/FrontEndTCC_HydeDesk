import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../../Context/AuthContext";

export default function CardPerfil(props) {
  const { handleLogout } = useContext(Context)
  const { busca } = props
  console.log(busca)


  switch (busca) {
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
				<div className="bg-white px-10 py-10 rounded-3xl dark:bg-preto">
					<div className="flex flex-row">
						<div className="flex flex-col mb-10 justify-between">
							<h1 className="font-black dark:text-white">Meu perfil</h1>
							<div>
								<p className="font-medium mb-0 dark:text-white ">
									{props.nome}
								</p>
								<p className="font-medium text-rg mb-0 dark:text-white">
									{props.email}
								</p>
							</div>
						</div>
						<div className="w-40 h-40"> </div>
					</div>
					<div className="text-black text-opacity-25 ">
						<p className="border-b-2 dark:text-white">
							<strong>Endereço:</strong> {props.numero_endereco}{" "}
						</p>
						<p className="border-b-2 dark:text-white">
							<strong>CEP:</strong> {props.cep}{" "}
						</p>
						<p className="border-b-2 dark:text-white">
							<strong>CNPJ:</strong> {props.cnpj}{" "}
						</p>
						<p className="border-b-2 dark:text-white">
							<strong>Telefone:</strong> {props.telefone}{" "}
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
