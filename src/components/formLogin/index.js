import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../../Context/AuthContext";
import InputMask from "react-input-mask";

function Form() {
  const [label, setLabel] = useState("cpf");
  const [cpf, setCPF] = useState("");
  const [senha, setSenha] = useState("");
  const { handleLogin, status } = useContext(Context);
  var user = {};

  if (label === "matricula") {
    user = {
      [label]: cpf,
      senha: senha,
    };
  } else {
    user = {
      [label]: cpf.replace(/[^0-9]+/g, ""),
      senha: senha,
    };
  }
  console.log(user)

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  return (
		<div className="bg-white px-10 py-10 dark:bg-preto">
			<div>
				<div className="sm:px-0 sm:shrink lg:px-8">
					<p className="font-semibold text-lg dark:text-white">Entrar como:</p>
					<input
						type="radio"
						name="escolhalogin"
						value="cpf"
						onChange={handleChange}
						defaultChecked
					/>
					<label className="mr-4 ml-2 font-semibold dark:text-white">
						Técnico
					</label>

					<input
						type="radio"
						name="escolhalogin"
						value="cnpj"
						onChange={handleChange}
					/>
					<label className="mr-4 ml-2 font-semibold dark:text-white ">
						Empresa
					</label>

          <input
            type="radio"
            name="escolhalogin"
            value="matricula"
            onChange={handleChange}
          />
          <label className="ml-2 font-semibold ">Funcionário</label>
        </div>
        <div className="mt-8 mb-3">
          <label className="text-lg font-semibold  text-gray-900">Login</label>
          <InputMask
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            placeholder={
              label === "cpf" || label === "cnpj"
                ? label.toUpperCase()
                : "Matrícula"
            }
            name="cpf"
            mask={
              label === "cpf"
                ? "999.999.999-99"
                : label === "cnpj"
                ? "99.999.999/9999-99"
                : label === "matricula"
                ? ""
                : ""
            }
            onChange={(e) => [setCPF(e.target.value)]}
            required
          />
        </div>
        <div>
          <label className="text-lg font-semibold  text-gray-900">Senha</label>
          <input
            type="password"
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            placeholder="Senha"
            onChange={(e) => [setSenha(e.target.value)]}
          />
        </div>
        <div className="mt-8 flex flex-col">
          <button
            className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-3xl text-white font-bold text-lg "
            onClick={() => {
              handleLogin(user, label);
            }}
          >
            {" "}
            Login
          </button>
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
