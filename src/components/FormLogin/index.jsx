import { useContext, useState } from "react";
import InputMask from "react-input-mask";
import { Context } from "../../context/AuthContext";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Form() {
  const [label, setLabel] = useState("cpf");

  const { handleLogin, status } = useContext(Context);

  const yupSchema = yup.object({
    [label]: yup
      .string()
      .required(
        `Informe o ${label === "usuario" ? "usuário" : label.toUpperCase().trim()}.`
      ),
    senha: yup.string().required("Informe a senha."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(yupSchema) });

  const [loading, setLoading] = useState(false);

  async function login(dataFomulario) {
    if (label !== "usuario") {
      dataFomulario[label] = dataFomulario[label].replace(/[^0-9]+/g, "");
    }

    setLoading(true);
    await handleLogin(dataFomulario, label);
    setLoading(false);
    reset();
  }

  const handleChange = (event) => {
    reset();
    setLabel(event.target.value);
  };

  return (
    <div className="bg-white px-10 py-10 dark:bg-preto">
      <div className="sm:px-0 sm:shrink lg:px-8">
        <p className="font-semibold text-lg dark:text-branco">Entrar como:</p>
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            <input
              type="radio"
              id="cpf"
              className="w-4 h-4 text-azul-hyde bg-gray-100  border-gray-300 focus:azul-hyde dark:focus:azul-hyde dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
              name="escolhalogin"
              value="cpf"
              onChange={handleChange}
              defaultChecked
            />
            <label
              htmlFor="cpf"
              className="mr-4 ml-2 font-semibold dark:text-branco cursor-pointer"
            >
              Técnico
            </label>
          </div>
          <div className="flex flex-row items-center">
            <input
              type="radio"
              id="cnpj"
              className="w-4 h-4 text-azul-hyde bg-gray-100 border-gray-300 focus:azul-hyde dark:focus:azul-hyde dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
              name="escolhalogin"
              value="cnpj"
              onChange={handleChange}
            />
            <label
              htmlFor="cnpj"
              className="mr-4 ml-2 font-semibold dark:text-branco cursor-pointer"
            >
              Empresa
            </label>
          </div>
          <div className="flex flex-row items-center">
            <input
              type="radio"
              id="usuario"
              className="w-4 h-4 text-azul-hyde bg-gray-100 border-gray-300 focus:azul-hyde dark:focus:azul-hyde dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
              name="escolhalogin"
              value="usuario"
              onChange={handleChange}
            />
            <label
              htmlFor="usuario"
              className="ml-2 font-semibold dark:text-branco cursor-pointer"
            >
              Funcionário
            </label>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(login)}>
        <div className="mt-8 mb-3">
          <label className="text-lg font-semibold  text-gray-900 dark:text-branco">
            Login
          </label>

          {(label === "cpf" || label === "cnpj") && (
            <InputMask
              className="focus:outline-none focus:border-azul-hyde dark:bg-preto dark:text-branco border-b-2 w-full p-2"
              placeholder={label.toUpperCase()}
              autoCapitalize="false"
              {...register(label, { required: true })}
              mask={label === "cpf" ? "999.999.999-99" : "99.999.999/9999-99"}
            />
          )}

          {label === "usuario" && (
            <input
              className="focus:outline-none focus:border-azul-hyde dark:bg-preto dark:text-branco border-b-2 w-full p-2"
              placeholder="Usuário"
              {...register(label, { required: false })}
            />
          )}
          {errors[label] && (
            <p className="text-red-500 pt-2 w-full">{errors[label].message}</p>
          )}
        </div>
        <div>
          <label className="text-lg font-semibold  text-gray-900 dark:text-branco">
            Senha
          </label>
          <input
            type="password"
            autoCapitalize="false"
            className="focus:outline-none focus:border-azul-hyde dark:bg-preto dark:text-branco  border-b-2 w-full p-2"
            placeholder="Senha"
            {...register("senha", { required: true })}
          />
          {errors.senha && (
            <p className="text-red-500 pt-2 w-full">{errors.senha.message}</p>
          )}
        </div>
        <div className="mt-8 flex flex-col">
          <button
            className={`hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-md text-white font-bold text-lg flex items-center justify-center gap-3 ${
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
              <>Login</>
            )}
          </button>
          <ToastContainer />
          <p className="text-red-500 flex justify-center">{status}</p>

          <Link className="no-underline flex " to="/recuperar">
            <p className="dark:text-branco font-semibold ">Esqueceu a senha?</p>
            <p className="ml-2 text-azul-hyde font-semibold">Recuperar</p>
          </Link>
          {label !== "usuario" ?
            <Link className="no-underline flex  " to="/cadastro">
              <p className="dark:text-branco font-semibold mb-1">
                Não possui uma conta?
              </p>
              <p className="ml-2 text-azul-hyde font-semibold mb-1">Cadastrar</p>
            </Link> : 
            <p className="dark:text-branco font-semibold mb-1 max-w-sm">Caso não possua uma conta, peça para um supervisor cadastrar</p>
          }
        </div>
      </form>

      {/* {label === "cpf" && <FormLoginTec />}
      {label === "cnpj" && <FormLoginEmp />}
      {label === "usuario" && <FormLoginFunc />} */}
    </div>
  );
}

export default Form;
