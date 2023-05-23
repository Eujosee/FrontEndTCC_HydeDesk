import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import api from "../../services/api";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ModalConcluir({ open, onClose, id }) {
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  const yupSchema = yup.object().shape({
    descricao: yup.string().required("A descrição da resolução é obrigatória."),
    anexo: yup
      .mixed()
      .test("is-valid-type", "Formato de imagem não suportado", (value) => {
        if (value[0]) {
          return isValidFileType(
            value[0] && value[0].name.toLowerCase(),
            "image"
          );
        } else {
          return true;
        }
      }),
  });

  const validFileExtensions = {
    image: ["jpg", "gif", "png", "jpeg"],
  };

  function isValidFileType(fileName, fileType) {
    return (
      fileName &&
      validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  if (!open) return null;

  async function handleConcluir(data) {
    setLoading(true);

    if (imagem) {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      let formData = new FormData();
      formData.append("anexo", imagem);
      formData.append("descricao", data.descricao);

      try {
        await api.put("/chamados/concluir/" + id, formData, config);

        setLoading(false);
        window.location.reload();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    try {
      await api.put("/chamados/concluir/" + id, data);

      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
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
                    Antes de concluir, nos informe os detalhes do serviço e,
                    caso necessário, envie um anexo.
                  </p>
                </div>
                <form onSubmit={handleSubmit(handleConcluir)}>
                  <div className="mt-5">
                    <label className="text-md font-medium leading-6 text-gray-900 dark:text-gray-100">
                      Detalhes
                    </label>
                    <input
                      type="text"
                      className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-transparent dark:text-gray-100"
                      placeholder="Detalhes"
                      {...register("descricao", { required: true })}
                    />
                    {errors.descricao && (
                      <p className="text-red-500 pt-2 w-full">
                        {errors.descricao.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-5">
                    <label className="text-md font-medium leading-6 text-gray-900 dark:text-gray-100">
                      Anexo
                    </label>
                    <input
                      type="file"
                      className="focus:outline-none focus:border-azul-hyde placeholder:text-sm border-b-2 w-full p-2 dark:text-gray-100"
                      accept=".png, .jpg, .jpeg"
                      {...register("anexo", {
                        onChange: (e) => setImagem(e.target.files[0]),
                      })}
                    />
                    {imagem && (
                      <img
                        className="w-full h-40"
                        src={URL.createObjectURL(imagem)}
                        alt="seu anexo"
                      />
                    )}
                  </div>

                  <div className="mt-4 space-x-5">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      disabled={loading}
                    >
                      {loading ? <>Processando...</> : <>Concluir</>}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setImagem(null);
                        reset();
                        onClose();
                      }}
                      disable={loading}
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
  );
}
