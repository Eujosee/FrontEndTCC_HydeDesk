import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import Imagemcad from "../../images/loginamico.svg"

import { Context } from "../../Context/AuthContext";

export default function Form() {
  const [label, setLabel] = useState("cpf");
  const [email, setEmail] = useState("");
  const { handleLogin, status } = useContext(Context);

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  return (
		<div className="bg-white px-10 py-10 dark:bg-preto">
			<div>
				<div className="sm:px-0 lg:px-8 mb-10 justify-center items-center">
					<p className="font-semibold text-lg text-center dark:text-branco">
						Qual seu tipo de conta?
					</p>
					<div className="flex justify-center items-center">
						<input
							type="radio"
							name="escolhalogin"
							value="cpf"
							onChange={handleChange}
							defaultChecked
						/>

						<label className="mr-4 ml-2 font-semibold dark:text-branco">
							Técnico
						</label>
						<input
							type="radio"
							name="escolhalogin"
							value="cnpj"
							onChange={handleChange}
						/>
						<label className="mr-4 ml-2 font-semibold dark:text-branco">
							Empresa
						</label>

						<input
							type="radio"
							name="escolhalogin"
							value="Matricula"
							onChange={handleChange}
						/>
						<label className="ml-2 font-semibold dark:text-branco">
							Funcionário
						</label>
					</div>
				</div>
				<div>
					<label className="text-lg font-semibold items-center text-gray-900 dark:text-branco">
						Email
					</label>
					<input
						type="text"
						className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2  dark:text-branco  dark:bg-preto"
						placeholder="Email"
						value={email}
						onChange={(e) => [setEmail(e.target.value)]}
					/>
				</div>
				<div className="mt-8 flex flex-col justify-center items-center">
					<button
						className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 w-2/3 rounded-3xl text-white font-bold text-lg dark:text-branco"
						onClick={() => {
							handleLogin();
						}}
					>
						{" "}
						Enviar email
					</button>

					<p className="dark:text-branco">
						Um link será enviado para que você possa redefinir sua senha
					</p>
					<p className="text-red-500 flex justify-center">{status}</p>
				</div>
			</div>
		</div>
	);
}