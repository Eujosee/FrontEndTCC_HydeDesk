import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import api from "../../api";

export default function ModalConclusao({ open, onClose, dataChamado}) {
  const [nomeTecnico, setNomeTecnico] = useState("");
  const id = JSON.parse(localStorage.getItem("Id"));
    
  useEffect(() => {
    async function getNomeTecnico() {
      if (id === null) {
        return
      }

      try {
        const { data } = await api.get("/tecnicos/" + id);
        setNomeTecnico(data.nome);
      } catch (error) {}
    }

    getNomeTecnico();
  }, [id]);

  if (!open) return null;

  let data = dataChamado;
  const dataHora = dataChamado.data.split("T");
  let d = dataHora[0];
  d = d.split("-");
  const dateCall = `${d[2]}/${d[1]}/${d[0]}`;

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
              <Dialog.Panel className="w-full md:w-1/2 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex justify-center text-lg leading-6 text-gray-900 font-bold"
                >
                  Conclusão - {dateCall}
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
                          className="bg-gray-300 rounded w-full  h-10 pl-4 shadow"
                          value={data.descricao}
                          disabled
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="font-medium text-gray-500">
                          Tecnico Responsavel
                        </label>
                        <input
                          type="text"
                          className="bg-gray-300 rounded w-full h-10 pl-4 shadow"
                          value={nomeTecnico}
                          disabled
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="font-medium text-gray-500">
                          Avaliação
                        </label>
                        <input
                          type="text"
                          className="bg-gray-300 rounded h-10 pl-4 shadow"
                          value=""
                          disabled
                        />
                      </div>    
                    </div>

                    <div className="flex">
                      <div className="flex flex-col w-full pr-10">
                        <label className="font-medium text-gray-500">
                          Detalhes da Avaliação
                        </label>
                        <textarea
                          className="bg-gray-300 rounded h-60 pt-2 pl-4 shadow"
                          disabled
                        />
                      </div>
                      {data.anexo && (
                        <div className="flex flex-col w-full  ">
                          <label className="font-medium text-gray-500">
                            Anexo:
                          </label>
                          <img src="" className="w-full h-60" alt="" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}