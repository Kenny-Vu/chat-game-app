const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

require("dotenv").config();
// const { REACT_APP_MONGO_URI } = process.env;
const REACT_APP_MONGO_URI =
  "mongodb+srv://client:12345@chatgame-cluster.fvrub.gcp.mongodb.net/chatGameDB?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const storeMessageData = async (data) => {
  const client = await MongoClient(REACT_APP_MONGO_URI, options);
  await client.connect();
  const db = client.db("chatGameDB");
  try {
    const r = await db.collection("chat-data").insertOne(data);
    //Works but warning messages appear in the log. Even the official node solution doesn't solve this.
    assert.equal(1, r.insertedCount);
  } catch (err) {
    console.log(err);
  }
  client.close();

  return console.log("closed");
};

const getAllMessagesInRoom = async () => {
  try {
    const client = await MongoClient(REACT_APP_MONGO_URI, options);
    await client.connect();
    const db = client.db("chatGameDB");

    const response = await db.collection("chat-data").find().toArray();
    console.log(response);

    client.close();
  } catch (err) {
    console.log(err);
  }
};
getAllMessagesInRoom();

module.exports = { storeMessageData, getAllMessagesInRoom };
