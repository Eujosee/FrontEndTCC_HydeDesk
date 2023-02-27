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
      setFoto(data.foto);
    })();
  }, [id]);
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
            <div className="px-4 flex flex-col lg:justify-center sm:items-center lg:w-1/4 sm:w-full ">
              <h1 className="text-2xl dark:text-white font-bold mb-2">
                Foto de perfil
              </h1>
              <p className="text-sm w-full text-center">
                Funcionarios não possuem foto de perfil
              </p>
            </div>
            <div className="flex justify-center flex-col px-6 lg:w-3/4 space-y-4 sm:w-full sm:items-center">
              <p className="dark:text-white lg:text-2xl font-bold sm:text-xl">
                Matricula:{" "}
                <span className="lg:text-2xl font-normal sm:text-lg">
                  {dados.matricula}
                </span>{" "}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col overflow-hidden mt-14">
            <div className="px-2 flex lg:flex-row sm:flex-col gap-2">
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
            <div className="flex mt-6 px-2 gap-2">
              <button className="p-2 w-full bg-azul-hyde rounded-xl text-center cursor-pointer text-white font-medium">
                Salvar mudanças
              </button>
              <button className="text-azul-hyde font-medium w-full">
                Cancelar
              </button>
            </div>
          </div>
        </div>
        <div className="lg:w-4/12 sm:w-full  h-full"></div>
      </div>
    </div>
  );
}

export default PerfilFuncionario;
