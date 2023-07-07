"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getOneBloco = async (request, response) => {

  //the bloco id is it's own name
  const { _id } = request.params;
  console.log(_id)

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
      .collection("blocos")
      .findOne({ _id: _id.toLowerCase() });

    console.log(resultGetOne)
    
    resultGetOne
      ? response.status(200).json({ status: 200, data: resultGetOne })
      : response.status(404).json({ status: 404, data: "Not Found" });

  } catch (err) {
    console.error(err);
    response.status(500).json({ status: 500, data: "Server error" });
  } finally {
    client.close();
  }
};

module.exports = { getOneBloco };
