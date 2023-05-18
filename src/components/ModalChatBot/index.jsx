import ReactDOM from "react-dom";
import { GrFormClose } from "react-icons/gr";
import secureLocalStorage from "react-secure-storage";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ModalChatBot({ open, onClose }) {
  document.body.style.overflow = "auto";
  if (!open) return null;
  document.body.style.overflow = "hidden"; 

  const [foto, setFoto] = useState("");
  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  const type = JSON.parse(secureLocalStorage.getItem("Tipo"));
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      if (id) {
        switch (type) {
          case "tecnicos":
            try {
              const { data } = await api.get("/tecnicos/" + id);
              setFoto(data.foto);
            } catch (error) {

            }
            break
            case "empresas":
              try {
                const { data } = await api.get("/empresas/" + id);
                setFoto(data.foto);
              } catch (error) {
                
              }
              break
            case "funcionarios":
              try {
                const { data } = await api.get("/funcionarios/" + id);
                setFoto(data.foto);
              } catch (error) {
                
              }
              break
          default:
            break;
        }
      }
    })();
  }, [id,type]);

  useEffect(() => {
    function carregarScript() {
      var script = document.createElement('script');
      script.src = 'https://cdn.botframework.com/botframework-webchat/latest/webchat.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setScriptLoaded(true)
      }
      document.body.appendChild(script);
    }
    carregarScript()
  }, [])

  useEffect(() => {
    function criarWebChat(){
      const styleOptions = {
        // Add styleOptions to customize Web Chat canvas
        hideUploadButton: true,
        botAvatarInitials: "HD",
        accent: "#00809d",
        botAvatarImage:
          "https://learn.microsoft.com/azure/bot-service/v4sdk/media/logo_bot.svg",
        userAvatarImage: !foto ? "https://learn.microsoft.com/azure/bot-service/v4sdk/media/logo_bot.svg" : foto,
        userAvatarInitials: "Eu",
        bubbleBorderRadius: 10,
        bubbleFromUserBorderRadius: 10,
      suggestedActionBorderRadius: 10,
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

    }
    scriptLoaded && criarWebChat()
  }, [scriptLoaded])

  

  return ReactDOM.createPortal(
    <div className="fixed top-0 z-50 w-full h-screen  overflow-x-hidden">
		<div onClick={onClose} className="w-full h-full absolute bg-black bg-opacity-25"></div>
      <div className="absolute w-full h-full md:h-fit md:bottom-10 md:right-10 md:w-1/5 bg-white rounded-t-xl">
        <div className="p-4 bg-azul-hyde flex flex-row items-center w-full sticky md:rounded-t-md">
          <button
            onClick={onClose}
            className="flex md:hidden justify-start absolute bg-white rounded-full p-1"
          >
            <GrFormClose size={25} />
          </button>
          <h1 className="text-white font-bold text-center w-full text-lg">
            Hydezinho
          </h1>
        </div>
        <div className="w-full h-full md:h-[35em] overflow-y-auto">
          {scriptLoaded && (
            <div
              id="webchat"
              role="main"
              className="w-full h-full text-justify text-sm"
            ></div>

          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
