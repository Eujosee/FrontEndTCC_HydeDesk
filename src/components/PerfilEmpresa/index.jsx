import { useEffect, useState } from "react";
import api from "../../services/api";
import axios from "axios";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import secureLocalStorage from "react-secure-storage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function PerfilEmpresa() {
  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  const [changeFoto, setChangeFoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const [dados, setDados] = useState(null);

  const [adress, setAdress] = useState({
    rua: "",
    estado: "",
    cidade: "",
    bairro: "",
  });

  const yupSchema = yup.object().shape({
    nome: yup.string().required("Informe o nome da empresa."),
    email: yup.string().email("E-mail inválido.").required("Informe o e-mail."),
    telefone: yup
      .string()
      .required("Informe seu telefone.")
      .test("test-invalid-tek", "Telefone inválido", (tel) => {
        const telefone = tel.replace(/[^0-9,]*/g, "");
        if (telefone.length === 10) {
          return true;
        } else {
          return false;
        }
      }),
    cep: yup
      .string()
      .required("Informe o CEP.")
      .test("test-invalid-cep", "CEP inválido", (cep) => validateCep(cep)),
    numero_endereco: yup.string().required("Informe o número de endereço."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(yupSchema),
  });

  async function initialValues() {
    try {
      const { data } = await api.get("/empresas/" + id);

      setDados(data);
      return {
        nome: data.nome_empresa,
        email: data.email_empresa,
        telefone: data.telefone,
        cep: data.cep,
        numero_endereco: data.numero_endereco,
      };
    } catch (error) {
      return {};
    }
  }

  async function validateCep(cep) {
    const cepEmpresa = cep.replace(/[^0-9]+/g, "");

    if (cepEmpresa.length !== 8) {
      setAdress({
        rua: "",
        estado: "",
        cidade: "",
        bairro: "",
      });

      return false;
    }

    try {
      const response = await axios.get(
        `http://viacep.com.br/ws/${cepEmpresa}/json/`
      );

      if (response.data.erro) {
        setAdress({
          rua: "",
          estado: "",
          cidade: "",
          bairro: "",
        });
        return false;
      }

      setAdress({
        rua: response.data.logradouro,
        estado: response.data.uf,
        cidade: response.data.localidade,
        bairro: response.data.bairro,
      });

      return true;
    } catch (erro) {
      return false;
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
      formData.append("cep", data.cep.replace(/[^0-9]+/g, ""));
      formData.append("numero_endereco", data.numero_endereco);
      formData.append("foto", changeFoto);

      try {
        await api.put("/empresas/editar/" + id, formData, config);

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
        await api.put("/empresas/editar/" + id, data);
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

  useEffect(() => {
    if (dados !== null) {
      validateCep(dados.cep);
    }
  }, [dados, register]);

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
            <form encType="multipart/form" onSubmit={handleSubmit(handleEdit)}>
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
                    id="foto"
                    type="file"
                    onChange={(e) => setChangeFoto(e.target.files[0])}
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
                    {...register("nome", { required: true })}
                    className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                  />
                  {errors.nome && (
                    <p className="text-red-500 pt-2 w-full">
                      {errors.nome.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="telefone" className="px-2 font-semibold">
                    Telefone
                  </label>
                  <InputMask
                    type="tel"
                    id="telefone"
                    mask="(99) 9999-9999"
                    {...register("telefone", { required: true })}
                    className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                  />
                  {errors.telefone && (
                    <p className="text-red-500 pt-2 w-full">
                      {errors.telefone.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="px-2 font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                  />
                  {errors.email && (
                    <p className="text-red-500 pt-2 w-full">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="cep" className="px-2 font-semibold">
                    CEP
                  </label>
                  <InputMask
                    type="text"
                    id="cep"
                    {...register("cep", {
                      required: true,
                    })}
                    mask="99999-999"
                    className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                  />
                  {errors.cep && (
                    <p className="text-red-500 pt-2 w-full">
                      {errors.cep.message}
                    </p>
                  )}
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
                    {...register("numero_endereco", { required: true })}
                    className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                  />
                  {errors.numero_endereco && (
                    <p className="text-red-500 pt-2 w-full">
                      {errors.numero_endereco.message}
                    </p>
                  )}
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
