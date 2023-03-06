import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { text } from "@fortawesome/fontawesome-svg-core";

export default function ModalAvaliacao({ open, onClose, dataChamado }) {
  const [avaliacao, setAvaliacao] = useState();
  const [descricao, setDescricao] = useState();
  const [anexo, setAnexo] = useState();
  
  let dadosAvalicao ={
    avaliacao,
    descricao,
    anexo,
}
  console.log(dadosAvalicao.anexo);

  if (!open) return null;
  let data = dataChamado;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full md:w-1/3 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex justify-center text-lg font-medium leading-6 text-gray-900"
                >
                  Avaliação
                </Dialog.Title>
                <div className="flex items-center justify-center">
                  <div className="flex flex-col h-1/2 font-Poppins p-8">
                    <div className="flex w-full media pt-4">
                      <div className="w-full flex flex-col space-y-4 data1">
                        <div className=" w-full flex space-x-2">
                          <div className="flex flex-col w-full ">
                            <label className="font-medium text-gray-500">
                              Descrição
                            </label>
                            <input
                              type="text"
                              className="bg-gray-300 rounded w-full md:w-80 h-10 pl-4 shadow"
                              onChange={e => setDescricao(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col w-full">
                            <label className="font-medium text-gray-500">
                              Avaliação
                            </label>
                            <input
                              type="number"
                              className="bg-gray-300 rounded h-10 pl-4 shadow"
                              onChange={e => setAvaliacao(e.target.value)}
                              min={0}
                              max={10}
                            />
                          </div>
                        </div>
                        {avaliacao < 3 && <div className="flex flex-col w-full">
                          <label className="font-medium text-gray-500">
                            Detalhes da Avaliação
                          </label>
                          <textarea className="bg-gray-300 rounded h-36 pt-2 pl-4 shadow" />
                        </div>} 
                        

                        <div className="flex flex-col w-full">
                          <label className="font-medium text-gray-500">
                            Anexo:
                          </label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="shadow"
                            onChange={e => setAnexo(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label className="font-medium text-gray-500">
                            Protocolo
                          </label>
                          <input
                            type="text"
                            className="bg-gray-300 rounded h-10 pl-4 shadow"
                            value={data.cod_verificacao}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-x-5">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                   Enviar
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
