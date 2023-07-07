"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//return all blocos from the user
//TO DO
const getUserBlocos = async (request, response) => {

  //userId
  const { _id } = request.params;

  if (!_id) {
    return response
      .status(400)
      .json({
        status: 400,
        meesage: "Missing user ID"
      });
  }

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("find-my-bloco");

    const resultGetAll = await db.collection("blocos").find({ admId: _id }).toArray();
    const usersBlocos = resultGetAll.map((bloco)=>{return bloco._id});

    resultGetAll
      ? response.status(200).json({ status: 200, data: usersBlocos})
      : response.status(404).json({ status: 404, data: "Not Found" });

  } catch (err) {
    console.error(err);
    response.status(500).json({ status: 500, data: "Server error" });
  } finally {
    client.close();
  }
};

module.exports = { getUserBlocos };
