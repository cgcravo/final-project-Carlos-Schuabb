"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Handler for getting all items
const getBlocosNames = async (request, response) => {


  const client = new MongoClient(MONGO_URI, options);

  try {

    await client.connect();

    const db = client.db("find-my-bloco");
    console.log(4)

    //not working
    // const blocosNames = await collection("blocos").find({}, { name: 1, _id: 0 }).toArray();

    const blocos = await db.collection("blocos").find().toArray();
    const blocosNames = blocos.map((bloco)=>bloco.name);
    blocosNames
      ? response.status(200).json({ status: 200, data: blocosNames })
      : response.status(404).json({ status: 404, data: "Not Found" });

  } catch (err) {
    console.log(err);
    response.status(500).json({ status: 500, error: "Internal Server Error" });
  } finally {
    client.close();
  }
};

module.exports = { getBlocosNames };
