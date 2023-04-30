import { useEffect, useState } from "react";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import secureLocalStorage from "react-secure-storage";
import PieChart from "../../components/PieChart";
import DoughnutChart from "../DoughnutChart";

export default function PerfilFuncionario() {
  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  const [foto, setFoto] = useState();
  const [changeFoto, setChangeFoto] = useState("");
  const [dados, setDados] = useState({
    nome_funcionario: "",
    email_funcionario: "",
    usuario: "",
    matricula: "",
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

  const handleEdit = async (e) => {
    e.preventDefault();
    if (foto) {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      let formData = new FormData();
      formData.append("nome", dados.nome_funcionario);
      formData.append("usuario", dados.usuario);
      formData.append("foto", changeFoto);
      console.log(foto);
      try {
        const { data } = await api.put(
          "/funcionarios/editar/" + id,
          formData,
          config
        );
        toast.success("Dados alterados com sucesso", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast.error("Não foi possível alterar seus dados", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
      }
    }
  };

  const buscarFunc = async () => {
    const { data } = await api.get("/funcionarios?id_funcionario=" + id);
      setDados({
        nome_funcionario: data[0].nome_funcionario,
        email_funcionario: data[0].email_funcionario,
        usuario: data[0].usuario,
        matricula: data[0].matricula,
      });
      setFoto(data[0].foto);
      setChangeFoto("")
  }

  useEffect(() => {
    buscarFunc()
  }, []);

  return (
    <div className=" dark:bg-preto pb-20 pt-10">
      <div className="flex flex-col w-full h-fit lg:h-screen lg:flex-row items-center justify-center gap-y-10">
        <div className="w-full px-5 md:px-10 lg:w-8/12 h-full dark:text-branco lg:dark:border-white lg:border-r-2 lg:border-gray-900">
          <div className="text-center lg:text-start">
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
                Matricula:{" "}
                <span className="lg:text-xl font-normal text-lg">
                  {dados.matricula}
                </span>{" "}
              </p>
              <p className="dark:text-branco font-bold text-xl">
                Email:{" "}
                <span className="lg:text-xl font-normal text-lg">
                  {dados.email_funcionario}
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
          <div className="w-full flex flex-col lg:flex-row lg:grid-cols-2 p-2 gap-x-10 gap-y-4">
            <div className="flex flex-col lg:w-2/4 md:w-full sm:w-full">
              <label htmlFor="nome" className="px-2 font-semibold">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome_funcionario"
                value={dados.nome_funcionario}
                onChange={changeDados}
                className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
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
                className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2 teste"
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
            onClick={buscarFunc}
            className="p-2 w-1/2 lg:w-1/3 text-azul-hyde border border-azul-hyde hover:bg-azul-hyde hover:text-white font-medium rounded-md">
              Cancelar
            </button>
          </div>
        </div>
        <div className="lg:w-4/12 w-full p-6 h-full items-center gap-y-6 flex flex-col">
            <h1 className="font-bold text-3xl dark:text-gray-50">Dashboard</h1>
          <PieChart id={id} type={"funcionario"}/>
          <DoughnutChart id={id} type={"funcionario"}/>
        </div>
      </div>
    </div>
  );
}
