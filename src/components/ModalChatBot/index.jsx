import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Iframe from "react-iframe";
import { GrFormClose } from "react-icons/gr";

export default function ModalChatBot({ open, onClose }) {
  if (!open) return null;
  const styleOptions = {
    // Add styleOptions to customize Web Chat canvas
    hideUploadButton: true,
  };

  var theURL =
    "https://defaultb1051c4b3b9441ab9441e73a72342f.dd.environment.api.powerplatform.com/powervirtualagents/botsbyschema/new_bot_3e41221dd72148d4b5c14612de784c07/directline/token?api-version=2022-03-01-preview";

  var environmentEndPoint = theURL.slice(
    0,
    theURL.indexOf("/powervirtualagents")
  );
  var apiVersion = theURL
    .slice(theURL.indexOf("api-version"))
    .split("=")[1];
  var regionalChannelSettingsURL = `${environmentEndPoint}/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`;

  var directline;
  fetch(regionalChannelSettingsURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      directline = data.channelUrlsById.directline;
    })
    .catch((err) => console.error("An error occurred: " + err));

  const store = window.WebChat.createStore(
    {},
    ({ dispatch }) =>
    
      (next) =>
      (action) => {
        console.log('oi')
        if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
          dispatch({
            meta: {
              method: "keyboard",
            },
            payload: {
              activity: {
                channelData: {
                  postBack: true,
                },
                name: "startConversation",
                type: "event",
              },
            },
            type: "DIRECT_LINE/POST_ACTIVITY",
          });
        }
        return next(action);
      }
  );

  fetch(theURL)
    .then((response) => response.json())
    .then((conversationInfo) => {
      window.WebChat.renderWebChat(
        {
          directLine: window.WebChat.createDirectLine({
            domain: `${directline}v3/directline`,
            token: conversationInfo.token,
          }),
          store: store,
          styleOptions,
        },
        document.getElementById("webchat")
      );
    })
    .catch((err) => console.error("An error occurred: " + err));

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                <Dialog.Panel  className="fixed hidden md:flex inset-y-0 right-0 z-10 bg-white dark:bg-gray-800 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
                   <div id="webchat" role="main"></div>
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