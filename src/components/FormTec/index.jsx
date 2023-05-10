import api from "../../services/api";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import InputMask from "react-input-mask";
import { AiFillCamera, AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function FormTec() {
  const [status, setStatus] = useState("");
  const [statusErro, setStatusErro] = useState("");
  const [imagem, setImagem] = useState("");
  const fileInput = useRef(null);

  const yupSchema = yup.object().shape({
    nome: yup.string().required("Informe o seu nome."),
    cpf: yup
      .string()
      .required("Informe seu CPF.")
      .test("test-invalid-cpf", "CPF inválido", (cpf) => validarCPF(cpf)),
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

  const [loading, setLoading] = useState(false);

  const validarCPF = (cpfs) => {
    let cpf = cpfs.replace(/[^\d]+/g, "");
    if (cpf == "") return false;
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length != 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    )
      return false;
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
  };

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const sendEmail = async (data) => {
    let emailData = {
      toemail: data.email,
      nome: data.nome,
      tipo: "cadastro",
    };
    const email = await axios.post(
      "https://prod2-16.eastus.logic.azure.com:443/workflows/84d96003bf1947d3a28036ee78348d4b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5BhPfg9NSmVU4gYJeUVD9yqkJPZACBFFxj0m1-KIY0o",
      emailData
    );
  };

  const handleCad = async (dataFomulario) => {
    setLoading(true);

    try {
      let formData = new FormData();
      formData.append("nome", dataFomulario.nome);
      formData.append("cpf", dataFomulario.cpf.replace(/[^0-9]+/g, ""));
      formData.append("email", dataFomulario.email);
      formData.append(
        "telefone",
        dataFomulario.telefone.replace(/[^0-9]+/g, "")
      );
      formData.append("especialidade", dataFomulario.especialidade);
      formData.append("foto", imagem);
      formData.append("senha", dataFomulario.senha);
      formData.append("confirmsenha", dataFomulario.confirmsenha);

      const { data } = await api.post("/tecnicos/cadastro", formData, config);
      setStatus(data.message);
      setLoading(false);
      sendEmail(dataFomulario);
      toast.success("Técnico cadastrado com sucesso", {
        position: toast.POSITION.TOP_RIGHT,
      });
      window.location.href = "/login";
      reset();
    } catch (error) {
      setLoading(false);
      setStatusErro(error.response.data.message);
    }
  };

  return (
    <div className="bg-white dark:bg-preto px-10 pb-10 pt-3">
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
                  color="#f8f8ff"
                  className="absolute bottom-[-0.2rem] hover:cursor-pointer bg-azul-hyde  p-2 rounded-full"
                />
              </label>
            </>
          ) : (
            <>
              <CgProfile size={160} className="dark:text-white" />
              <label
                htmlFor="anexo"
                className="relative flex items-center justify-center w-3 h-3"
              >
                <AiFillCamera
                  size={50}
                  color="#f8f8ff"
                  className="absolute bottom-[-0.2rem] hover:cursor-pointer bg-azul-hyde p-2 rounded-full"
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
              Nome completo *
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
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
              CPF *
            </label>
            <InputMask
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
              placeholder="CPF"
              mask="999.999.999-99"
              {...register("cpf", { required: true })}
              type="text"
            />
            {errors.cpf && (
              <p className="text-red-500 pt-2 w-full">{errors.cpf.message}</p>
            )}
          </div>

          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Email *
            </label>
            <input
              type="email"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 pt-2 w-full">{errors.email.message}</p>
            )}
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Telefone Celular *
            </label>
            <InputMask
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
              placeholder="Telefone"
              mask="(99) 99999-9999"
              type="tel"
              {...register("telefone", { required: true })}
            />
            {errors.telefone && (
              <p className="text-red-500 pt-2 w-full">
                {errors.telefone.message}
              </p>
            )}
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Especialidade *
            </label>
            <select
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
              name="especialidade"
              {...register("especialidade", { required: true })}
            >
              <option value="">Selecione uma opção</option>
              <option value="Software">Software</option>
              <option value="Infraestrutura">Infraestrutura</option>
              <option value="Hardware">Hardware</option>
            </select>
            {errors.especialidade && (
              <p className="text-red-500 pt-2 w-full">
                {errors.especialidade.message}
              </p>
            )}
          </div>
          <div className="mt-1 hidden">
            <div className="flex flex-row">
              <label className="text-lg font-medium text-gray-900 dark:text-branco">
                Foto de perfil *
              </label>
              <p
                className="ml-3 mt-1 text-sm text-gray-500 dark:text-gray-300 "
                id="file_input_help"
              >
                PNG, JPG ou JPEG.
              </p>
            </div>
            <input
              ref={fileInput}
              type="file"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
              placeholder="Selecione uma foto"
              id="anexo"
              {...register("anexo", {
                required: true,
                onChange: (e) => setImagem(e.target.files[0]),
              })}
              accept=".png, .jpg, .jpeg"
            />
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Senha *
            </label>
            <input
              type="password"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
              placeholder="Senha"
              {...register("senha", { required: true })}
            />
            {errors.senha && (
              <p className="text-red-500 pt-2 w-full">{errors.senha.message}</p>
            )}
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Confirme sua senha *
            </label>
            <input
              type="password"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
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
        <div className="mt-8 flex justify-center items-center flex-col">
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
      <div>
        <Link className="no-underline flex items-center " to="/login">
          <p className="text-black font-bold text-lg mb-1 dark:text-branco">
            Já possui uma conta?
          </p>
          <p className="ml-2 text-azul-hyde text-lg font-bold mb-1">Login</p>
        </Link>
      </div>
    </div>
  );
}
