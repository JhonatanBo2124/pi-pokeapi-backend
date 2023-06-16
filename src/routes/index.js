const express = require('express')
const getPokemons = require('../controllers/getPokemons')
const getPokemonsById = require('../controllers/getPokemonsById');
const postPokemons = require('../controllers/postPokemons');
const getTypes = require('../controllers/getTypes');
const getPokemonsByName = require('../controllers/getPokemonByName');
const router = express.Router()

router.get('/pokemons', getPokemons);
router.get('/pokemons/:id', getPokemonsById);
router.post('/pokemons/create', postPokemons);
router.get('/types', getTypes);

module.exports = router