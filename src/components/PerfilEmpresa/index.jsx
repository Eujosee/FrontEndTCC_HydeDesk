import { useEffect, useState } from "react";
import api from "../../services/api";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import secureLocalStorage from "react-secure-storage";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function PerfilEmpresa() {
  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  const [changeFoto, setChangeFoto] = useState(null);

  const [dados, setDados] = useState(null);

  const [adress, setAdress] = useState({
    rua: "",
    estado: "",
    cidade: "",
    bairro: "",
  });

  const yupSchema = yup.object().shape({
    nome_empresa: yup.string().required("Informe o nome da empresa."),
    email_empresa: yup
      .string()
      .email("E-mail inválido.")
      .required("Informe o e-mail."),
    telefone: yup.string().required("Informe o telefone."),
    cep: yup
      .string()
      .required("Informe o CEP.")
      .test("test-invalid-cep", "CEP inválido", (cep) => {
        const cepFormat = cep.replace(/[^0-9,]*/g, "");
        if (cepFormat.length === 8) {
          return true;
        } else {
          return false;
        }
      }),
    numero_endereco: yup.string().required("Informe o número de endereço."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(yupSchema),
  });

  const checkCEP = async (paramCep) => {
    console.log("paramcep", paramCep);

    setAdress({
      rua: "",
      estado: "",
      cidade: "",
      bairro: "",
    });

    const cep = paramCep.replace(/[^0-9]+/g, "");

    console.log("cep", cep);

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
      console.log(erro);
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
    setChangeFoto("");

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

  async function initialValues() {
    try {
      const { data } = await api.get("/empresas/" + id);

      setDados(data);
      return {
        nome_empresa: data.nome_empresa,
        email_empresa: data.email_empresa,
        cnpj: data.cnpj,
        telefone: data.telefone,
        cep: data.cep,
        numero_endereco: data.numero_endereco,
      };
    } catch (error) {
      return {};
    }
  }

  const handleEdit = async (data) => {
    if (changeFoto) {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      let formData = new FormData();

      formData.append("nome", data.nome_empresa);
      formData.append("cnpj", data.cnpj.replace(/[^0-9]+/g, ""));
      formData.append("email", data.email_empresa);
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
        toast.error("Não foi possível alterar seus dados", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      try {
        await api.put("/empresas/editar/" + id, {
          nome: data.nome_empresa,
          email: data.email_empresa,
          cnpj: data.cnpj,
          telefone: data.telefone,
          cep: data.cep,
          numero_endereco: data.numero_endereco,
        });
        toast.success("Dados alterados com sucesso", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast.error("Não foi possível alterar seus dados", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    reset(initialValues);
  };

  useEffect(() => {
    if (dados !== null) {
      checkCEP(dados.cep);
    }
  }, [dados]);

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
                      changeFoto !== null
                        ? URL.createObjectURL(changeFoto)
                        : "http://localhost:4001/" + dados.foto
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
                    {...register("nome_empresa", { required: true })}
                    className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                  />
                  {errors.nome_empresa && (
                    <p className="text-red-500 pt-2 w-full">
                      {errors.nome_empresa.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="telefone" className="px-2 font-semibold">
                    Telefone
                  </label>
                  <InputMask
                    type="text"
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
                    {...register("email_empresa", { required: true })}
                    className="p-2 dark:text-branco dark:bg-transparent dark:border-slate-300  outline-none border-b-2"
                  />
                  {errors.email_empresa && (
                    <p className="text-red-500 pt-2 w-full">
                      {errors.email_empresa.message}
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
                    onBlur={(e) => checkCEP(e)}
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
                  type="submit"
                  className="p-2 w-1/2 lg:w-1/3 bg-azul-hyde hover:bg-cyan-600 rounded-md text-center cursor-pointer text-white font-medium"
                >
                  Salvar mudanças
                </button>
                <ToastContainer />
                <button
                  onClick={buscarEmpresa}
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
