import { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import api from "../../services/api";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function ModalConclusao({ open, onClose, dataChamado }) {
  const [nomeTecnico, setNomeTecnico] = useState("");
  const id = JSON.parse(localStorage.getItem("Id"));

  // useEffect(() => {
  //   async function getNomeTecnico() {
  //     if (id === null) {
  //       return
  //     }

  //     try {
  //       const { data } = await api.get("/tecnicos/" + id);
  //       setNomeTecnico(data.nome);

  //     } catch (error) {}
  //   }

  //   getNomeTecnico();
  // }, [id]);

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
                  className="flex text-lg items-center justify-center leading-6 text-gray-900 font-bold"
                >
                  <button className="md:hidden" onClick={onClose}>
                    <AiOutlineArrowLeft size={20} />
                  </button>
                  <span className="ml-5 md:m-0 w-full ">
                    Conclusão - {dateCall}
                  </span>
                </Dialog.Title>
                <div className="flex flex-col gap-y-4 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-4 w-full pt-4">
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-500">
                      Descrição
                    </label>
                    <input
                      type="text"
                      className="focus:outline-none hover:border-b-azul-hyde border-b-2 p-2"
                      value={data.descricao}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-500">
                      Tecnico Responsavel
                    </label>
                    <input
                      type="text"
                      className="focus:outline-none hover:border-b-azul-hyde border-b-2 p-2"
                      value={nomeTecnico}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-500">
                      Avaliação
                    </label>
                    <input
                      type="text"
                      className="focus:outline-none hover:border-b-azul-hyde border-b-2 p-2"
                      value=""
                      disabled
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="font-medium text-gray-500">
                      Detalhes da Avaliação
                    </label>
                    <input
                      className="focus:outline-none hover:border-b-azul-hyde border-b-2 p-2"
                      disabled
                    />
                  </div>
                  {data.anexo && (
                    <div className="col-span-2">
                      <label className="font-medium text-gray-500">
                        Anexo:
                      </label>
                      <img
                        src={
                          "https://hydedesk-api.azurewebsites.net/" + data.anexo
                        }
                        className="object-scale-down h-60 w-full overflow-auto"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
