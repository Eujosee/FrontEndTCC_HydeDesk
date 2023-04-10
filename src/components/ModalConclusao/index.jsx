import { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import api from "../../services/api";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import moment from "moment";

export default function ModalConclusao({
  open,
  onClose,
  dataChamado,
  dataConclusao,
}) {
  const [nomeTecnico, setNomeTecnico] = useState("");

  useEffect(() => {
    async function getNomeTecnico() {
      if (!open) return;

      try {
        const response = await api.get(`/tecnicos/${dataChamado.tecnico_id}`);

        setNomeTecnico(response.data.nome_tecnico);
      } catch (error) {
        console.log(error);
      }
    }

    getNomeTecnico();
  }, [open]);
  
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
              <Dialog.Panel className="w-full md:w-1/2 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                <Dialog.Title
                  as="h3"
                  className="flex text-lg items-center justify-center leading-6 text-gray-900 font-bold"
                >
                  <button className="md:hidden" onClick={onClose}>
                    <AiOutlineArrowLeft size={20} />
                  </button>
                  <span className="ml-5 md:m-0 w-full dark:text-gray-50 ">
                    Conclusão - {moment(dataConclusao[0].data_termino).format("DD/MM/YYYY - HH:mm")} h
                  </span>
                </Dialog.Title>
                <div className="flex flex-col gap-y-4 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-4 w-full pt-4">
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-500 dark:text-gray-300">
                      Descrição
                    </label>
                    <input
                      type="text"
                      className="focus:outline-none hover:border-b-azul-hyde border-b-2 p-2 bg-transparent dark:text-gray-50"
                      value={data.descricao}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-500 dark:text-gray-300">
                      Tecnico Responsavel
                    </label>
                    <input
                      type="text"
                      className="focus:outline-none hover:border-b-azul-hyde border-b-2 p-2 bg-transparent dark:text-gray-50"
                      value={nomeTecnico}
                      disabled
                    />
                  </div>

                  {dataConclusao[0].num_avaliacao && (
                    <>
                      <div className="flex flex-col">
                        <label className="font-medium text-gray-500 dark:text-gray-300">
                          Avaliação
                        </label>
                        <Box
                          sx={{
                            "& > legend": { mt: 2 },
                          }}
                        >
                          <div className="flex justify-start">
                            <Rating
                              name="Avaliação"
                              size="large"
                              // emptyIcon={
                              //   <StarIcon className={"dark:text-gray-100"} fontSize="inherit" />
                              // }
                              defaultValue={dataConclusao[0].num_avaliacao}
                              readOnly
                            />
                          </div>
                        </Box>
                      </div>

                      {dataConclusao[0].desc_avaliacao && (
                        <div className={`flex flex-col w-full`}>
                          <label className="font-medium text-gray-500 dark:text-gray-300">
                            Detalhes da Avaliação
                          </label>
                          <input
                            className="focus:outline-none hover:border-b-azul-hyde border-b-2 p-2 bg-transparent dark:text-gray-50"
                            value={dataConclusao[0].desc_avaliacao}
                            disabled
                          />
                        </div>
                      )}
                    </>
                  )}

                  {data.anexo && (
                    <div className="col-span-2">
                      <label className="font-medium text-gray-500 dark:text-gray-300">
                        Anexo:
                      </label>
                      <img
                        src={
                          "https://hydedesk-api.azurewebsites.net/" + data.anexo
                        }
                        className="object-scale-down h-60  overflow-auto"
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
