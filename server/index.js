const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const { storeMessageData, getAllMessagesInRoom } = require("./mongo");

const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 8000;
const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server); //wraps io around server

//MONGO <-------------->
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//<-------------->

io.on("connection", (socket) => {
  console.log("a user connected!"); // When the client connects The server is notified
  socket.on("user-joins", async ({ user, room }) => {
    addUser(socket.id, user, room);
    socket.join(room);
    //conecting to Mongo
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("chatGameDB");
    try {
      const result = await db.collection("chat-data").find().toArray();
      const roomMessages = result.filter((message) => message.room === room); //retrieving room's chat history
      socket.emit("populate-feed", { messages: roomMessages }); //sending chat history to client
    } catch (err) {
      console.log(err);
    }
    client.close();

    socket.emit("welcome", { text: `Welcome ${user}!`, id: socket.id });
    socket.broadcast.to(room).emit("friend-joined", {
      text: `${user} has joined!`,
      id: socket.id,
    });
  });
  socket.on("input-send", ({ input, id }) => {
    const user = getUser(id);
    //each socket automatically generates a random unique id
    //Storing user message to Mongo
    storeMessageData({ text: input, user: user.user, room: user.room });

    socket
      .to(user.room)
      .emit("display-message", { text: input, id, user: user.user });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected..."); //notify server when user leaves
    //luckily, socket.id will always be the socket that is emitting the signal. In this case, the user that left
    const user = getUser(socket.id);
    socket.broadcast.to(user.room).emit("friend-left", {
      text: `${user.user} has left the chat room`,
    });
    removeUser(socket.id);
  });
});

app.use(router);

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
