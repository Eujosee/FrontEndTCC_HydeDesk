import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ImagemFloppa from "../../images/floppa.jpg";
import ImagemFloppa1 from "../../images/floppa1.png";

import ImagemFloppa2 from "../../images/floppa2.png";
import Carrossel from "../../components/Carrosel";
import { Link } from "react-router-dom";
import Imagemfinal from "../../images/Nerd-amico.svg"
import { BsChat } from "react-icons/bs";
import ModalChatBot from "../../components/ModalChatBot";
import { useState } from "react";

function HomeInstitucional() {
  const [modal, setModal] = useState(false);

	function toggleModal() {
		setModal(!modal);
	}
  return (
    <>
    <ModalChatBot open={modal} onClose={toggleModal} />
			<Header />
			<div className="flex flex-col w-full min-h-screen overflow-x-hidden dark:bg-preto">
				<div className="w-full mt-10">
					<img className="w-full " src={ImagemFloppa1}  alt="" />
				</div>
				<div
					id="historia"
					className="flex py-10 md:py-24 items-center justify-center"
				>
					<div className="max-w-lg p-10 lg:p-0">
						<h1 className="font-semibold text-3xl dark:text-branco">
							Quem somos?
						</h1>
						<div className="bg-azul-hyde h-1.5 mb-5 w-full"></div>
            

						<p className="text-gray-600 text-lg text-justify leading-relaxed dark:text-branco">
							Somos uma equipe de alunos do curso Técnico em Desenvolvimento de
							Sistemas da escola SENAI Suíço-Brasileira, dedicados à criação de
							um TCC inovador: o HydeDesk. Nossa solução de suporte técnico
							empresarial oferece recursos avançados para gerenciar problemas de
							TI para manter a infraestrutura de companhias funcionando sem
							interrupções. Estamos comprometidos em entregar um projeto de alta
							qualidade e entusiasmados com a oportunidade de aplicar
							conhecimentos e habilidades em algo tão desafiador.
						</p>
					</div>
					<div className="md:px-20 hidden lg:flex">
						<div className="flex justify-center items-center w-80 h-80">
							<img src={ImagemFloppa} alt="" />
						</div>
					</div>
				</div>
				<div className="w-full h-90">
					<img className="w-full" src={ImagemFloppa2} alt="" />
				</div>
				<div className=" py-14 flex flex-col justify-center items-center">
					<h1 className="mb-10 font-bold text-2xl dark:text-branco">
						Conheça nosso time
					</h1>
					<div className="max-w-full bg-slate-100">
						<Carrossel />
					</div>
				</div>
				<div className="w-full flex flex-row justify-evenly items-center py-10 px-10 lg:py-24 dark:bg-gray-900">
					<div>
						<h1 className="font-semibold text-2xl lg:text-3xl dark:text-branco">
							Ficou interessado?
						</h1>
						<div className="bg-azul-hyde h-1.5 mb-5"></div>
						<p className="max-w-lg text-lg leading-relaxed text-justify text-gray-600 dark:text-branco">
							Olá! Ficamos felizes com seu acesso e seu interesse neste projeto
							de TCC. Para conhecer mais sobre a parte funcional do HydeDesk,
							convidamos você a visitar a nossa página comercial. Lá, encontrará
							informações detalhadas sobre as funcionalidades do suporte técnico
							empresarial. Não perca essa oportunidade de conhecer a Hyde e como
							ela pode ajudar a melhorar a gestão de TI da sua companhia.
						</p>
						<Link
							to="/"
							className="flex mt-6 hover:bg-cyan-600 text-branco font-semibold py-2.5 px-10 rounded-md bg-azul-hyde justify-center"
						>
							<span>Saiba mais</span>
						</Link>
					</div>
					<div className="hidden md:flex">
						<img
							className="h-96 w-96"
							src={Imagemfinal}
							alt="Nerd mexendo em um computador sentado em livros"
						/>
					</div>
					{/* <a href="https://storyset.com/people">People illustrations by Storyset</a> */}
				</div>
				<button
					className="fixed bottom-10 right-10 w-16 h-16 rounded-full
                bg-azul-hyde flex items-center justify-center"
					onClick={toggleModal}
				>
					<BsChat size={30} className="text-white"/>
				</button>
				<Footer />
			</div>
		</>
	);
}

export default HomeInstitucional;
