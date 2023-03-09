import { Link } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import { Context } from "../../Context/AuthContext";
import InputMask from "react-input-mask";
import { ToastContainer } from "react-toastify";

function Form() {
  const [label, setLabel] = useState("cpf");
  const [usuario, setUsuario] = useState("");
  const senha = useRef();
  const { handleLogin, status, authenticated } = useContext(Context);

  var user = {};
  const getRef = () => {
    if (label === "usuario") {
      return (user = {
        usuario: usuario,
        senha: senha.current.value,
      });
    } else {
      return (user = {
        [label]: usuario.replace(/[^0-9]+/g, ""),
        senha: senha.current.value,
      });
    }
  };

  console.log(label)

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  return (
		<div className="bg-white px-10 py-10 dark:bg-preto">
			<div>
				<div className="sm:px-0 sm:shrink lg:px-8">
					<p className="font-semibold text-lg dark:text-white">Entrar como:</p>
					<div className="flex flex-row">

          <div className="flex flex-row items-center">
            <input
              type="radio"
              id="cpf"
              className="w-4 h-4 text-azul-hyde bg-gray-100 border-gray-300 focus:azul-hyde dark:focus:azul-hyde dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              name="escolhalogin"
              value="cpf"
              onChange={handleChange}
              defaultChecked
              />
            <label for="cpf" className="mr-4 ml-2 font-semibold dark:text-white">
              Técnico
            </label>
          </div>
          <div className="flex flex-row items-center">
            <input
              type="radio"
              id="cnpj"
              className="w-4 h-4 text-azul-hyde bg-gray-100 border-gray-300 focus:azul-hyde dark:focus:azul-hyde dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              name="escolhalogin"
              value="cnpj"
              onChange={handleChange}
              />
            <label for="cnpj" className="mr-4 ml-2 font-semibold dark:text-white ">
              Empresa
            </label>
          </div>
          <div className="flex flex-row items-center">
          <input
            type="radio"
            id="matricula"
            className="w-4 h-4 text-azul-hyde bg-gray-100 border-gray-300 focus:azul-hyde dark:focus:azul-hyde dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            name="escolhalogin"
            value="usuario"
            onChange={handleChange}
            />
          <label for="matricula" className="ml-2 font-semibold ">Funcionário</label>
          </div>
            </div>
        </div>
        <div className="mt-8 mb-3">
          <label className="text-lg font-semibold  text-gray-900">Login</label>
          <InputMask
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            placeholder={
              label === "cpf" || label === "cnpj"
                ? label.toUpperCase()
                : "Usuário"
            }
            name="cpf"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            mask={
              label === "cpf"
                ? "999.999.999-99"
                : label === "cnpj"
                ? "99.999.999/9999-99"
                : label === "matricula"
                ? ""
                : ""
            }
            // onChange={(e) => [setCPF(e.target.value)]}
            required
          />
        </div>
        <div>
          <label className="text-lg font-semibold  text-gray-900">Senha</label>
          <input
            type="password"
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            ref={senha}
            placeholder="Senha"
            // onChange={(e) => [setSenha(e.target.value)]}
          />
        </div>
        <div className="mt-8 flex flex-col">
          <button
            className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-md text-white font-bold text-lg "
            onClick={() => {
              handleLogin(getRef(), label);
            }}
          >
            {" "}
            Login
          </button>
          <ToastContainer />
          <p className="text-red-500 flex justify-center">{status}</p>

          <Link className="no-underline flex " to="/recuperar">
            <p className="text-black font-semibold">Esqueceu a senha?</p>
            <p className="ml-2 text-azul-hyde font-semibold">Recuperar</p>
          </Link>
          <Link className="no-underline flex  " to="/cadastro">
            <p className="text-black font-semibold mb-1">
              Não possui uma conta?
            </p>
            <p className="ml-2 text-azul-hyde font-semibold mb-1">Cadastrar</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Form;
