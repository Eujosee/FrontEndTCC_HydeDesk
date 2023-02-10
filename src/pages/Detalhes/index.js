import React from 'react';
import Header from '../../components/header';
import './index.css';
import { AiOutlineArrowLeft } from 'react-icons/ai'


export default function Detalhes() {
 return (
   <>
    <Header/>
    <div className='flex flex-column w-full h-1/4 font-Poppins p-8'>
      <div className='mb-5'>
         <AiOutlineArrowLeft size={20} />
         <h1 className='text-2xl font-bold mt-2 ml-3'>Detalhes - 22/01/2023</h1> 
      </div>
      <div className='flex w-full media'>
        <div className='w-1/2 flex flex-column space-y-4 data1'>
          <div className=' w-full flex space-x-2'> 
            <div className='flex flex-column w-1/2 '>
              <label className='font-medium text-gray-500'>Problema:</label>
              <input type="text" className="bg-gray-300 rounded w-full h-10 pl-4 shadow" value="Rede" disabled/>
            </div>
            <div className='flex flex-column w-1/2'>
              <label className='font-medium text-gray-500'>Setor:</label>
              <input type="text" className="bg-gray-300 rounded h-10 pl-4 shadow" value="Rh" disabled/>
            </div>
          </div>

          <div className='flex flex-column w-full'>
              <label className='font-medium text-gray-500'>Patrimonio:</label>
              <input type="text" className="bg-gray-300 rounded h-10 pl-4 shadow" value="11156177" disabled/>
          </div>
          <div className='flex flex-column w-full'>
              <label className='font-medium text-gray-500'>Prioridade:</label>
              <input type="text" className="bg-gray-300 rounded h-10 pl-4 shadow" value="Media" disabled/>
          </div>
          <div className='flex flex-column w-full'>
              <label className='font-medium text-gray-500'>Descrição:</label>
              <textarea className="bg-gray-300 rounded h-36  pl-4 shadow" disabled/>
          </div>
        </div>
        <div className='w-1/2 data2'>
          <div className='flex w-full space-x-2'>
              <div className='flex flex-column text-center items-center justify-center w-1/2 pl-8'>
                    <label className='font-medium text-gray-500'>Código de Verificação:</label>
                    <p className="text-lg font-bold rounded w-1/2">000000</p>
              </div>
              <div className='flex flex-column justify-center items-center text-center w-1/2 pl-8'>
                    <label className='font-medium text-gray-500'>Status:</label>
                    <p className="text-green-500 rounded text-center w-1/2">Concluido</p>
              </div>
            </div>
            <div className='flex flex-column w-full pl-8'>
              <label className='font-medium text-gray-500'>Anexo:</label>
              <img src="http://placehold.it/" className='w-full h-60' alt=''/>
            </div>
          </div>
      </div>
    </div>
   </>
 );
}