import Form from "../../components/formNovaSenha";
import { Link } from "react-router-dom";

import ImagemLogin from "../../images/loginamico.svg"

export default function MudaSenha(){
    return (
			<>
				<div className=" flex w-screen h-screen items-center dark:bg-preto">
					<div className="flex w-full items-center ">
						<div className="hidden w-3/4 h-screen lg:flex bg-azul-claro-hyde  justify-center items-center">
							<img
								className="w-3/4 h-3/4"
								src={ImagemLogin}
								alt="Homem abrindo um cadeado virtual com uma chave"
							/>
							{/* <a href="https://storyset.com/internet">Internet illustrations by Storyset</a> */}
						</div>
						<div className="w-full h-screen">
							<div className="flex flex-col items-center h-full justify-center">
								<Link to={"/"} className="flex flex-row m-10">
									<h1 className="font-black text-4xl text-azul-hyde">Hyde</h1>
									<h1 className="font-black text-4xl dark:text-branco">Desk</h1>
								</Link>

								<h1 className="font-bold text-3xl dark:text-branco">
									Mudança de senha
								</h1>
								<Form />
							</div>
						</div>
					</div>
				</div>
			</>
		); 
}