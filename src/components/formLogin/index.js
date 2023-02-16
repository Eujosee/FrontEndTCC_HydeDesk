import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../../Context/AuthContext";


function Form() {
  const [label, setLabel] = useState("cpf");
  const [cpf, setCPF] = useState("");
  const [senha, setSenha] = useState("");
  const { authenticated, handleLogin, status } = useContext(Context);

  
  const user = {
    [label]: cpf,
    senha: senha,
  }
 
  

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  return (
    <div className="bg-white px-10 py-10">
      <div>
        <div className="sm:px-0 sm:shrink lg:px-8">
        <p className="font-semibold text-lg">Entrar como:</p>
          <input
            type="radio"
            name="escolhalogin"
            value="cpf"
            onChange={handleChange}
            defaultChecked
          />
          <label className="mr-4 ml-2 font-semibold ">Técnico</label>

          <input
            type="radio"
            name="escolhalogin"
            value="cnpj"
            onChange={handleChange}
          />
          <label className="mr-4 ml-2 font-semibold ">Empresa</label>

          <input
            type="radio"
            name="escolhalogin"
            value="Matrícula"
            onChange={handleChange}
          />
          <label className="ml-2 font-semibold ">Funcionário</label>
        </div>
        <div className="mt-8 mb-3">
          <label className="text-lg font-semibold  text-gray-900">
            Login
          </label>
          <input
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            placeholder={!label ? "CPF" : label.toUpperCase()}
            value={cpf}
            onChange={(e) => [setCPF(e.target.value), ]}
          />
        </div>
        <div>
          <label className="text-lg font-semibold  text-gray-900">
            Senha
          </label>
          <input
            type="password"
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            placeholder="Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value)]}
          />
        </div>
        <div className="mt-8 flex flex-col">
          <button
            className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-3xl text-white font-bold text-lg "
            onClick={() => {
              handleLogin(user, label)
            }}> Login</button>
          <p className="text-red-500 flex justify-center">{status}</p>
            
          <Link
            className="no-underline flex "
            to="/recuperar"
          >
            <p className="text-black font-semibold">Esqueceu a senha?</p>
            <p className="ml-2 text-azul-hyde font-semibold">Recuperar</p>
          </Link>
          <Link
            className="no-underline flex  "
            to="/cadastro"
          >
            <p className="text-black font-semibold mb-1">Não possui uma conta?</p>
            <p className="ml-2 text-azul-hyde font-semibold mb-1">Cadastrar</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Form;
