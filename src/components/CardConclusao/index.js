import React from "react";
import "./index.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function CardConclusao() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col h-1/4 font-Poppins p-8 bg-white shadow-xl rounded-2xl">
        <div className="mb-5">
          <AiOutlineArrowLeft size={20} />
          <h1 className="text-2xl font-bold mt-2 ml-3 text-center">
            Conclusão
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

            <div className="flex flex-col w-full ">
              <label className="font-medium text-gray-500">Anexo:</label>
              <img src="http://placehold.it/" className="w-full h-60" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
