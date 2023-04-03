import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardPagamento from "../../components/CardPagamento";
import CardPlano from "../../components/CardPlano";
import data from "../../components/CardPlano/data";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Pagamento() {
 const { plano } = useParams()

 useEffect(() => {
   window.scrollTo(0, 0);
 }, []);

  return (
    <>
      <Header />
      <div className="flex w-full min-h-screen overflow-x-hidden dark:bg-preto ">
        <div className="w-full flex flex-col gap-y-10 gap-x-5 lg:flex-row justify-evenly items-center py-10 lg:py-24 dark:bg-gray-900">
          <CardPagamento />
          <div className="flex flex-col gap-y-6">
            <CardPlano index={plano} />
            <button className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-md text-white font-bold text-lg w-full ">
              <span>Finalizar Compra</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Pagamento;
