
"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getFavorites = async (request, response) => {

  //the user id
  const { _id } = request.params;

  if (!_id) {
    return response.status(400).json({
      status: 400,
      messagee: 
        "Missing ID"
    });
  }

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("find-my-bloco");

    const resultGetOne = await db
      .collection("favorites")
      .findOne({ _id: _id.toLowerCase() });

    const favoritesArray = resultGetOne.favorites

    resultGetOne
      ? response.status(200).json({ status: 200, data: favoritesArray })
      : response.status(404).json({ status: 404, data: "User favorites not Found" });

  } catch (err) {
    console.error(err);
    response.status(500).json({ status: 500, data: "Server error" });
  } finally {
    client.close();
  }
};

module.exports = { getFavorites };
