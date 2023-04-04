import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import api from "../../services/api";

export default function ModalFuncionario({
  open,
  onClose,
  dataFunc,
  toast,
  navigate,
}) {
  if (!open) return null;

  async function ativarFuncionario() {
    try {
      const response = await api.put(
        `/funcionarios/ativar/${dataFunc.id_funcionario}`
      );

      toast.success(response.data.message);
    } catch (error) {
      throw new Error("Não foi possível ativar funcionário.");
    }
  }

  async function desativarFuncionario() {
    try {
      const response = await api.put(
        `/funcionarios/desativar/${dataFunc.id_funcionario}`
      );

      toast.success(response.data.message);
    } catch (error) {
      throw new Error("Não foi possível desativar funcionário.");
    }
  }

  async function handleAction() {
    try {
      if (dataFunc.status_funcionario === "Ativo") {
        await desativarFuncionario();
      } else {
        await ativarFuncionario();
      }
    } catch (error) {
      toast.error(error.message);
    }
    onClose();
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
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  {dataFunc.status_funcionario === "Ativo"
                    ? "Desativar funcionário"
                    : "Ativar funcionário"}
                </Dialog.Title>
                <div className="mt-2">
                  {dataFunc.status_funcionario === "Ativo" ? (
                    <p className="text-sm text-gray-500 dark:text-gray-100">
                      Tem certeza que deseja desativar a conta de{" "}
                      {dataFunc.nome_funcionario}, tornando-o inativo?
                    </p>
                  ) : (
                    <p className="text-sm text-gray-50 dark:text-gray-100">
                      Tem certeza que deseja ativar a conta de{" "}
                      {dataFunc.nome_funcionario}, tornando-o ativo?
                    </p>
                  )}
                </div>

                <div className="mt-4 space-x-5">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleAction}
                  >
                    {dataFunc.status_funcionario === "Ativo"
                      ? "Desativar"
                      : "Ativar"}
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
