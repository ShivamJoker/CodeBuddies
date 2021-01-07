const urlParams = new URLSearchParams(location.search);

let roomId = urlParams.get("id");

if (!roomId) {
  roomId = Math.floor(Math.random() * 10000 + 10000);
  window.location.search = `id=${roomId}`;
}

const textArea = document.querySelector("textarea");

const worker = new Worker("worker.js");

const wsurl = `wss://us-nyc-1.websocket.me/v3/${roomId}?api_key=OXRCUIAFhl9ip9WXwAlQIIqtakRpe58g2vkd1cKFqHFOX3YgXh36NdtydCup`;

worker.postMessage({ type: "url", data: wsurl });

worker.onmessage = (ev) => {
  textArea.value = ev.data;
  const ae = new Audio(
    "https://www.google.com/logos/fnbx/animal_sounds/cat.mp3"
  );
  ae.play();
};

textArea.addEventListener("keyup", (e) => {
  //   console.log(e.target.value);
  worker.postMessage({ type: "ws_post", data: e.target.value });
});
