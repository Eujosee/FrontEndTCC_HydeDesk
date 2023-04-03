import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardPagamento from "../../components/CardPagamento";
import CardPlano from "../../components/CardPlano";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Pagamento() {
 const { plano } = useParams()

 useEffect(() => {
   window.scrollTo(0, 0);
 }, []);

  return (
    <>
      <Header />
        <div className="flex w-full flex-col min-h-screen items-center overflow-hidden py-10 px-10 lg:px-0  dark:bg-gray-900">
          <div className="w-full flex flex-col gap-y-8 lg:ml-20">
            <AiOutlineArrowLeft
                size={30}
                onClick={() => (window.location.href = "/")}
                className="cursor-pointer text-gray-900 dark:text-branco"
            />
            <h1 className="dark:text-white text-2xl mb-10 font-bold">Finalizar Compra</h1>
          </div>
          <div className="w-full flex flex-col  gap-y-10 gap-x-5 lg:flex-row justify-evenly">
            <div className="flex flex-col justify-center items-center">
              <h1 className="dark:text-gray-50 font-semibold text-xl w-full mb-6">1. Pagamento</h1>
              <CardPagamento />
            </div>
            <div className="flex flex-col justify-center items-center lg:items-start gap-y-6">
              <h1 className="dark:text-gray-50 font-semibold text-xl w-full">2. Resumo</h1>
              <CardPlano index={plano} />
              <Link to="/" className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-md text-white font-bold text-lg w-full ">
                <span className="flex items-center justify-center">Finalizar Compra</span>
              </Link>
            </div>
          </div>
        </div>
      <Footer />
    </>
  );
}

export default Pagamento;
