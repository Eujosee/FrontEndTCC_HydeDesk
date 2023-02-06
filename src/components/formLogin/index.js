import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import { Context } from "../../Context/AuthContext";

function Form() {
  const [label, setLabel] = useState("");
  const [cpf, setCPF] = useState("");
  const [senha, setSenha] = useState("");
  const { authenticated, handleLogin, status } = useContext(Context);


  const user = {
    cpf: cpf,
    senha: senha,
  };

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  return (
    <div className="bg-white px-10 py-10 rounded">
      <h1 className="font-bold">Login</h1>
      <p className="font-medium text-lg mt-8">Entrar como:</p>
      <div>
        <div>
          <input
            type="radio"
            name="escolhalogin"
            value="CPF"
            onChange={handleChange}
          />
          <label className="mr-4 ml-2 font-medium">Técnico</label>

          <input
            type="radio"
            name="escolhalogin"
            value="CNPJ"
            onChange={handleChange}
          />
          <label className="mr-4 ml-2 font-medium">Empresa</label>

          <input
            type="radio"
            name="escolhalogin"
            value="Matrícula"
            onChange={handleChange}
          />
          <label className="ml-2 font-medium">Funcionário</label>
        </div>
        <div className="mt-8">
          <label className="text-lg font-medium text-gray-900 dark:text-white">
            {!label ? "Login" : label}
          </label>
          <input
            className="border-2 w-full rounded p-2"
            placeholder={!label ? "CPF" : label}
            value={cpf}
            onChange={(e) => [setCPF(e.target.value), ]}
          />
        </div>
        <div>
          <label className="text-lg mt-2 font-medium text-gray-900 dark:text-white">
            Senha
          </label>
          <input
            type="password"
            className="border-2 w-full rounded p-2"
            placeholder="Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value)]}
          />
        </div>
        <div className="mt-8 flex flex-col">
          <Link
            className="no-underline flex justify-center items-center"
            to="/"
          >
            <p className="text-black font-medium">Esqueceu a senha?</p>
            <p className="ml-2 text-cyan-500 font-medium">Recuperar</p>
          </Link>
          <button
            className="hover:bg-cyan-600 mb-6 bg-cyan-500 p-2 rounded-3xl text-white font-bold text-lg"
            onClick={() => handleLogin(user, label)}>Login</button>
          <p className="text-red-500 flex justify-center">{status}</p>
          <Link
            className="no-underline flex items-center "
            to="/cadastro-tecnico"
          >
            <p className="text-black font-medium mb-1">Não possui uma conta?</p>
            <p className="ml-2 text-cyan-500 font-medium mb-1">Cadastrar</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Form;
