import api from "../../api"
import { useState } from "react";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from "react-router-dom";

export default function Form(){
  
    return(
        <div className="bg-white px-10 py-10 rounded">
            <h1 className="font-bold">Nova senha</h1>
            <div>
            <input
            className="border-2 w-full rounded p-2 mt-3"
            placeholder="Digite a nova senha"
          
          />
            </div>
            <div>
            <h1 className="font-bold mt-5">Confirmar senha</h1>
             <div>
             <input
            className="border-2 w-full rounded p-2 mt-3"
            placeholder="Digite a nova senha"
            />
             </div>
             <div>
             <button
            className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 w-80 rounded-3xl text-white font-bold text-lg mt-12"
            onClick={() => {
                
              }}>Alterar senha</button>
          <p className="text-red-500 flex justify-center "></p>
          <Link
            className="no-underline flex items-center "
            to="/cadastro"
          ></Link>
             </div>

            </div>
        </div>
    )
}