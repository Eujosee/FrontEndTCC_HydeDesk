import { useState } from "react";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import secureLocalStorage from "react-secure-storage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../Loading";

export default function PerfilFuncionario() {
  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  const [changeFoto, setChangeFoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const [dados, setDados] = useState(null);

  const yupSchema = yup.object().shape({
    nome: yup.string().required("Informe o nome."),
    usuario: yup.string().required("Informe o usuário."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(yupSchema),
  });

  async function initialValues() {
    try {
      const { data } = await api.get("/funcionarios?id_funcionario=" + id);

      setDados(data[0]);
      return {
        nome: data[0].nome_funcionario,
        usuario: data[0].usuario,
      };
    } catch (error) {
      return {};
    }
  }

  const handleEdit = async (data) => {
    setLoading(true);

    if (changeFoto) {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      let formData = new FormData();

      formData.append("nome", data.nome);
      formData.append("usuario", data.usuario);
      formData.append("foto", changeFoto);

      try {
        await api.put("/funcionarios/editar/" + id, formData, config);
        toast.success("Dado(s) alterado(s) com sucesso", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        setLoading(false);
        toast.error("Não foi possível alterar seus dados", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
      }
    } else {
      try {
        await api.put("/funcionarios/editar/" + id, data);
        toast.success("Dado(s) alterado(s) com sucesso", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        setLoading(false);
        toast.error("Não foi possível alterar seus dados", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    setLoading(false);
    document.location.reload();
  };

  console.log(changeFoto);

  return (
    <div className=" dark:bg-preto pb-20 pt-10">
      {dados !== null ? (
      <div className="flex flex-col w-full lg:flex-row items-center justify-center">
        <div className="w-full px-5 md:px-10 lg:w-8/12 h-full dark:text-branco">
          <div className="text-center lg:text-start">
            <h1 className="font-bold text-3xl">Meu perfil</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie suas informações
            </p>
          </div>

          
            <form onSubmit={handleSubmit(handleEdit)}>
              <div className="flex lg:w-full mt-6 space-y-2 flex-wrap lg:flex-row sm:flex-col sm:mb-4">
                <div className="flex flex-col items-center w-full lg:justify-center lg:w-1/4">
                  <h1 className="text-2xl dark:text-branco font-semibold mb-2">
                    Foto de perfil
                  </h1>
                  <img
                    src={
                      changeFoto
                        ? URL.createObjectURL(changeFoto)
                        : "https://rei0mqdqxi.execute-api.us-east-1.amazonaws.com/" + dados.foto
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
                    onChange={(e) => setChangeFoto(e.target.files[0])}
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
                    {...register("nome", { required: true })}
                    className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                  />
                  {errors.nome && (
                    <p className="text-red-500 pt-2 w-full">
                      {errors.nome.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col lg:w-2/4 sm:w-full">
                  <label htmlFor="usuario" className="px-2 font-semibold">
                    Usuário
                  </label>
                  <input
                    type="text"
                    id="usuario"
                    {...register("usuario", { required: true })}
                    className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2 teste"
                  />
                  {errors.usuario && (
                    <p className="text-red-500 pt-2 w-full">
                      {errors.usuario.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-row space-x-3 mt-5">
                <button
                  className={`p-2 w-1/2 lg:w-1/3 bg-azul-hyde hover:bg-cyan-600 rounded-md text-center cursor-pointer text-white font-medium flex items-center justify-center gap-3 ${
                    loading ? "bg-cyan-600" : ""
                  }`}
                  disabled={loading}
                  type="submit"
                >
                  {loading ? (
                    <>
                      <AiOutlineLoading3Quarters
                        size={28}
                        className="icon dark:text-gray-50"
                      />
                      Processando...
                    </>
                  ) : (
                    <>Salvar mudanças</>
                  )}
                </button>
                <ToastContainer />
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => (document.location.href = "/")}
                  className="p-2 w-1/2 lg:w-1/3 text-azul-hyde border border-azul-hyde hover:bg-azul-hyde hover:text-white font-medium rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </form>
        </div>
      </div>
      ) :
      <Loading/>
      }
    </div>
  );
}
