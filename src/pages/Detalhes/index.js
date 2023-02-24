import { useEffect, useState } from "react";
import api from "../../api";
import Header from "../../components/header";
import "./index.css";
import { AiOutlineArrowLeft, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from "react-router";

export default function Detalhes() {
  const { id } = useParams();
  const [dados, setDados] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/chamados/" + id);

        console.log(data);
        setDados(data);
        setLoading(false);
      } catch (error) {
        setStatus("Erro ao buscar os dados!");
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col w-full h-1/4 p-8">
        <div className="mb-5">
          <AiOutlineArrowLeft size={20} />
          <h1 className="text-2xl font-bold mt-2 ml-3">
            Detalhes - 22/01/2023
          </h1>
        </div>
        {loading && (
          <div className="flex gap-2 items-center m-auto w-64 mt-10">
            <AiOutlineLoading3Quarters size={25} className="icon" />
            <p className=""> Carregando...</p>
          </div>
        )}
        {dados.length > 0 && (
          <div className="flex w-full media">
            <div className="w-1/2 flex flex-col space-y-4 data1">
              <div className=" w-full flex space-x-2">
                <div className="flex flex-col w-1/2 ">
                  <label className="font-medium text-gray-500">Problema:</label>
                  <input
                    type="text"
                    className="focus:outline-none border-b-2 bg-white mb-1 w-full h-10 pl-4"
                    value={dados[0].problema}
                    disabled
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="font-medium text-gray-500">Setor:</label>
                  <input
                    type="text"
                    className="focus:outline-none border-b-2 bg-white mb-1 h-10 pl-4"
                    value={dados[0].setor}
                    disabled
                  />
                </div>
              </div>

              <div className="flex flex-col w-full">
                <label className="font-medium text-gray-500">Patrimonio:</label>
                <input
                  type="text"
                  className="focus:outline-none border-b-2 bg-white mb-1 h-10 pl-4"
                  value={dados[0].patrimonio}
                  disabled
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="font-medium text-gray-500">Prioridade:</label>
                <input
                  type="text"
                  className="focus:outline-none border-b-2 bg-white mb-1 h-10 pl-4"
                  value={dados[0].prioridade}
                  disabled
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="font-medium text-gray-500">Descrição:</label>
                <textarea
                  className="focus:outline-none border-b-2 bg-white mb-1 h-36  pl-4 pt-2"
                  disabled
                  value={dados[0].descricao}
                />
              </div>
            </div>
            <div className="w-1/2 data2">
              <div className="flex w-full space-x-2">
                <div className="flex flex-col text-center items-center justify-center w-1/2 pl-8">
                  <label className="font-medium text-gray-500">
                    Código de Verificação:
                  </label>
                  <p className="text-lg font-bold focus:outline-none border-b-2 bg-white w-1/2">
                    {dados[0].cod_verificacao}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center text-center w-1/2 pl-8">
                  <label className="font-medium text-gray-500">Status:</label>
                  <p className="text-green-500 rounded text-center w-1/2">
                    {dados[0].status_chamado}
                  </p>
                </div>
              </div>
                {dados[0].anexo &&  <div className="flex flex-col w-full pl-8">
                <label className="font-medium text-gray-500">Anexo:</label>
                <img
                  src={"https://hdteste.azurewebsites.net/" + dados[0].anexo}
                  className="w-full h-60"
                  alt="anexo do chamado"
                />
              </div>}
             
            </div>
          </div>
        )}
      </div>
    </>
  );
}
