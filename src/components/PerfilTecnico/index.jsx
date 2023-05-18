import { useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import api from "../../services/api";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import secureLocalStorage from "react-secure-storage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function PerfilTecnico() {
  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  const [changeFoto, setChangeFoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const [dados, setDados] = useState(null);

  const yupSchema = yup.object().shape({
    nome: yup.string().required("Informe o seu nome."),
    email: yup.string().email("E-mail inválido.").required("Informe o e-mail."),
    telefone: yup
      .string()
      .required("Informe seu telefone.")
      .test("test-invalid-tek", "Telefone inválido", (tel) => {
        const telefone = tel.replace(/[^0-9,]*/g, "");
        if (telefone.length === 11) {
          return true;
        } else {
          return false;
        }
      }),
    especialidade: yup.string().required("Informe sua especialidade."),
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
      const { data } = await api.get("/tecnicos/" + id);

      setDados(data);
      return {
        nome: data.nome_tecnico,
        email: data.email_tecnico,
        telefone: data.telefone,
        especialidade: data.especialidade,
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
      formData.append("email", data.email);
      formData.append("telefone", data.telefone.replace(/[^0-9]+/g, ""));
      formData.append("especialidade", data.especialidade);
      formData.append("foto", changeFoto);

      try {
        await api.put("/tecnicos/editar/" + id, formData, config);

        toast.success("Dado(s) alterado(s) com sucesso", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        setLoading(false);
        toast.error("Não foi possível alterar seus dados", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      try {
        await api.put("/tecnicos/editar/" + id, data);
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

          {dados !== null && (
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
                        : "http://localhost:8080/" + dados.foto
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
                  <label
                    htmlFor="foto"
                    className="p-2 bg-azul-hyde hover:bg-cyan-600  rounded-md w-1/2 text-center cursor-pointer text-white font-medium"
                  >
                    Trocar foto
                  </label>
                  <input
                    type="file"
                    id="foto"
                    className="hidden"
                    onChange={(e) => setChangeFoto(e.target.files[0])}
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
                    {...register("nome", { required: true })}
                    className="p-2 focus:border-azul-hyde dark:text-branco dark:bg-transparent dark:border-slate-300 dark:focus:border-azul-hyde  outline-none border-b-2"
                  />
                  {errors.nome && (
                    <p className="text-red-500 pt-2 w-full">
                      {errors.nome.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col relative">
                  <label htmlFor="cpf" className="px-2 font-semibold">
                    CPF
                  </label>
                  <InputMask
                    type="text"
                    id="cpf"
                    mask="999.999.999-99"
                    value={dados.cpf}
                    className="p-2  dark:text-branco dark:bg-transparent dark:border-slate-300 dark:hover:border-azul-hyde  outline-none border-b-2"
                    disabled
                  />
                  <LockClosedIcon className="h-4 w-4 text-gray-400 absolute top-9 right-3" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="px-2 font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="p-2 focus:border-azul-hyde dark:text-branco dark:bg-transparent dark:border-slate-300  dark:focus:border-azul-hyde outline-none border-b-2"
                  />
                  {errors.email && (
                    <p className="text-red-500 pt-2 w-full">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="especialidade" className="px-2 font-semibold">
                    Especialidade
                  </label>
                  <select
                    id="especialidade"
                    className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent"
                    {...register("especialidade", { required: true })}
                  >
                    <option
                      value=""
                      className="dark:text-branco dark:bg-gray-900"
                    >
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
                  {errors.especialidade && (
                    <p className="text-red-500 pt-2 w-full">
                      {errors.especialidade.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="telefone" className="px-2 font-semibold">
                    Telefone
                  </label>
                  <Controller
                    control={control}
                    name="telefone"
                    render={({ field: { onChange, value } }) => (
                      <InputMask
                        type="tel"
                        id="telefone"
                        mask="(99) 99999-9999"
                        onChange={onChange}
                        value={value}
                        className="p-2 focus:border-azul-hyde dark:text-branco dark:bg-transparent dark:border-slate-300 dark:focus:border-azul-hyde outline-none border-b-2"
                      />
                    )}
                  />

                  {errors.telefone && (
                    <p className="text-red-500 pt-2 w-full">
                      {errors.telefone.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col relative">
                  <label htmlFor="matricula" className="px-2 font-semibold">
                    Matricula
                  </label>
                  <input
                    type="text"
                    id="matricula"
                    value={dados.matricula}
                    className="p-2  hover:border-azul-hyde dark:text-branco dark:bg-transparent dark:border-slate-300 dark:hover:border-azul-hyde  outline-none border-b-2"
                    disabled
                  />
                  <LockClosedIcon className="h-4 w-4 text-gray-400 absolute top-9 right-3" />
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
          )}
        </div>
        <div className="lg:w-4/12 sm:w-full  h-full"></div>
      </div>
    </div>
  );
}
