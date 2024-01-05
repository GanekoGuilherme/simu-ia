const WebSocket = require("ws");

try {
  const socket = new WebSocket(
    "wss://btreedevs.site:2413/?csfr=886b854d-926f-412f-bfe6-17e8e7d29bbe&userid=64bbd6c1f8cc8a0151514bf4"
  );

  socket.on("open", () => {
    console.log("Conectado ao servidor WebSocket externo");

    // Enviando uma mensagem para o servidor assim que a conexão é estabelecida
    socket.send("Olá, servidor!");
  });
} catch (error) {
  console.log(error);
}

// socket.send({
//   idConversa: "658322f14cad3078c1ba45c7",
//   idSender: "02dea97f-38df-4b60-8d45-84709fd5cb22",
//   texto: "asd",
// });
