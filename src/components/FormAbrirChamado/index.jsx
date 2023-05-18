import { useRef, useState } from "react";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import secureLocalStorage from "react-secure-storage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function FormAbrirChamado() {
  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  const [imagem, setImagem] = useState(null);

  const [loading, setLoading] = useState(false);

  const yupSchema = yup.object().shape({
    problema: yup.string().required("Informe o problema."),
    prioridade: yup.string().required("Informe a prioridade."),
    patrimonio: yup.string().required("Informe o patrimônio."),
    setor: yup.string().required("Informe o setor."),
    descricao: yup.string().required("Informe a descrição."),
    anexo: yup.mixed().notRequired(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(yupSchema) });

  console.log(errors);

  function handleReset() {
    setImagem(null);
    reset();
  }

  // configuração do headers da api
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const handleChamado = async (dataFomulario) => {
    setLoading(true);

    if (imagem !== null) {
      try {
        let formData = new FormData();
        formData.append("prioridade", dataFomulario.prioridade);
        formData.append("patrimonio", dataFomulario.patrimonio);
        formData.append("problema", dataFomulario.problema);
        formData.append("setor", dataFomulario.setor);
        formData.append("descricao", dataFomulario.descricao);
        formData.append("anexo", imagem);
        formData.append("funcionario_id", id);

        const { data } = await api.post("/chamados/criar", formData, config);

        setLoading(false);

        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      try {
        const body = { ...dataFomulario, funcionario_id: id };
        const { data } = await api.post("/chamados/criar", body);

        setLoading(false);

        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    handleReset();
  };

  return (
    <>
      <ToastContainer />
      <h1 className="text-center text-gray-900 font-bold text-2xl sm:mt-4 dark:text-branco">
        Abrir um chamado
      </h1>

      <form encType="multipart/form" onSubmit={handleSubmit(handleChamado)}>
        <div className="mt-0 flex flex-col p-6 gap-y-5 lg:mt-12 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-2">
          <div>
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Problema *
            </label>
            <select
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-transparent"
              {...register("problema", { required: true })}
            >
              <option
                className="text-gray-900 dark:text-branco dark:bg-gray-800"
                selected
                value=""
              >
                Selecione uma opção
              </option>
              <option
                className="text-gray-900 dark:text-branco dark:bg-gray-800"
                value="Hardware"
              >
                Hardware
              </option>
              <option
                className="text-gray-900 dark:text-branco dark:bg-gray-800"
                value="Infraestrutura"
              >
                Infraestrutura
              </option>
              <option
                className="text-gray-900 dark:text-branco dark:bg-gray-800"
                value="Software"
              >
                Software
              </option>
            </select>
            {errors.problema && (
              <p className="text-red-500 pt-2 w-full">
                {errors.problema.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-lg font-medium text-gray-900  dark:text-branco">
              Prioridade *
            </label>
            <select
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-transparent"
              {...register("prioridade", { required: true })}
            >
              <option
                className="text-gray-900 dark:text-branco dark:bg-gray-800"
                selected
                value=""
              >
                Selecione uma opção
              </option>
              <option
                className="text-gray-900 dark:text-branco dark:bg-gray-800"
                value="Alta"
              >
                Alta
              </option>
              <option
                className="text-gray-900 dark:text-branco dark:bg-gray-800"
                value="Média"
              >
                Média
              </option>
              <option
                className="text-gray-900 dark:text-branco dark:bg-gray-800"
                value="Baixa"
              >
                Baixa
              </option>
            </select>
            {errors.prioridade && (
              <p className="text-red-500 pt-2 w-full">
                {errors.prioridade.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Patrimônio *
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-transparent"
              placeholder="Informe o patrimônio"
              {...register("patrimonio", { required: true })}
              type="text"
            />
            {errors.patrimonio && (
              <p className="text-red-500 pt-2 w-full">
                {errors.patrimonio.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Setor *
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-transparent"
              placeholder="Informe o setor"
              {...register("setor", { required: true })}
              type="text"
            />
            {errors.setor && (
              <p className="text-red-500 pt-2 w-full">{errors.setor.message}</p>
            )}
          </div>
          <div className="grid col-span-2">
            <div>
              <label className="text-lg font-medium text-gray-900 dark:text-branco">
                Descrição
              </label>
              <input
                className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-transparent"
                placeholder="Descreva o seu problema"
                {...register("descricao", { required: true })}
                type="text"
              />
              {errors.descricao && (
                <p className="text-red-500 pt-2 w-full">
                  {errors.descricao.message}
                </p>
              )}
            </div>
            <div className="mt-6 md:mt-1 ">
              <div className="flex flex-row">
                <label className="text-lg font-medium text-gray-900 dark:text-branco">
                  Anexo
                </label>
                <p
                  className="ml-3 mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  PNG, JPG ou JPEG.
                </p>
              </div>
              <input
                type="file"
                className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 mb-2 dark:bg-transparent"
                placeholder="Escolher arquivo"
                {...register("anexo", {
                  required: false,
                  onChange: (e) => setImagem(e.target.files[0]),
                })}
                accept=".png, .jpg, .jpeg"
              />
              {imagem !== null ? (
                <img
                  src={URL.createObjectURL(imagem)}
                  alt="Foto de anexo"
                  className="w-56 h-56"
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className=" mt-8 flex justify-center items-center flex-col">
          <button
            className={`hover:bg-cyan-600 mb-6 bg-azul-hyde py-2 px-5 rounded-md text-white font-bold text-lg flex items-center justify-center gap-3 w-80 ${
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
              <>Enviar</>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
