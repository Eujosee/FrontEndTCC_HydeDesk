import React, { useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import api from "../../api";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import secureLocalStorage from "react-secure-storage";

function PerfilTecnico() {
  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  const [foto, setFoto] = useState("");
  const [changeFoto, setChangeFoto] = useState("");
  const [dados, setDados] = useState({
    nome_tecnico: "",
    cpf: "",
    email_tecnico: "",
    especialidade: "",
    telefone: "",
    senha: "",
  });
  
  const changeDados = (e) => {
    setDados({
      ...dados,
      [e.target.name]: e.target.value,
    });
  };
  const changeImage = (e) => {
    setFoto(e.target.files[0]);
    setChangeFoto(e.target.files[0]);
  };
  const buscarTecnico = async () => {
    const { data } = await api.get("/tecnicos/" + id);
    setDados(data);
    setFoto(data.foto);
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    if (foto) {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      let formData = new FormData();
      formData.append("nome", dados.nome_tecnico);
      formData.append("cpf", dados.cpf.replace(/[^0-9]+/g, ""));
      formData.append("email", dados.email_tecnico);
      formData.append("telefone", dados.telefone.replace(/[^0-9]+/g, ""));
      formData.append("especialidade", dados.especialidade);
      formData.append("foto", changeFoto);
      formData.append("senha", dados.senha);
      formData.append("confirmsenha", dados.confirmsenha);

      try {
        const { data } = await api.put(
          
          "/tecnicos/editar/" + id,
          formData,
          config
          
        );
        
        toast.success("Dados alterados com sucesso", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setChangeFoto("");
        buscarTecnico();
      } catch (error) {
        toast.error("Não foi possível alterar seus dados", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      try {
        const { data } = await api.put("/tecnicos/editar/" + id, dados);
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        buscarTecnico();
      } catch (error) {
        toast.error("Não foi possível alterar seus dados", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  useEffect(() => {
    buscarTecnico();
  }, []);
  return (
    <div className="dark:bg-preto pb-20 pt-10">
      <div className="flex flex-col w-full lg:flex-row items-center justify-center">
        <div className="w-full px-5 md:px-10 lg:w-8/12 h-full dark:text-branco dark:border-white border-r-2 border-gray-900">
          <div>
            <h1 className="font-bold text-3xl">Meu perfil</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie suas informações
            </p>
          </div>
          <div className="flex lg:w-full mt-6 space-y-2 flex-wrap lg:flex-row sm:flex-col sm:mb-4">
            <div className="flex flex-col items-center w-full lg:justify-center lg:w-1/4">
              <h1 className="text-2xl dark:text-branco font-semibold mb-2">
                Foto de perfil
              </h1>
              <img
                src={
                  changeFoto
                    ? URL.createObjectURL(foto)
                    : "https://hdteste-teste.azurewebsites.net/" + foto
                }
                alt="Foto de perfil"
                className="rounded-full w-52 h-52"
              />
            </div>
            <div className="flex items-center w-full justify-center flex-col px-6 space-y-4 lg:w-3/4 lg:items-start">
              <p className="dark:text-branco font-bold text-xl">
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
                onChange={changeImage}
                className="hidden"
              />
            </div>
          </div>

          <div className="w-full grid lg:grid-cols-2 grid-rows-3 p-2 gap-x-10 gap-y-4 sm:grid-cols-1 overflow-hidden">
            <div className="flex flex-col">
              <label htmlFor="nome" className="px-2 font-semibold">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome_tecnico"
                value={dados.nome_tecnico}
                onChange={changeDados}
                className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
              />
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="cpf" className="px-2 font-semibold">
                CPF
              </label>
              <InputMask
                type="text"
                id="cpf"
                name="cpf"
                mask="999.999.999-99"
                value={dados.cpf}
                onChange={changeDados}
                className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                disabled
              />
              <LockClosedIcon className="h-4 w-4 text-gray-400 absolute top-9 right-3"/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="px-2 font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email_tecnico"
                value={dados.email_tecnico}
                onChange={changeDados}
                className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="especialidade" className="px-2 font-semibold">
                Especialidade
              </label>
              <select
                className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent"
                name="especialidade"
                value={dados.especialidade}
                onChange={changeDados}
                required
              >
                <option selected className="dark:text-branco dark:bg-gray-900">
                  Selecione uma opção
                </option>
                <option
                  value="Desenvolvedor"
                  className="dark:text-branco dark:bg-gray-900"
                >
                  Desenvolvedor
                </option>
                <option
                  value="Infraestrutura"
                  className="dark:text-branco dark:bg-gray-900"
                >
                  Infraestrutura
                </option>
                <option
                  value="Sistemas operacionais"
                  className="dark:text-branco dark:bg-gray-900"
                >
                  Sistemas operacionais
                </option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="telefone" className="px-2 font-semibold">
                Telefone
              </label>
              <InputMask
                type="text"
                id="telefone"
                name="telefone"
                mask="(99) 99999-9999"
                value={dados.telefone}
                onChange={changeDados}
                className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
              />
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="telefone" className="px-2 font-semibold">
                Matricula
              </label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={dados.matricula}
                onChange={changeDados}
                className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                disabled
              />
              <LockClosedIcon className="h-4 w-4 text-gray-400 absolute top-9 right-3"/>
            </div>
          </div>
          <div className="flex flex-row space-x-3 mt-5">
            <button
              className="p-2 w-1/2 lg:w-1/3 bg-azul-hyde hover:bg-cyan-600 rounded-md text-center cursor-pointer text-white font-medium"
              onClick={handleEdit}
            >
              Salvar mudanças
            </button>
            <ToastContainer />
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

export default PerfilTecnico;
