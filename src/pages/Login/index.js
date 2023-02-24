import Form from "../../components/formLogin"
import ImagemLogin from "../../images/loginamico.svg"
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

function Login() {
    return (
			<>
				<div className=" flex w-screen h-screen items-center overflow-hidden dark:bg-preto">
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
									<h1 className="font-black text-4xl dark:text-white">Desk</h1>
								</Link>

								<h1 className="font-bold text-3xl dark:text-white">
									Olá novamente!
								</h1>
								<Form />
							</div>
						</div>
					</div>
				</div>
			</>
		);
}

export default Login;