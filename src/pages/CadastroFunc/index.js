import Form from "../../components/CadFunc"
import Imagemcad from "../../images/mobile.svg"
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CadastroFunc() {
    return (
			<>
				<div className="flex w-full h-screen items-center justify-center dark:text-branco  dark:bg-preto">
					<div className="flex w-full h-full items-center">
						<div className="hidden w-2/6 h-screen lg:flex lg:flex-col bg-azul-claro-hyde dark:bg-azul-hyde justify-center items-center">
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
						<div className="flex flex-col w-full h-full items-center overflow-y-auto">
							<div className="flex w-full mt-11 lg:px-20 px-10 items-start justify-start">
								<Link
									className=" no-underline text-black dark:text-branco"
									to={"/lista-funcionarios"}
								>
									<AiOutlineArrowLeft size={20} />
								</Link>
							</div>
							<div className="h-4/5">
								<Form />
							</div>
						</div>
					</div>
				</div>
			</>
		);
}

export default CadastroFunc;