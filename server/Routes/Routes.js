const router = require("express").Router();

//handlers

const { addBloco } = require("../Handlers/addBloco");
const { getAllBlocos } = require("../Handlers/getAllBlocos");
const { getOneBloco } = require("../Handlers/getOneBloco");
const { addToFavorites } = require("../Handlers/addToFavorites");
const { getFavorites } = require("../Handlers/getFavorites");
const { deleteFavorite } = require("../Handlers/deleteFavorite");

//routes
router.post("/new-bloco", addBloco);
router.get("/blocos", getAllBlocos);
router.get("/blocos/:_id", getOneBloco);
router.patch("/new-favorite", addToFavorites);
router.get("/favorites", getFavorites);
router.patch("/favorites/:_id", deleteFavorite);


module.exports = router;