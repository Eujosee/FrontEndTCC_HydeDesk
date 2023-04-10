import { useEffect, useState } from "react";
import api from "../../services/api";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import secureLocalStorage from "react-secure-storage";

export default function PerfilEmpresa() {
  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  const [foto, setFoto] = useState("");
  const [changeFoto, setChangeFoto] = useState("");
  const [dados, setDados] = useState({
    cep: "",
    cnpj: "",
    email: "",
    nome: "",
    numero_endereco: "",
    telefone: "",
    senha: "",
  });

  const [adress, setAdress] = useState({
    rua: "",
    estado: "",
    cidade: "",
    bairro: "",
  });

  const changeImage = (e) => {
    setFoto(e.target.files[0]);
    setChangeFoto(e.target.files[0]);
  };

  const changeDados = (e) => {
    setDados({
      ...dados,
      [e.target.name]: e.target.value,
    });
  };

  const checkCEP = async (e) => {
    if (!e.target.value) {
      setAdress({
        rua: "",
        estado: "",
        cidade: "",
        bairro: "",
      });
      return;
    }
    const cep = e.target.value.replace(/[^0-9]+/g, "");
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
      console.log(cep);
    }
  };

  const buscarEmpresa = async () => {
    const { data } = await api.get("/empresas/" + id);
    console.log(data);
    setDados({
      cep: data.cep,
      cnpj: data.cnpj,
      email: data.email_empresa,
      nome: data.nome_empresa,
      numero_endereco: data.numero_endereco,
      telefone: data.telefone,
      senha: data.senha,
    });
    setFoto(data.foto);
    setChangeFoto("")
    try {
      const res = await fetch(`http://viacep.com.br/ws/${data.cep}/json/`);
      const json = await res.json();
      setAdress({
        rua: json.logradouro,
        estado: json.uf,
        cidade: json.localidade,
        bairro: json.bairro,
      });
    } catch (erro) {
      console.log(erro);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (changeFoto) {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      let formData = new FormData();
      formData.append("nome", dados.nome);
      formData.append("cnpj", dados.cnpj.replace(/[^0-9]+/g, ""));
      formData.append("email", dados.email);
      formData.append("telefone", dados.telefone);
      formData.append("cep", dados.cep.replace(/[^0-9]+/g, ""));
      formData.append("numero_endereco", dados.numero_endereco);
      formData.append("foto", changeFoto);

      try {
        const { data } = await api.put(
          "/empresas/editar/" + id,
          formData,
          config
        );
        toast.success("Dado(s) alterado(s) com sucesso", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setChangeFoto("");
        buscarEmpresa();
      } catch (error) {
        toast.error("Não foi possível alterar seus dados", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      try {
        const { data } = await api.put("/empresas/editar/" + id, dados);
        toast.success("Dados alterados com sucesso", {
          position: toast.POSITION.TOP_RIGHT,
        });
        buscarEmpresa();
      } catch (error) {
        toast.error("Não foi possível alterar seus dados", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  useEffect(() => {
    buscarEmpresa();
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
                    : "https://hydedesk-api.azurewebsites.net/" + foto
                }
                alt="Foto de perfil"
                className="rounded-full w-52 h-52 object-cover"
              />
            </div>
            <div className="flex items-center w-full justify-center flex-col px-6 space-y-4 lg:w-3/4 lg:items-start">
              <p className="dark:text-branco font-bold text-xl">
                CNPJ:{" "}
                <span className="text-gray-500 lg:text-xl font-normal text-lg">
                  {dados.cnpj}
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
                name="nome"
                value={dados.nome}
                onChange={changeDados}
                className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
              />
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
                className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="cep" className="px-2 font-semibold">
                CEP
              </label>
              <InputMask
                type="text"
                id="cep"
                name="cep"
                value={dados.cep}
                onChange={changeDados}
                onBlur={checkCEP}
                mask="99999-999"
                className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rua" className="px-2 font-semibold">
                Rua
              </label>
              <input
                type="text"
                id="rua"
                value={adress.rua}
                className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="numero" className="px-2 font-semibold">
                Número
              </label>
              <input
                type="text"
                id="numero"
                name="numero_endereco"
                value={dados.numero_endereco}
                onChange={changeDados}
                className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="estado" className="px-2 font-semibold">
                Estado
              </label>
              <input
                type="text"
                id="estado"
                value={adress.estado}
                className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rua" className="px-2 font-semibold">
                Bairro
              </label>
              <input
                type="text"
                id="rua"
                value={adress.bairro}
                className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                disabled
              />
            </div>
          </div>
          <div className="flex flex-row space-x-3 mt-5">
            <button
              onClick={handleEdit}
              className="p-2 w-1/2 lg:w-1/3 bg-azul-hyde hover:bg-cyan-600 rounded-md text-center cursor-pointer text-white font-medium"
            >
              Salvar mudanças
            </button>
            <ToastContainer />
            <button 
            onClick={buscarEmpresa()}
            className="p-2 w-1/2 lg:w-1/3 text-azul-hyde border border-azul-hyde hover:bg-azul-hyde hover:text-white font-medium rounded-md">
              Cancelar
            </button>
          </div>
        </div>
        <div className="lg:w-4/12 sm:w-full  h-full"></div>
      </div>
    </div>
  );
}
