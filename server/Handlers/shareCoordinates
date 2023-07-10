"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const shareCoordinates = async (request, response) => {

  //dont't need the user id since it was verifyed before to build the my-blocos list
  //name is the bloco name (and id)
  //lat and lng are the new coordinates
  const { name, lat, lng} = request.body;

  if (!name) {
    return response
      .status(400)
      .json({ status: 400, message: "Missing bloco name" });
  }
  if (!lat) {
    return response
      .status(400)
      .json({ status: 400, message: "Missing latitude" });
  }
  if (!lng) {
    return response
      .status(400)
      .json({ status: 400, message: "Missing longitude" });
  }

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("find-my-bloco");

    const query = { _id: name };

    const updateDocument = {
      $set: { lat: lat, lng: lng },
    };

    const resultUpdateCoordinates = await db
      .collection("blocos")
      .updateMany(query, updateDocument);

    //testing block
    if (!resultUpdateCoordinates.matchedCount) {
      response
        .status(404)
        .json({ status: 404, message: "No bloco found" });
    } else if (!resultUpdateCoordinates.modifiedCount) {
      response.status(409).json({
        status: 409,
        message: "Modification equal to pre-existent data",
      });
    } else {
      response
        .status(200)
        .json({ status: 200, message: "Coordinates successfully shared!"});
    }

  } catch (err) {
    (err) => console.log(err);
    response.status(500).json({ status: 500, message: "Server error" });
  } finally {
    client.close();
  }
};

module.exports = { shareCoordinates };
