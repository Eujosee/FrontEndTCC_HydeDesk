import ReactDOM from "react-dom";
import { GrFormClose } from "react-icons/gr";

export default function ModalChatBot({ open, onClose }) {
  document.body.style.overflow = "auto";
	if (!open) return null;
  document.body.style.overflow = "hidden";

	const styleOptions = {
		// Add styleOptions to customize Web Chat canvas
		hideUploadButton: true,
		botAvatarInitials: "HD",
		accent: "#00809d",
		botAvatarBackgroundColor: "#FFFFFF",
		botAvatarImage:"https://learn.microsoft.com/azure/bot-service/v4sdk/media/logo_bot.svg",
		userAvatarImage: "https://avatars.githubusercontent.com/u/661465",
		bubbleBorderRadius: 10,
		bubbleFromUserBorderRadius: 10,
		sendBoxButtonShadeBorderRadius: 10,
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

	return ReactDOM.createPortal(
		<div className="fixed top-0 z-50 w-full h-screen flex flex-row overflow-x-hidden">
			<div onClick={onClose} className="md:w-full md:flex-1 bg-black bg-opacity-50" />
			<div className="w-full md:w-1/3 max-h-full overflow-y-auto">
				<div className="p-4 bg-azul-hyde flex flex-row items-center w-full sticky z-50">
					<button
						onClick={onClose}
						className="flex md:hidden justify-start absolute z-50 bg-white rounded-full p-2"
					>
						<GrFormClose size={25} />
					</button>
					<h1 className="text-white font-bold text-center w-full text-lg">
						Hydezinho
					</h1>
				</div>
				<div
					id="webchat"
					role="main"
					className="w-full h-screen text-justify tracking-normal text-md focus:outline-none z-50 relative inset-0"
				></div>
			</div>
		</div>,
		document.getElementById("portal")
	);
}
