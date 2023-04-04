import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Iframe from "react-iframe";
import { GrFormClose } from "react-icons/gr";

export default function ModalChatBot({ open, onClose }) {
  if (!open) return null;

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
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed inset-0 z-10">
                <Dialog.Panel className="fixed hidden md:flex inset-y-0 right-0 z-10 bg-white dark:bg-gray-800 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                  <Iframe
                    url="https://web.powerva.microsoft.com/environments/Default-b1051c4b-3b94-41ab-9441-e73a72342fdd/bots/new_bot_3e41221dd72148d4b5c14612de784c07/webchat"
                    width="540px"
                    height="720px"
                    id=""
                    className="bg-white w-screen h-screen"
                    display="block"
                    position="relative"
                  />
                </Dialog.Panel>

                {/* MOBILE */}

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="transform overflow-hidden md:hidden bg-white  shadow-xl transition-all">
                        <div className="">
                          <button
                            type="button"
                            className="w-full flex justify-center items-center m-0 md:hidden border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={onClose}
                          >
                            <GrFormClose size={30} className="text-white" />
                          </button>
                          <Iframe
                            url="https://web.powerva.microsoft.com/environments/Default-b1051c4b-3b94-41ab-9441-e73a72342fdd/bots/new_bot_3e41221dd72148d4b5c14612de784c07/webchat"
                            width="540px"
                            height="720px"
                            id=""
                            className="bg-white w-screen h-screen"
                            display="block"
                            position="relative"
                          />
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
