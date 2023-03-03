import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ImagemFloppa1 from "../../images/floppa1.png";
import ImagemFloppa2 from "../../images/floppa2.png";
import Business from "../../images/Business-amico.svg";
import Carrossel from "../../components/CarroselProdutos";
import CardDiferenciais from "../../components/CardDiferenciais";

function HomeComercial() {
    return (
        <>
            <Header />
            <div className="flex flex-col w-full min-h-screen overflow-x-hidden dark:bg-preto ">
                <div className="w-full">
                    <img className="w-full" src={ImagemFloppa1} alt="" />
                </div>
                <div className="py-14 flex flex-col justify-center items-center">
                    <h1 className="font-bold text-2xl dark:text-white">
                        Produtos
                    </h1>
                    <div className="max-w-full">
                        <Carrossel />
                    </div>
                </div>
                <div className="w-full h-90">
                    <img className="w-full" src={ImagemFloppa2} alt="" />
                </div>
                <div className=" py-14 flex flex-col justify-center items-center">
                    <h1 className="mb-5 font-bold text-2xl dark:text-white">
                        Recursos
                    </h1>
                    <div className="max-w-full">
                        <CardDiferenciais />
                    </div>
                </div>
                <div className="w-full flex flex-row justify-evenly items-center py-10 px-10 lg:py-24 bg-slate-200">
                    <p className="max-w-lg text-lg leading-relaxed text-justify text-gray-600">
                    Nosso sistema de suporte técnico é a solução ideal para empresas que buscam gerenciar problemas de TI para manter sua infraestrutura funcionando sem interrupções.
                    A plataforma oferece meios avançados, capazes de atender às necessidades de suporte, garantindo que a companhia tenha acesso a solucão de problemas de forma rápida e eficaz.
                    Dessa forma, seu negócio pode contar com uma gestão de TI de alta qualidade e garantir que seus recursos de tecnologia sejam aproveitados ao máximo.
                    </p>
                    <img className="hidden lg:flex h-96 w-96" src={Business} alt="Duas pessoas dando as mãos ao fazerem negocíos"/>
                </div>
                <div className=" py-14 flex flex-col justify-center items-center">
                    <h1 className="mb-5 font-bold text-2xl dark:text-white">
                        Diferenciais
                    </h1>
                    <div className="max-w-full md:w-3/4 md:p-x-10">
                        <div class="hidden md:grid md:grid-cols-2 md:gap-10 ">
                            <div className="flex justify-center bg-slate-300 shadow-md rounded-xl p-32">
                                <h1>card</h1>
                            </div>
                            <div className="flex justify-center bg-slate-300 shadow-md rounded-xl p-32">
                                <h1>card</h1>
                            </div>
                            <div className="flex justify-center bg-slate-300 shadow-md rounded-xl p-32">
                                <h1>card</h1>
                            </div>
                            <div className="flex justify-center bg-slate-300 shadow-md rounded-xl p-32">
                                <h1>card</h1>
                            </div>
                        </div>
                        <div className="md:hidden">
                            <CardDiferenciais/>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center py-32 bg-slate-200">
                    <p className="text-lg text-justify p-5 semi-bold dark:text-white">
                    “Os clientes se lembram de um bom atendimento durante muito mais tempo do que recordam do preço”
                        – Kate Zabriskie.
                    </p>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default HomeComercial;