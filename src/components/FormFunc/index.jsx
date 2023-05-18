import api from "../../services/api";
import { useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { AiFillCamera, AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import secureLocalStorage from "react-secure-storage";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function FormFunc() {
  const [status, setStatus] = useState("");
  const [statusErro, setStatusErro] = useState("");
  const [imagem, setImagem] = useState(null);
  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  
  const [loading, setLoading] = useState(false);

  const yupSchema = yup.object().shape({
    nome: yup.string().required("Informe o nome do funcionário."),
    matricula: yup.string().required("Informe a matrícula do funcionário."),
    usuario: yup.string().required("Informe o usuário do funcionário."),
    email: yup
      .string()
      .required("Informe o e-mail do funcionário.")
      .email("E-mail inválido."),
    senha: yup
      .string()
      .required("Informe sua senha")
      .min(8, "A senha precisa conter no mínimo 8 caracteres.")
      .matches(/[a-z]/, "Senha precisa conter letras minusculas.")
      .matches(/[A-Z]/, "Senha precisa conter letras maísculas.")
      .matches(/[0-9]/, "Senha precisa conter números.")
      .matches(
        /[}{,.^?~=+\-_\/*\-+.\|@]/,
        "Senha precisa conter caracteres especiais."
      ),
    confirmsenha: yup
      .string()
      .required("Confirme a senha.")
      .oneOf([yup.ref("senha"), null], "As senhas não são iguais."),
    anexo: yup
      .mixed()
      .required("Foto obrigatória")
      .test("is-valid-type", "Foto obrigatória", (value) => {
        if (value[0]) {
          return isValidFileType(
            value[0] && value[0].name.toLowerCase(),
            "image"
          );
        } else {
          return false;
        }
      }),
  });

  const validFileExtensions = {
    image: ["jpg", "gif", "png", "jpeg"],
  };

  function isValidFileType(fileName, fileType) {
    return (
      fileName &&
      validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(yupSchema) });
  
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  function handleReset() {
    setImagem(null);
    reset();
  }

  const handleCad = async (dataFomulario) => {
    setLoading(true);

    try {
      let formData = new FormData();
      formData.append("nome", dataFomulario.nome);
      formData.append("matricula", dataFomulario.matricula);
      formData.append("usuario", dataFomulario.usuario);
      formData.append("email", dataFomulario.email);
      formData.append("senha", dataFomulario.senha);
      formData.append("confirmsenha", dataFomulario.confirmsenha);
      formData.append("foto", imagem);
      formData.append("id_empresa", id);

      const { data } = await api.post(
        "/funcionarios/cadastro",
        formData,
        config
      );

      setLoading(false);
      toast.success("Funcionário cadastrado com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setStatus(data.message);
      handleReset();
    } catch (error) {
      setLoading(false);
      setStatusErro(error.response.data.message);
    }
  };

  return (
    <div className="bg-white dark:bg-preto px-10 py-4 ">
      <h1 className="font-bold text-2xl mt-4">Cadastre um funcionário</h1>
      <form encType="multipart/form" onSubmit={handleSubmit(handleCad)}>
        <div className="flex flex-col justify-center items-center mt-5">
          <label className="text-lg font-medium text-gray-900 dark:text-branco">
            Foto de perfil
          </label>
          {imagem ? (
            <>
              <img
                className="w-40 h-40 object-cover rounded-full"
                src={URL.createObjectURL(imagem)}
                alt="sua foto"
              />
              <label
                htmlFor="anexo"
                className="relative flex items-center justify-center w-3 h-3"
              >
                <AiFillCamera
                  size={50}
                  color="#f8f8ff    "
                  className="absolute bottom-[-0.2rem] hover:cursor-pointer bg-azul-hyde   p-2 rounded-full"
                />
              </label>
            </>
          ) : (
            <>
              <CgProfile
                size={160}
                className="text-gray-900 dark:text-branco"
              />
              <label
                htmlFor="anexo"
                className="relative flex items-center justify-center w-3 h-3"
              >
                <AiFillCamera
                  size={50}
                  color="#f8f8ff  "
                  className="absolute bottom-[-0.2rem] hover:cursor-pointer bg-azul-hyde  p-2 rounded-full"
                />
              </label>
            </>
          )}
          {errors.anexo && (
            <p className="text-red-500 pt-5 w-full text-center">
              {errors.anexo.message}
            </p>
          )}
        </div>
        <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-2">
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Nome completo
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent"
              placeholder="Nome completo"
              {...register("nome", { required: true })}
              type="text"
            />
            {errors.nome && (
              <p className="text-red-500 pt-2 w-full">{errors.nome.message}</p>
            )}
          </div>

          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Matrícula
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent"
              placeholder="Matrícula"
              {...register("matricula", { required: true })}
              type="text"
            />
            {errors.matricula && (
              <p className="text-red-500 pt-2 w-full">
                {errors.matricula.message}
              </p>
            )}
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Nome de usuário
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent"
              placeholder="Usuário"
              {...register("usuario", { required: true })}
              type="text"
            />
            {errors.usuario && (
              <p className="text-red-500 pt-2 w-full">
                {errors.usuario.message}
              </p>
            )}
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Email
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent"
              placeholder="Email"
              {...register("email", { required: true })}
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 pt-2 w-full">{errors.email.message}</p>
            )}
          </div>
          <div className="mt-1 hidden">
            <input
              id="anexo"
              type="file"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
              placeholder="Selecione uma foto"
              accept=".png, .jpg, .jpeg"
              {...register("anexo", {
                required: true,
                onChange: (e) => setImagem(e.target.files[0]),
              })}
            />
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Senha
            </label>
            <input
              type="password"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent"
              placeholder="Senha"
              {...register("senha", { required: true })}
            />
            {errors.senha && (
              <p className="text-red-500 pt-2 w-full">{errors.senha.message}</p>
            )}
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Confirme sua senha
            </label>
            <input
              type="password"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent"
              placeholder="Confirme sua senha"
              {...register("confirmsenha", { required: true })}
            />
            {errors.confirmsenha && (
              <p className="text-red-500 pt-2 w-full">
                {errors.confirmsenha.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-center items-center">
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
              <>Cadastrar</>
            )}
          </button>
          <ToastContainer />
          <p className={status ? "text-green-500" : "text-red-500"}>
            {status ? status : statusErro}
          </p>
        </div>
      </form>
    </div>
  );
}
