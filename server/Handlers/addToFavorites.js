//this component will be used inside a marker Infowindow

"use strict";
//latest version tested and working
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addToFavorites = async (request, response) => {
  //_id is the user "sub", which is also the favorite object _id (each user has one favorite object)
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

    //getting the array of items from the user`s cart
    const hasFavorites = await db.collection("favorites").findOne({ _id: _id });
    let favoritesArray = null;

    //if the user has no favorites object, one will be created
    //as soon as the user tries to add the first favorite, the object will be created
    //the user will receive a message and than be asked to add again the favorite
    if(!hasFavorites){
      const newFavorite = { _id: _id, favorites: []};
      const resultCreateFavorite = await db.collection("favorites").insertOne(newFavorite);
      return resultCreateFavorite ? response.status(201).json({status: 201, message:"User's favorites created"}) : response.status(400).json({ status: 400, message:"Bad request", data: resultCreateFavorite});
    } else if(hasFavorites){
      favoritesArray = hasFavorites.favorites;
    }

    const containsBloco = favoritesArray.some((favorite) => favorite === lowerCaseName);

    //if the favorites array doesen't contain the bloco, add it to the favorites
    if (!containsBloco) {

      //add it to the user`s favorites
      const resultAddNewItem = await db
          .collection("favorites")
          .updateOne({ _id: _id }, {$push: { favorites: lowerCaseName }});

      //testing block
      if (!resultAddNewItem.matchedCount) {
        response
          .status(404)
          .json({ status: 404, message: "Not found" });
      } else if (!resultAddNewItem.modifiedCount) {
        response.status(409).json({
          status: 409,
          message: "Modification equal to pre-existent data",
        });
      } else {
        response
          .status(200)
          .json({ status: 200, message: "Bloco added to user's favorites" });
      }
    } else if (containsBloco) {
      response
        .status(409)
        .json({ status: 409, message: "Bloco already in the user's favorites" });
    }
  } catch (err) {
    (err) => console.log(err);
    response.status(500).json({ status: 500, message: "Server error" });
  } finally {
    client.close();
  }
};

module.exports = { addToFavorites };
