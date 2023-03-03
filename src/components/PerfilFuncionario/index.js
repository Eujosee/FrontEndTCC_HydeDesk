import React, { useEffect, useState } from "react";
import api from "../../api";

function PerfilFuncionario() {
  const id = JSON.parse(localStorage.getItem("Id"));
  const [foto, setFoto] = useState();
  const [dados, setDados] = useState({
    nome: "",
    usuario: "",
    matricula: "",
    senha: "",
  });
  const changeDados = (e) => {
    setDados({
      ...dados,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    (async () => {
      const { data } = await api.get("/funcionarios?id_funcionario=" + id);
      console.log(data);
      setDados({
        nome: data[0].nome,
        usuario: data[0].usuario,
        matricula: data[0].matricula,
        senha: data[0].senha,
      });
      setFoto(data[0].foto);
    })();
  }, [id]);
  return (
    <div className=" dark:bg-gray-900 mb-20 mt-5">
      <div className="flex flex-col w-full lg:flex-row items-center justify-center">
        <div className="w-full px-5 md:px-10 lg:w-8/12 h-full dark:text-white dark:border-white border-r-2 border-gray-900">
          <div>
            <h1 className="font-bold text-3xl">Meu perfil</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie suas informações
            </p>
          </div>
          <div className="flex lg:w-full mt-6 space-y-2 flex-wrap lg:flex-row sm:flex-col sm:mb-4">
            <div className="flex flex-col items-center w-full lg:justify-center lg:w-1/4">
              <h1 className="text-2xl dark:text-white font-semibold mb-2">
                Foto de perfil
              </h1>
              <img
                src={"https://hdteste.azurewebsites.net/" + foto}
                alt="Foto de perfil"
                className="rounded-full w-52 h-52"
              />
            </div>
            <div className="flex items-center w-full justify-center flex-col px-6 space-y-4 lg:w-3/4 lg:items-start">
              <p className="dark:text-white font-bold text-xl">
                Matricula:{" "}
                <span className="lg:text-xl font-normal text-lg">
                  {dados.matricula}
                </span>{" "}
              </p>
              <label
                htmlFor="foto"
                className="p-2 bg-azul-hyde hover:bg-cyan-600  rounded-md w-1/2 text-center cursor-pointer text-white font-medium"
              >
                Trocar foto
              </label>
              <input
                type="file"
                id="foto"
                onChange={(e) => setFoto(e.target.files[0])}
                className="hidden"
              />
            </div>
          </div>
            <div className="w-full flex flex-col lg:flex-row lg:grid-cols-2 p-2 gap-x-10 gap-y-4">
              <div className="flex flex-col lg:w-2/4 md:w-full sm:w-full">
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
              <div className="flex flex-col lg:w-2/4 sm:w-full">
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
            </div>

            <div className="flex flex-row space-x-3 mt-5">
              <button className="p-2 w-1/2 lg:w-1/3 bg-azul-hyde hover:bg-cyan-600 rounded-md text-center cursor-pointer text-white font-medium">
                Salvar mudanças
              </button>
              <button className="p-2 w-1/2 lg:w-1/3 text-azul-hyde border border-azul-hyde hover:bg-azul-hyde hover:text-white font-medium rounded-md">
                Cancelar
              </button>
            </div>
          
        </div>
        <div className="lg:w-4/12 sm:w-full  h-full"></div>
      </div>
    </div>
  );
}

export default PerfilFuncionario;
