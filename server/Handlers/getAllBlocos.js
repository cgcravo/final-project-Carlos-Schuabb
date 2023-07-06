"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getAllBlocos = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("find-my-bloco");

    const resultGetAll = await db.collection("blocos").find().toArray();

    resultGetAll
      ? response.status(200).json({ status: 200, data: resultGetAll})
      : response.status(404).json({ status: 404, data: "Not Found" });

  } catch (err) {
    console.error(err);
    response.status(500).json({ status: 500, data: "Server error" });
  } finally {
    client.close();
  }
};

module.exports = { getAllBlocos };
