const router = require("express").Router();

//handlers

const { addBloco } = require("../Handlers/addBloco");
const { getAllBlocos } = require("../Handlers/getAllBlocos");
const { getOneBloco } = require("../Handlers/getOneBloco");
const { addToFavorites } = require("../Handlers/addToFavorites");
const { getFavorites } = require("../Handlers/getFavorites");
const { deleteFavorite } = require("../Handlers/deleteFavorite");
const { getUserBlocos } = require("../Handlers/getUserBlocos");
const { deleteBloco } = require("../Handlers/deleteBloco");
const { getBlocosNames } = require("../Handlers/getBlocosNames");
const { shareCoordinates } = require("../Handlers/shareCoordinates");

//routes
router.post("/new-bloco", addBloco);
router.get("/blocos", getAllBlocos);
router.get("/blocos/:_id", getOneBloco);
router.get("/my-blocos/:_id", getUserBlocos);
router.patch("/delete-bloco", deleteBloco);
router.patch("/new-favorite", addToFavorites);
router.get("/favorites/:_id", getFavorites);
router.patch("/favorites", deleteFavorite);
router.get("/blocos-names", getBlocosNames);
router.patch("/share-coordinates", shareCoordinates);


module.exports = router;