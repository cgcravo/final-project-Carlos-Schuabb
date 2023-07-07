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
  const { _id, name } = request.body;
  console.log(_id)

  if (!_id || !name) {
    return response
      .status(400)
      .json({
        status: 400,
        data:{_id: _id || "Missing user ID", name: name || "Missing bloco name"}
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
    
    if(!resultRemoveFromFavorites.acknowledged){
      response.status(404).json({ status: 404, message: "Update favorites didn't work" })
    } else  {//To change the userBlocos state and rerender the page
      const resultGetAll = await db.collection("blocos").find({ admId: _id }).toArray();
      console.log("resultGetAll:", resultGetAll)
      const usersBlocos = resultGetAll.map((bloco)=>{return bloco._id});
      console.log("usersBlocos:", usersBlocos)
      resultGetAll
      ? response.status(200).json({ status: 200, data: usersBlocos})
      : response.status(404).json({ status: 404, data: "Not Found" });
    } 
    

  }
  
} catch (err) {
    console.log(err);
    response.status(500).json({ status: 500, error: "Internal Server Error" });
  } finally {
    client.close();
  }
};

module.exports = { deleteBloco };
