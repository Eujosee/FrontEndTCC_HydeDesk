import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import api from "../../api";

export default function ModalSuspender({ open, onClose, id }) {
  const [imagem, setImagem] = useState(null)
  const fileInput = useRef(null);
  const [descricao, setDescricao] = useState('')
  var dados = {}
  if (!open) return null

  const handleConcluir = async (e) => {
    e.preventDefault()
      if(imagem){
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        let formData = new FormData()
        formData.append("anexo", imagem)
        formData.append("descricao", descricao)
        
        console.log(descricao)
        console.log(imagem)
        try {
            const { data } = await api.put("/chamados/concluir/" + id, formData, config)
            console.log(data.message)
            onClose()
        } catch (error) {
          console.log(error)
        }
      }
      try {
        dados = {
          descricao: descricao
        }
        const { data } = await api.put("/chamados/concluir/" + id, dados)
        onClose()
      } catch (error) {
        console.log(error)
      }

  }

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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                <Dialog.Title
                  as="h1"
                  className="text-lg text-center font-semibold  text-gray-900 dark:text-gray-100"
                >
                  Concluir atendimento
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 text-justify dark:text-gray-100">
                    Antes de concluir, nos informe os detalhes do serviço e, caso necessário, envie um anexo.
                  </p>
                </div>
                <form encType="multipart/form">
                <div className="mt-5">
                  <label className="text-md font-medium leading-6 text-gray-900 dark:text-gray-100">Detalhes</label>
                  <input
                    type="text"
                    className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-transparent dark:text-gray-100"
                    placeholder="Detalhes"
                    onChange={(e) => [setDescricao(e.target.value)]}
                  />
                </div>
                <div className="mt-5">
                  <label className="text-md font-medium leading-6 text-gray-900 dark:text-gray-100">Anexo</label>
                  <input
                    type="file"
                    className="focus:outline-none focus:border-azul-hyde placeholder:text-sm border-b-2 w-full p-2 dark:text-gray-100"
                    ref={fileInput}
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => setImagem(e.target.files[0])}
                  />
                      {imagem ? <img className="w-full h-40" src={URL.createObjectURL(imagem)} alt="seu anexo" /> :
                        ''
                      }
                </div>


                <div className="mt-4 space-x-5">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={(e) => handleConcluir(e)}
                  >
                    Concluir
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}