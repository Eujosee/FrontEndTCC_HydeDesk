import React, { useEffect, useState } from 'react';
import api from '../../api';

// import { Container } from './styles';

function PerfilTecnico() {
    const id = JSON.parse(localStorage.getItem("Id"));
    const [foto, setFoto] = useState()
    const [dados, setDados] = useState({
        nome:"",
        usuario:""
      });
      const changeDados = (e) => {
        setDados({
            ...dados,
            [e.target.name]:e.target.value
        })
      }
    useEffect(() => {
        (async () => {
            const resposta = await api.get("/tecnicos/" + id);
            setDados(resposta);
        })()
    },[id])
    return (
        <div className="font-Poppins dark:bg-gray-900 mb-20">
          <div className="flex w-full lg:flex-row items-center justify-center sm:flex-col">
            <div className="lg:w-8/12 sm:w-full h-full dark:text-white dark:border-white border-r-2 border-gray-900">
              <div className="p-8">
                <h1 className="font-bold text-4xl">Meu perfil</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Gerencie as informações
                </p>
              </div>
              <div className="flex lg:w-full mt-6 space-y-2 flex-wrap lg:flex-row sm:flex-col sm:mb-4">
                <div className="flex flex-col lg:justify-center sm:items-center lg:w-1/4 sm:w-full ">
                  <h1 className="text-2xl dark:text-white font-bold mb-2">
                    Foto de perfil
                  </h1>
                  <img
                    src={"https://hdteste.azurewebsites.net/" + foto}
                    alt="Foto de perfil"
                    className="rounded-full w-52"
                  />
                </div>
                <div className="flex justify-center flex-col px-6 lg:w-3/4 space-y-4 sm:w-full sm:items-center">
                  <p className="dark:text-white lg:text-2xl font-bold sm:text-xl">
                    CNPJ:{" "}
                    <span className="lg:text-2xl font-normal sm:text-lg">{dados.cnpj}</span>{" "}
                  </p>
                  <label
                    htmlFor="foto"
                    className="p-2 bg-azul-hyde rounded-xl w-3/4 text-center cursor-pointer text-white font-medium text-lg"
                  >
                    Trocar foto
                  </label>
                  <input type="file" id="foto" className="hidden" />
                </div>
              </div>
              <div className="w-full grid lg:grid-cols-2 grid-rows-3 p-2 gap-x-2 gap-y-4 sm:grid-cols-1 overflow-hidden">
                <div className="flex flex-col">
                  <label htmlFor="nome" className="px-2 font-semibold">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
					name="nome"
                    value={dados.nome}
					onChange={changeDados}
                    className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="usuario" className="px-2 font-semibold">
                    Usuário
                  </label>
                  <input
                    type="text"
                    id="usuario"
					name="usuario"
                    value={dados.usuario}
					onChange={changeDados}
                    className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                  />
                </div>
                <button className="p-2 w-full bg-azul-hyde rounded-xl text-center cursor-pointer text-white font-medium">
                  Salvar mudanças
                </button>
                <button className="text-azul-hyde font-medium w-full">
                  Cancelar
                </button>
              </div>
            </div>
            <div className="lg:w-4/12 sm:w-full  h-full"></div>
          </div>
        </div>
      );
}

export default PerfilTecnico;