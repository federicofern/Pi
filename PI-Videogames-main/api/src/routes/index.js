const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {createGenreDB, allVG, searchVGid, createGame, allPlatforms}= require('../controllers/findAll.controllers')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/genres", createGenreDB);
router.get("/videogames", allVG);
router.get("/videogame/:idVideogame",searchVGid)
router.post("/videogame", createGame)
router.get('/platforms', allPlatforms)

module.exports = router;
