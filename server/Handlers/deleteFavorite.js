"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteFavorite = async (request, response) => {

  //_id is the user "sub", which is also the favorite object _id
  //name is the bloco's name (and _id)
  const { _id, name } = request.body;

  if (!_id || !name) {
    return response
      .status(400)
      .json({
        status: 400,
        data: {
          name: name || "Missing name",
          _id: _id || "Missing user ID",
        },
      });
  }

  const lowerCaseName = name.toLowerCase();

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("find-my-bloco");

    const resultUserFavoritesObject = await db.collection("favorites").findOne({ _id: _id });

    if (!resultUserFavoritesObject) {
      return response.status(404).json({ status: 404, message: "User's favorite not found" })
    }

    const resultUpdate = await db.collection("favorites").updateOne({ _id: _id }, {
      $pull: {
          favorites: lowerCaseName
      }
  });

  if(!resultUpdate.matchedCount){
    response.status(404).json({ status: 404, message: "User not found" })
  } else if (!resultUpdate.modifiedCount) {
    response.status(409).json({ status: 409, message: "Nothing changed" });
  } else { response.status(200).json({status:200, message: "Favorites successfully modified"}) };
  
} catch (err) {
    console.log(err);
    response.status(500).json({ status: 500, error: "Internal Server Error" });
  } finally {
    client.close();
  }
};

module.exports = { deleteFavorite };
