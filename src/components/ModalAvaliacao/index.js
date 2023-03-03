
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";



export default function ModalAvaliacao({open, onClose, dataChamado}){
  if (!open) return null;
  let data = dataChamado

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Conclusão
                  </Dialog.Title>
                  <div className="flex w-full media pt-4">
                    <div className="w-full flex flex-col space-y-4 data1">
                      <div className=" w-full flex space-x-2">
                        <div className="flex flex-col w-full ">
                          <label className="font-medium text-gray-500">
                            Descrição
                          </label>
                          <input
                            type="text"
                            className="bg-gray-300 rounded w-full h-10 pl-4 shadow"
                            value="Rede"
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label className="font-medium text-gray-500">
                            Avaliação
                          </label>
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

                      {data.anexo && (
                        <div className="flex flex-col w-full ">
                          <label className="font-medium text-gray-500">
                            Anexo:
                          </label>
                          <img src="" className="w-full h-60" alt="" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 space-x-5">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onClose}
                    >
                      Desativar
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
