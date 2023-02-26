import FormTec from "../../components/CadTec"
import FormEmp from "../../components/CadEmp"
import Imagemcad from "../../images/mobile.svg"
import { useState } from "react";
import { Link } from "react-router-dom";

function Cadastro() {
    const [escolha, setEscolha] = useState('tecnico')

    const handleChange = (event) => {
        setEscolha(event.target.value);
    };

    return (
			<>
				<div className="flex w-screen h-fit items-center dark:bg-preto ">
					<div className="flex w-full items-center">
						<div className="hidden w-2/6 h-screen lg:flex lg:flex-col bg-azul-claro-hyde justify-center items-center">
							<Link to="/">
								<h1 className="font-extrabold text-gray-900 mr-2 text-3xl mb-12">
									<span className="font-extrabold text-white text-3xl">
										Hyde
									</span>
									Desk
								</h1>
							</Link>
							<img
								className="w-3/4 h-3/4"
								src={Imagemcad}
								alt="Mulher mexendo no celular para fazer login"
							/>
							{/* <a href="https://storyset.com/internet">Internet illustrations by Storyset</a> */}
						</div>
						<div className="flex flex-col w-full h-screen justify-center items-center overflow-y-auto">
							<div className="lg:mt-10 px-10 flex flex-col w-full">
								<div className="flex flex-row">
									<h1 className="font-extrabold text-gray-900 mr-2 text-3xl dark:text-branco">
										Bem vindo a
										<span className="font-extrabold ml-1 text-azul-hyde text-3xl">
											Hyde
										</span>
										Desk
									</h1>
								</div>
								<div className="flex mt-8 flex-col">
									<h1 className="font-bold text-xl text-gray-900 dark:text-branco">
										Registrar uma conta como:
									</h1>
									<div>
										<input
											type="radio"
											name="escolhalogin"
											value="tecnico"
											onChange={handleChange}
											defaultChecked
										/>
										<label className="mr-4 ml-2 font-medium text-xl dark:text-branco">
											Técnico
										</label>

										<input
											type="radio"
											name="escolhalogin"
											value="empresa"
											onChange={handleChange}
										/>
										<label className="mr-4 ml-2 font-medium text-xl dark:text-branco">
											Empresa
										</label>
									</div>
								</div>
							</div>
							<div className="w-full h-3/4">
								<div className="flex w-full items-center justify-center">
									{escolha === "empresa" ? <FormEmp /> : <FormTec />}
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
}

export default Cadastro;