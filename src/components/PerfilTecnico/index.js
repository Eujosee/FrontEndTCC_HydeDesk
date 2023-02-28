import React, { useEffect, useState } from "react";
import api from "../../api";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PerfilTecnico() {
  const id = JSON.parse(localStorage.getItem("Id"));
  const [foto, setFoto] = useState("");
  const [changeFoto, setChangeFoto] = useState("");
  const [dados, setDados] = useState({
    nome: "",
    cpf: "",
    email: "",
    especialidade: "",
    telefone: "",
    senha: "",
  });
  console.log(changeFoto)
  const changeDados = (e) => {
    setDados({
      ...dados,
      [e.target.name]: e.target.value,
    });
  };
  const changeImage = (e) => {
    setFoto(e.target.files[0])
    setChangeFoto(e.target.files[0])
  }
  const buscarTecnico = async () => {
    const { data } = await api.get("/tecnicos/" + id);
      setDados(data);
      setFoto(data.foto);
  }
  const handleEdit = async (e) => {
    e.preventDefault();
    if(foto){
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      let formData = new FormData();
      formData.append("nome", dados.nome);
      formData.append("cpf", dados.cpf.replace(/[^0-9]+/g, ""));
      formData.append("email", dados.email);
      formData.append("telefone", dados.telefone.replace(/[^0-9]+/g, ""));
      formData.append("especialidade", dados.especialidade);
      formData.append("foto", changeFoto);
      formData.append("senha", dados.senha);
      formData.append("confirmsenha", dados.confirmsenha);

      try {
        const { data } = await api.put("/tecnicos/editar/" + id, formData, config)
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT
      });
      setChangeFoto("")
      buscarTecnico()
      } catch (error) {
        toast.error("Não foi possível alterar seus dados", {
          position: toast.POSITION.TOP_RIGHT
      });
      }
    }else{
      try {
        const { data } = await api.put("/tecnicos/editar/" + id, dados)
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT
      });
      buscarTecnico()
      } catch (error) {
        toast.error("Não foi possível alterar seus dados", {
          position: toast.POSITION.TOP_RIGHT
      });
      }
    }
  }
  useEffect(() => {
    buscarTecnico()
  }, []);
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
                src={changeFoto ? URL.createObjectURL(foto) : "https://hdteste.azurewebsites.net/" + foto}
                alt="Foto de perfil"
                className="rounded-full w-52"
              />
            </div>
            <div className="flex justify-center flex-col px-6 lg:w-3/4 space-y-4 sm:w-full sm:items-center">
              <p className="dark:text-white lg:text-2xl font-bold sm:text-xl">
                Matricula:{" "}
                <span className="lg:text-2xl font-normal sm:text-lg">
                  {dados.matricula}
                </span>{" "}
              </p>
              <label
                htmlFor="foto"
                className="p-2 bg-azul-hyde rounded-xl w-3/4 text-center cursor-pointer text-white font-medium text-lg"
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
                className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="px-2 font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={dados.email}
                onChange={changeDados}
                className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
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
              <option selected className="dark:text-white dark:bg-gray-900">Selecione uma opção</option>
              <option value="Desenvolvedor" className="dark:text-white dark:bg-gray-900">Desenvolvedor</option>
              <option value="Infraestrutura" className="dark:text-white dark:bg-gray-900">Infraestrutura</option>
              <option value="Sistemas operacionais" className="dark:text-white dark:bg-gray-900">
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
                mask="(+99) 99 99999-9999"
                value={dados.telefone}
                onChange={changeDados}
                className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="telefone" className="px-2 font-semibold">
                Matricula
              </label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={dados.matricula}
                onChange={changeDados}
                className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="senha" className="px-2 font-semibold">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                value={dados.senha}
                onChange={changeDados}
                className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirmsenha" className="px-2 font-semibold">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmsenha"
                value={dados.senha}
                className="p-2 dark:text-white dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                disabled
              />
            </div>
            
            <button className="p-2 w-full bg-azul-hyde rounded-xl text-center cursor-pointer text-white font-medium" onClick={handleEdit}>
              Salvar mudanças
            </button>
            <button className="text-azul-hyde font-medium w-full">
              Cancelar
            </button>
          </div>
        </div>
        <div className="lg:w-4/12 sm:w-full  h-full"></div>
      </div>
      <ToastContainer/> 
    </div>
  );
}

export default PerfilTecnico;
