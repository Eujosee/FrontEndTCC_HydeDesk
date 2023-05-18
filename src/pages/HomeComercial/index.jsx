import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Business from "../../images/Business-amico.svg";
import Team from "../../images/Team-page-amico.svg";
import CardServicos from "../../components/CardServicos";
import { BsChat } from "react-icons/bs";
import ModalChatBot from "../../components/ModalChatBot";
import { useState, useEffect, useRef } from "react";
import CardPlano from "../../components/CardPlano";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import "./index.css"

export default function HomeComercial() {
  const [modal, setModal] = useState(false);
  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Bem-vindo à HydeDesk!"], // Strings to display
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 100,
      loop: true,
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);

  function toggleModal() {
    setModal(!modal);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden dark:bg-preto ">
      <ModalChatBot open={modal} onClose={toggleModal} />
      <Header />
      <div className="w-full flex flex-row justify-evenly items-center py-10 px-10 lg:py-24 bg-slate-200 dark:bg-gray-900">
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-row">
          <h1 ref={el} className="dark:text-white text-4xl font-semibold"></h1>
          </div>
          <p className="max-w-lg text-lg leading-relaxed text-justify text-gray-600 dark:text-branco">
            Agradecemos pela sua visita e ficamos felizes em apresentar nosso
            projeto. Conheça mais sobre a história desse TCC e da nossa equipe
            de profissionais dedicados clicando no botão abaixo. Estamos à
            disposição para esclarecer quaisquer dúvidas ou sugestões que possa
            ter!
          </p>
          <Link
            to="/institucional"
            className="flex mt-6 hover:bg-cyan-600 text-white font-semibold py-2.5 px-10 rounded-md bg-azul-hyde justify-center"
          >
            <span>Conheça mais</span>
          </Link>
        </div>
        <img
          className="hidden lg:flex h-96 w-96"
          src={Team}
          alt="Um time construindo uma web página"
        />
      </div>
      <div className="py-8 mb-10 flex flex-col justify-center items-center">
        <h1 className="font-bold text-4xl dark:text-white mb-10">Soluções</h1>
        <div className="max-w-full grid lg:grid-cols-3 gap-10 px-10">
          <CardServicos index={0}/>
          <CardServicos index={1}/>
          <CardServicos index={2}/>
        </div>
      </div>

      <div className="w-full flex flex-row justify-evenly items-center py-10 px-10 lg:py-24 bg-slate-200 dark:bg-gray-900">
        <p className="max-w-lg text-lg leading-relaxed text-justify text-gray-600 dark:text-branco">
          Nosso sistema de suporte técnico é a solução ideal para empresas que
          buscam gerenciar problemas de TI para manter sua infraestrutura
          funcionando sem interrupções. A plataforma oferece meios avançados,
          capazes de atender às necessidades de suporte, garantindo que a
          companhia tenha acesso a solução de problemas de forma rápida e
          eficaz. Dessa forma, seu negócio pode contar com uma gestão de TI de
          alta qualidade e garantir que seus recursos de tecnologia sejam
          aproveitados ao máximo.
        </p>
        <img
          className="hidden lg:flex h-96 w-96"
          src={Business}
          alt="Duas pessoas dando as mãos ao fazerem negocíos"
        />
      </div>
      <div className=" py-8 flex flex-col justify-center items-center">
        <h1 className="font-bold text-4xl dark:text-white">Planos</h1>
        <div className="max-w-full lg:w-3/4 m-auto p-8">
          <div className="flex flex-col flex-wrap gap-10 w-full justify-center items-center md:flex-row">
            <div className="flex flex-col items-center">
              <CardPlano key="1" index={0} />
              <Link className="flex mt-6 lg:w-full hover:bg-cyan-600 text-white font-semibold py-2.5 px-10 rounded-md bg-azul-hyde justify-center" to={"/pagamento/" + 0}>
                Comprar
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <CardPlano key="1" index={1} />
              <Link className="flex mt-6 lg:w-full hover:bg-cyan-600 text-white font-semibold py-2.5 px-10 rounded-md bg-azul-hyde justify-center" to={"/pagamento/" + 1}>
                Comprar
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <CardPlano key="1" index={2} />
              <Link className="flex mt-6 lg:w-full hover:bg-cyan-600 text-white font-semibold py-2.5 px-10 rounded-md bg-azul-hyde justify-center" to={"/pagamento/" + 2}>
                Comprar
              </Link>
            </div>
           
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center py-32 bg-slate-200 dark:bg-gray-900">
        <p className="text-lg text-justify p-5 semi-bold dark:text-branco">
          “Os clientes se lembram de um bom atendimento durante muito mais tempo
          do que recordam do preço” – Kate Zabriskie.
        </p>
      </div>
      <button
        className="fixed bottom-10 right-12 w-16 h-16 rounded-full
            bg-azul-hyde flex items-center justify-center"
        onClick={toggleModal}
        aria-label="Abrir Chatbot"
      >
        <BsChat size={30} className="text-white" />
      </button>

      <Footer />
    </div>
  );
}
