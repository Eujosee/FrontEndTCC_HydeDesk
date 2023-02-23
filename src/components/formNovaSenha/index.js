import api from "../../api"
import { useState } from "react";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from "react-router-dom";

export default function Form(){
  
    return(
      <div className="bg-white px-10 py-10">
      <div>
        <div>
          <label className="text-lg font-semibold items-center text-gray-900 ">
            Nova Senha
          </label>
          <input
            type="text"
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            placeholder="Nova senha"
          />
        </div>
      </div>
      <div className="mt-10">
          <label className="text-lg font-semibold items-center text-gray-900">
            Confirmar nova senha
          </label>
          <input
            type="text"
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            placeholder="Confirmar nova senha"
          />
        </div>
        <div className="mt-8 flex flex-col justify-center items-center">
          <button
            className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 w-2/3 rounded-3xl text-white font-bold text-lg "
            onClick={() => {
            }}> Atualizar</button>
          <p className="text-red-500 flex justify-center"></p>
        </div>
    </div>
    )
}