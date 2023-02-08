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
        <div className="bg-white px-10 py-10 rounded">
          <div>
          <img src={"http://localhost:8080/" + props.foto} alt='sua foto de perfil'></img>
            <h1 className="font-bold">Meu perfil</h1>
            <p className="font-medium text-lg">{props.nome}</p>
            <p className="font-medium text-lg">{props.email}</p>
          </div>
          <div>
            <p><strong>Matricula:</strong> {props.matricula} </p>
            <p><strong>Especialidade:</strong> {props.especialidade} </p>
            <p><strong>CPF:</strong> {props.cpf} </p>
            <p><strong>Telefone:</strong> {props.telefone} </p>
            <button
                className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-3xl text-white font-bold text-lg"
                onClick={() => {
                  handleLogout()
                  }}>sair</button>
          </div>
        </div>
      );
    case "empresas":
      return (
        <div className="bg-white px-10 py-10 rounded">
          <div>
            <h1 className="font-bold">Meu perfil</h1>
            <p className="font-medium text-lg">{props.nome}</p>
            <p className="font-medium text-lg">{props.email}</p>
          </div>
          <div>
            <p><strong>Endereço:</strong> {props.numero_endereco} </p>
            <p><strong>CEP:</strong> {props.cep} </p>
            <p><strong>CNPJ:</strong> {props.cnpj} </p>
            <p><strong>Telefone:</strong> {props.telefone} </p>
            <button
                className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-3xl text-white font-bold text-lg"
                onClick={() => {
                  handleLogout()
                  }}>sair</button>
          </div>
        </div>
      );
    case "funcionarios":
      return (
        <div className="bg-white px-10 py-10 rounded">
          <div>
            <h1 className="font-bold">Meu perfil</h1>
            <p className="font-medium text-lg">{props.nome}</p>
            <p className="font-medium text-lg">{props.email}</p>
          </div>
          <div>
            <p><strong>Nome:</strong> {props.nome} </p>
            <p><strong>Matrícula:</strong> {props.matricula} </p>
            <button
                className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-3xl text-white font-bold text-lg"
                onClick={() => {
                  handleLogout()
                  }}>sair</button>
          </div>
        </div>
      );
    default:
      break;
  }
  
}

;
