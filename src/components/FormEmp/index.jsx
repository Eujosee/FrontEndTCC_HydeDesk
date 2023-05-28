import api from "../../services/api";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import InputMask from "react-input-mask";
import { AiFillCamera, AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

export default function FormEmp() {
  const [status, setStatus] = useState("");
  const [statusErro, setStatusErro] = useState("");
  const [imagem, setImagem] = useState("");

  const [loading, setLoading] = useState(false);

  const yupSchema = yup.object().shape({
    nome: yup.string().required("Informe o seu nome."),
    cnpj: yup
      .string()
      .required("Informe seu CNPJ.")
      .test("test-invalid-cnpj", "CNPJ inválido", (cnpj) => validarCNPJ(cnpj)),
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
    numero_endereco: yup.string().required("Informe o número do endereço."),
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
    confirmarsenha: yup
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

  const [adress, setAdress] = useState({
    rua: "",
    estado: "",
    cidade: "",
    bairro: "",
  });

  const validarCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj === "") return false;

    if (cnpj.length !== 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj === "00000000000000" ||
      cnpj === "11111111111111" ||
      cnpj === "22222222222222" ||
      cnpj === "33333333333333" ||
      cnpj === "44444444444444" ||
      cnpj === "55555555555555" ||
      cnpj === "66666666666666" ||
      cnpj === "77777777777777" ||
      cnpj === "88888888888888" ||
      cnpj === "99999999999999"
    )
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  };

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

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const handleCad = async (dataFomulario) => {

    setLoading(true);

    try {
      let formData = new FormData();
      formData.append("nome", dataFomulario.nome);
      formData.append("cnpj", dataFomulario.cnpj.replace(/[^0-9]+/g, ""));
      formData.append("email", dataFomulario.email);
      formData.append(
        "telefone",
        dataFomulario.telefone.replace(/[^0-9]+/g, "")
      );
      formData.append("cep", dataFomulario.cep.replace(/[^0-9]+/g, ""));
      formData.append("numero_endereco", dataFomulario.numero_endereco);
      formData.append("foto", imagem);
      formData.append("senha", dataFomulario.senha);
      formData.append("confirmarsenha", dataFomulario.confirmarsenha);

      const { data } = await api.post("/empresas/cadastro", formData, config);
      setLoading(false);
      toast.success("Cadastro realizado com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setStatus(data.message);
      window.location.href = "/login";
      reset();
    } catch (error) {
      console.log(error);
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
                  className="absolute bottom-[-0.2rem] hover:cursor-pointer bg-azul-hyde   p-2 rounded-full"
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
        <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-4 lg:gap-x-10 lg:gap-y-2">
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Nome da empresa *
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-preto dark:text-branco"
              placeholder="Nome da empresa"
              {...register("nome", { required: true })}
              type="text"
            />
            {errors.nome && (
              <p className="text-red-500 pt-2 w-full">{errors.nome.message}</p>
            )}
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              CNPJ *
            </label>
            <InputMask
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-preto dark:text-branco"
              placeholder="CNPJ"
              mask="99.999.999/9999-99"
              {...register("cnpj", { required: true })}
              type="text"
            />
            {errors.cnpj && (
              <p className="text-red-500 pt-2 w-full">{errors.cnpj.message}</p>
            )}
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Email *
            </label>
            <input
              type="email"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-preto dark:text-branco"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 pt-2 w-full">{errors.email.message}</p>
            )}
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Telefone *
            </label>
            <InputMask
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
              placeholder="Telefone"
              type="tel"
              mask="(99) 9999-9999"
              {...register("telefone", { required: true })}
            />
            {errors.telefone && (
              <p className="text-red-500 pt-2 w-full">
                {errors.telefone.message}
              </p>
            )}
          </div>
          <div className="mt-2 col-span-1">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              CEP *
            </label>
            <InputMask
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
              placeholder="CEP"
              name="cep"
              mask="99999-999"
              {...register("cep", {
                required: true,
                onChange: (e) => validateCep(e.target.value),
              })}
              type="text"
            />
            {errors.cep && (
              <p className="text-red-500 pt-2 w-full">{errors.cep.message}</p>
            )}
          </div>
          <div className="mt-2 col-span-1">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Estado
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-preto dark:text-branco"
              placeholder="Estado"
              name="estado"
              value={adress.estado}
              disabled
            />
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Cidade
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-preto dark:text-branco"
              placeholder="Cidade"
              name="cidade"
              value={adress.cidade}
              disabled
            />
          </div>
          <div className="mt-2 col-span-1">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              N° *
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-preto dark:text-branco"
              placeholder="N°"
              {...register("numero_endereco", { required: true })}
              type="number"
            />
            {errors.numero_endereco && (
              <p className="text-red-500 pt-2 w-full">
                {errors.numero_endereco.message}
              </p>
            )}
          </div>
          <div className="mt-2 col-span-1">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Rua
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-preto dark:text-branco"
              placeholder="Rua"
              name="Rua"
              value={adress.rua}
              disabled
            />
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Bairro
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-preto dark:text-branco"
              placeholder="Bairro"
              name="bairro"
              value={adress.bairro}
              disabled
            />
          </div>
          <div className="mt-1 col-span-4 hidden">
            <div className="flex flex-row">
              <label className="text-lg font-medium text-gray-900">
                Foto de perfil *
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
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 hidden"
              placeholder="Selecione uma foto"
              id="anexo"
              accept=".png, .jpg, .jpeg"
              {...register("anexo", {
                required: true,
                onChange: (e) => setImagem(e.target.files[0]),
              })}
            />
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Senha *
            </label>
            <input
              type="password"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-preto dark:text-branco"
              placeholder="Senha"
              {...register("senha", { required: true })}
            />
            {errors.senha && (
              <p className="text-red-500 pt-2 w-full">{errors.senha.message}</p>
            )}
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Confirme sua senha *
            </label>
            <input
              type="password"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-preto dark:text-branco"
              placeholder="Confirme sua senha"
              {...register("confirmarsenha", { required: true })}
            />
            {errors.confirmarsenha && (
              <p className="text-red-500 pt-2 w-full">
                {errors.confirmarsenha.message}
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
          <p className="text-black font-bold mb-1 text-lg dark:text-white">
            Já possui uma conta?
          </p>
          <p className="ml-2 text-azul-hyde font-bold mb-1 text-lg">Login</p>
        </Link>
      </div>
    </div>
  );
}
