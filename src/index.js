import "./style.css";

const urlParams = new URLSearchParams(location.search);

let roomId = urlParams.get("id");

if (!roomId) {
  roomId = Math.floor(Math.random() * 10000 + 10000);
  window.location.search = `id=${roomId}`;
}

const textArea = document.querySelector("textarea");
const wsurl = `wss://us-nyc-1.websocket.me/v3/${roomId}?api_key=OXRCUIAFhl9ip9WXwAlQIIqtakRpe58g2vkd1cKFqHFOX3YgXh36NdtydCup&notify_self`;

const socket = new WebSocket(wsurl);

socket.onopen = () => {};

socket.onmessage = (e) => {
  //   console.log(e.data);
  textArea.value = e.data;
};

textArea.addEventListener("change", (e) => {
  //   console.log(e.target.value);
  socket.send(e.target.value);
});
