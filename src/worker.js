let socket;
const initSocket = (msg) => {
  socket = new WebSocket(msg.data);
  socket.onmessage = (ev) => {
    console.log(ev);
    self.postMessage(ev.data);
  };
};

self.addEventListener("message", (ev) => {
  console.log(ev.data);

  const msg = ev.data;

  switch (msg.type) {
    case "url":
      initSocket(msg);
      break;
    case "ws_post":
      socket.send(msg.data);
      break;
    default:
      break;
  }
});
