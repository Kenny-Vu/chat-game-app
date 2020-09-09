const express = require("express");
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
// const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const {
  gameState,
  addNewPlayer,
  updatePlayer,
  getPlayersInRoom,
  getPlayer,
  removePlayer,
} = require("./gameState");
// const { storeMessageData, getAllMessagesInRoom } = require("./mongo");

const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 8000;
const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server); //wraps io around server

// ------------ CHAT SOCKET SIGNALS ---------
io.on("connection", (socket) => {
  console.log("a user connected!"); // When the client connects The server is notified
  socket.on("user-joins", async ({ user, room }) => {
    addUser(socket.id, user, room);
    socket.join(room);
    //conecting to Mongo. Needs to be in async await for past messages to load first before the welcome message
    // await getAllMessagesInRoom(room).then((result) => {
    //   if (result.length > 0) {
    //     socket.emit("populate-feed", { messages: result });
    //   }
    // });

    socket.emit("welcome", { text: `Welcome ${user}!`, id: socket.id });
    socket.broadcast.to(room).emit("friend-joined", {
      text: `${user} has joined!`,
      id: socket.id,
    });
  });

  socket.on("input-send", ({ input, id }) => {
    const user = getUser(id);
    //Storing user message to Mongo
    // storeMessageData({ text: input, user: user.user, room: user.room });
    //we also want to send back the coordinates of the player that sent the message
    const friend = getPlayer(id);
    socket.to(user.room).emit("display-message", {
      text: input,
      id,
      user: user.user,
      friendX: friend.posX,
      friendY: friend.posY,
    });
  });

  // ------ GAME SOCKET SIGNALS -------
  //adding new player
  socket.on("request-existing-players", ({ room }) => {
    //TODO - ONLY SEND PLAYERS IN THE SAME ROOM
    const playersInRoom = getPlayersInRoom(room);
    socket.emit("populate-game-zone", { players: playersInRoom });
  });
  socket.on("player-joins", ({ user, room, posX, posY, spriteY, spriteX }) => {
    addNewPlayer(socket.id, user, room, posX, posY, spriteY, spriteX);
    socket.to(room).emit("new-player-joins", { players: gameState });
  });
  socket.on("move-player", ({ room, posX, posY, spriteY, spriteX }) => {
    gameState[`${socket.id}`] = {
      ...gameState[`${socket.id}`],
      posX,
      posY,
      spriteY,
      spriteX,
    };
    socket.to(room).emit("update-player-position", { players: gameState });
  });
  socket.on("player-liked", ({ liked, room }) => {
    gameState[`${socket.id}`] = {
      ...gameState[`${socket.id}`],
      liked,
    };
    socket.to(room).emit("update-player-position", { players: gameState });
  });
  socket.on("player-unLiked", ({ liked, room }) => {
    gameState[`${socket.id}`] = {
      ...gameState[`${socket.id}`],
      liked,
    };
    socket.to(room).emit("update-player-position", { players: gameState });
  });

  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    const room = user.room;
    console.log("user disconnected..."); //notify server when user leaves
    socket.broadcast.to(user.room).emit("friend-left", {
      text: `${user.user} has left the chat room`,
    });
    removeUser(socket.id);
    removePlayer(socket.id);
    socket.to(room).emit("update-player-position", { players: gameState });
  });
});

app.use(router);
// app.use(cors());

server.listen(PORT, () => {
  console.info(`listening on http://localhost:${PORT}`);
});

//----> The usual way I prefer of setting up server. Might need this as reference in case I'll need Morgan or body parser later.
// express()
//   .use(function (req, res, next) {
//     res.header(
//       "Access-Control-Allow-Methods",
//       "OPTIONS, HEAD, GET, PUT, POST, DELETE"
//     );
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   })
//   .use(morgan("tiny"))
//   .use(bodyParser.json())
//   .use(express.urlencoded({ extended: false }))
//   .use("/", express.static(__dirname + "/"));
