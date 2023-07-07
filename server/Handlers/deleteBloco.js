"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteBloco = async (request, response) => {

  //name is the bloco's name (and _id)
  const { name } = request.body;

  if (!name) {
    return response
      .status(400)
      .json({
        status: 400,
        message:"Missing bloco name"
      });
  }

  const lowerCaseName = name.toLowerCase();

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

  const db = client.db("find-my-bloco");

  //remove the bloco from the blocos collection
  const resultDelete = await db.collection("blocos").deleteOne({_id: lowerCaseName});

  if(!resultDelete.deletedCount){
    response.status(404).json({ status: 404, message: "No bloco found" })
  } else {

    //also need to remove from every users favorites
    const resultRemoveFromFavorites = await db.collection("favorites").updateMany(
      { },
      { $pull: { favorites: lowerCaseName } }
    )
    
    if(!resultRemoveFromFavorites.matchedCount){
      response.status(404).json({ status: 404, message: "Bloco not found" })
    } else if (!resultRemoveFromFavorites.modifiedCount) {
      response.status(409).json({ status: 409, message: "Nothing changed" });
    } response.sendStatus(204)

  }
  
} catch (err) {
    console.log(err);
    response.status(500).json({ status: 500, error: "Internal Server Error" });
  } finally {
    client.close();
  }
};

module.exports = { deleteBloco };
