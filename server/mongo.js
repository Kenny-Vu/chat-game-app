const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const storeMessageData = async (data) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("chatGameDB");
  try {
    const r = await db.collection("chat-data").insertOne(data);
    assert.equal(1, r.insertedCount);
  } catch (err) {
    console.log(err);
  }
  client.close();

  return console.log("closed");
};

const getAllMessagesInRoom = async (room) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("chatGameDB");
  try {
    const response = await db.collection("chat-data").find().toArray();
    const currentRoomMessages = await response.filter(
      (message) => message.room === room
    );
    client.close();
    return currentRoomMessages;
  } catch (err) {
    console.log(err);
  }
  client.close();
};

module.exports = { storeMessageData, getAllMessagesInRoom };
