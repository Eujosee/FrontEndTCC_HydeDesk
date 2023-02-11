import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import { Context } from "../../Context/AuthContext";

export default function Form(){
    const [label, setLabel] = useState("email");
    const [email, setEmail] = useState("");
    const { handleLogin, status } = useContext(Context);

  
    const user = {
        [label]: email,
  }
  const handleChange = (event) => {
    setLabel(event.target.value);
  };

    return(
        <div className="bg-white px-10 py-10 rounded">
      <h1 className="font-bold">Recuperar senha</h1>
      <p className="font-medium mt-8 text-xl">Recuperar como:</p>
      <div>
        <div>
          <input
            type="radio"
            name="escolhalogin"
            value="Email"
            onChange={handleChange}
            defaultChecked
          />
          <label className="mr-4 ml-2 font-medium text-xl">Técnico</label>

          <input
            type="radio"
            name="escolhalogin"
            value="Email"
            onChange={handleChange}
          />
          <label className="mr-4 ml-2 font-medium text-xl">Empresa</label>

          <input
            type="radio"
            name="escolhalogin"
            value="Email"
            onChange={handleChange}
          />
          <label className="ml-2 font-medium text-xl">Funcionário</label>
        </div>
        <div className="mt-2">
          <label className="text-lg font-medium text-gray-900 mt-2">
            Email
          </label>
          <input
            className="border-2 w-full rounded p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => [setEmail(e.target.value), ]}
          />
        </div>
        <div className="mt-2 flex flex-col">
    
            <label className="text-black font-medium text-xl">Será enviado um link ao seu email<br/>para redefinição de senha</label>
        
          <button
            className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-3xl text-white font-bold text-lg mt-4"
            onClick={() => {
              handleLogin(user, label)
              }}>Recuperar Senha</button>
          <p className="text-red-500 flex justify-center">{status}</p>
          <Link
            className="no-underline flex items-center "
            to="/cadastro"
          >
          </Link>
        </div>
      </div>
    </div>
    )
}