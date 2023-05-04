import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { GrFormClose } from "react-icons/gr";
import './index.css'

export default function ModalChatBot({ open, onClose }) {
  if (!open) return null;
  const styleOptions = {
    // Add styleOptions to customize Web Chat canvas
    hideUploadButton: true,
    botAvatarInitials: 'HD',
            accent: '#00809d',
            botAvatarBackgroundColor: "#FFFFFF",
            botAvatarImage: 'https://learn.microsoft.com/azure/bot-service/v4sdk/media/logo_bot.svg',
            userAvatarImage: 'https://avatars.githubusercontent.com/u/661465'
  };

  var theURL =
    "https://defaultb1051c4b3b9441ab9441e73a72342f.dd.environment.api.powerplatform.com/powervirtualagents/botsbyschema/new_bot_3e41221dd72148d4b5c14612de784c07/directline/token?api-version=2022-03-01-preview";

  var environmentEndPoint = theURL.slice(
    0,
    theURL.indexOf("/powervirtualagents")
  );
  var apiVersion = theURL.slice(theURL.indexOf("api-version")).split("=")[1];
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
                <Dialog.Panel className="fixed flex flex-col inset-y-0 right-0 z-10 bg-white dark:bg-gray-800 max-w-full md:max-w-md sm:ring-1 sm:ring-gray-900/10 ">
                  <div className="p-5 bg-azul-hyde flex flex-row items-center relative">
                    <button onClick={onClose} className="flex md:hidden justify-start absolute bg-white rounded-full p-2">
                      <GrFormClose size={25}/>
                    </button>
                    <h1 className="text-white font-bold text-center w-full text-lg">Hydezinho</h1>
                  </div>
                  <div id="webchat" role="main" className="w-full h-full text-justify tracking-normal text-md focus:outline-none"></div>
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
