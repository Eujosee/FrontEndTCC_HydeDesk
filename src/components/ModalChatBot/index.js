import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Iframe from 'react-iframe'

export default function ModalChatBot({ open, onClose }) {
    if (!open) return null

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
                            <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white  shadow-xl transition-all">
                                    <Iframe url="https://web.powerva.microsoft.com/environments/Default-b1051c4b-3b94-41ab-9441-e73a72342fdd/bots/new_bot_3e41221dd72148d4b5c14612de784c07/webchat"
                                        width="540px"
                                        height="720px"
                                        id=""
                                        className="bg-white rounded-lg"
                                        display="block"
                                        position="relative" />
                    
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}