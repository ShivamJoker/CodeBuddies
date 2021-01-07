const urlParams = new URLSearchParams(location.search);

let roomId = urlParams.get("id");

if (!roomId) {
  roomId = Math.floor(Math.random() * 10000 + 10000);
  window.location.search = `id=${roomId}`;
}

const textArea = document.querySelector("textarea");

const worker = new Worker("worker.js");

const wsurl = `wss://us-nyc-1.websocket.me/v3/${roomId}?api_key=OXRCUIAFhl9ip9WXwAlQIIqtakRpe58g2vkd1cKFqHFOX3YgXh36NdtydCup`;

const socket = new WebSocket(wsurl);

const debounce = (func, timer = 250) => {
  let timeId = null;
  return (...args) => {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      func(...args);
    }, timer);
  };
};

socket.onopen = () => {};

const ae = new Audio("https://www.google.com/logos/fnbx/animal_sounds/cat.mp3");
socket.onmessage = (e) => {
  //   console.log(e.data);
  ae.play();
  textArea.value = e.data;
};

textArea.addEventListener(
  "input",
  debounce((e) => {
    console.log(e.target.value);
    socket.send(e.target.value);
  })
);
