import React from "react";
import "./index.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function CardAvaliacao() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col h-1/4 font-Poppins p-8 bg-white shadow-xl rounded-2xl">
        <div className="mb-5">
          <AiOutlineArrowLeft size={20} />
          <h1 className="text-2xl font-bold mt-2 ml-3 text-center">
            Avaliação
          </h1>
        </div>
        <div className="flex w-full media pt-4">
          <div className="w-full flex flex-col space-y-4 data1">
            <div className=" w-full flex space-x-2">
              <div className="flex flex-col w-full ">
                <label className="font-medium text-gray-500">Descrição</label>
                <input
                  type="text"
                  className="bg-gray-300 rounded w-full h-10 pl-4 shadow"
                  value="Rede"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="font-medium text-gray-500">Avaliação</label>
                <input
                  type="text"
                  className="bg-gray-300 rounded h-10 pl-4 shadow"
                  value="Rh"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="font-medium text-gray-500">
                Detalhes da Avaliação
              </label>
              <textarea className="bg-gray-300 rounded h-36 pt-2 pl-4 shadow" />
            </div>

            <div className="flex flex-col w-full">
              <label className="font-medium text-gray-500">Anexo:</label>
              <input type="file" accept="application/pdf" className="shadow" />
            </div>
            <div className="flex flex-col w-full">
              <label className="font-medium text-gray-500">Protocolo</label>
              <input
                type="text"
                className="bg-gray-300 rounded h-10 pl-4 shadow"
                value="00100010"
              />
            </div>
            <div className="flex">
              <button
                className="w-full mt-5 px-3 py-2 flex items-center text-center content-center text-2xl rounded-2xl bg-azul-hyde hover:bg-cyan-500"
                href="#pablo"
                type="button"
                onClick={() => ""}
              >
                <span className="text-white w-full flex items-center justify-center text-center">
                  Enviar
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
