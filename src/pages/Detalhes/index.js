import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import "./index.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams } from "react-router-dom";
import api from "../../api";

export default function Detalhes() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/chamados/" + id);
        console.log(data);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <>
      <Header />
      {!loading && (
        <div className="flex flex-col w-full h-1/4 p-8">
          <div className="mb-5">
            <AiOutlineArrowLeft size={20} />
            <h1 className="text-2xl font-bold mt-2 ml-3">
              Detalhes - 22/01/2023
            </h1>
          </div>
          <div className="flex w-full media">
            <div className="w-1/2 flex flex-col space-y-4 data1">
              <div className=" w-full flex space-x-2">
                <div className="flex flex-col w-1/2 ">
                  <label className="font-medium text-gray-500">Problema:</label>
                  <input
                    type="text"
                    className="bg-gray-300 rounded w-full h-10 pl-4 shadow"
                    value={data[0].problema}
                    disabled
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="font-medium text-gray-500">Setor:</label>
                  <input
                    type="text"
                    className="bg-gray-300 rounded h-10 pl-4 shadow"
                    value={data[0].setor}
                    disabled
                  />
                </div>
              </div>

              <div className="flex flex-col w-full">
                <label className="font-medium text-gray-500">Patrimonio:</label>
                <input
                  type="text"
                  className="bg-gray-300 rounded h-10 pl-4 shadow"
                  value={data[0].patrimonio}
                  disabled
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="font-medium text-gray-500">Prioridade:</label>
                <input
                  type="text"
                  className="bg-gray-300 rounded h-10 pl-4 shadow"
                  value={data[0].prioridade}
                  disabled
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="font-medium text-gray-500">Descrição:</label>
                <textarea
                  className="bg-gray-300 rounded h-36  pl-4 shadow"
                  value={data[0].descricao}
                  disabled
                />
              </div>
            </div>
            <div className="w-1/2 data2">
              <div className="flex w-full space-x-2">
                <div className="flex flex-col text-center items-center justify-center w-1/2 pl-8">
                  <label className="font-medium text-gray-500">
                    Código de Verificação:
                  </label>
                  <p className="text-lg font-bold rounded w-1/2">
                    {data[0].cod_verificacao}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center text-center w-1/2 pl-8">
                  <label className="font-medium text-gray-500">Status:</label>
                  <p className="text-green-500 rounded text-center w-1/2">
                    {data[0].status_chamado}
                  </p>
                </div>
              </div>
                {data[0].anexo && (
                  <div className="flex flex-col w-full pl-8">
                    <label className="font-medium text-gray-500">Anexo:</label>
                    <img
                      src={"https://hdteste.azurewebsites.net/" + data[0].anexo}
                      className="w-full h-60"
                      alt="anexo do chamado"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        
      )}
    </>
  );
}
