import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ImagemFloppa from "../../images/floppa.jpg";
import FotoInst from "../../images/fotoInst.jpg";
import Logo from "../../images/logo.png";
import FotoTurma from "../../images/fototurma.jpeg";
import Carrossel from "../../components/Carrosel";
import { Link } from "react-router-dom";
import Imagemfinal from "../../images/Nerd-amico.svg";
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
				<div className="flex items-center justify-center w-full h-[15rem] lg:h-[32rem] overflow-hidden relative">
					<img className="object-cover" src={FotoInst}  alt="" />
					{/* Foto de <a href="https://unsplash.com/@clark_fransa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Arnold Francisca</a> na <a href="https://unsplash.com/pt-br/fotografias/f77Bh3inUpE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}
  
					<span className="font-extrabold text-5xl text-azul-hyde absolute">Hyde<span className="text-white">Desk</span></span>
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
							<img src={Logo} alt="" />
						</div>
					</div>
				</div>
				<div className="flex items-center w-full  h-[15rem] md:h-[20rem] lg:h-[50rem] overflow-hidden">
					<img className="object-cover bottom-20 w-full" src={FotoTurma} alt="" />
				</div>
				<div className=" py-14 flex flex-col justify-center items-center">
					<h1 className="mb-10 font-bold text-2xl dark:text-branco">
						Conheça nosso time
					</h1>
					<div className="max-w-full">
						<Carrossel />
					</div>
				</div>
				<div className="w-full flex flex-row justify-evenly items-center py-10 px-10 lg:py-24 bg-slate-200 dark:bg-gray-900">
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
							className="flex mt-6 hover:bg-cyan-600 text-white font-semibold py-2.5 px-10 rounded-md bg-azul-hyde justify-center"
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
					className="fixed bottom-10 right-12 w-16 h-16 rounded-full
                bg-azul-hyde flex items-center justify-center shadow-md"
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
