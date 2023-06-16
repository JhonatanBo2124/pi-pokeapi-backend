const { default: axios } = require("axios")
const { Pokemon } = require('../db')

const getPokemonsByName = async(req, res) => {
    try {
        const { name } = req.query
        const poke = await Pokemon.findAll({
            where: {
                name: name
            }
        })
        if(!poke) return res.status(200).json(poke);

        await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(({ data }) => {
            const { id, name, height, weight, abilities, sprites, stats } = data
            const newPokemon = {
                id: id,
                name: name,
                image: sprites.other['official-artwork'].front_default,
                hp: stats[0].base_stat,
                attack: stats[1].base_stat,
                defense: stats[2].base_stat,
                speed: stats[3].base_stat,
                height: height,
                weight: weight
            }
            res.status(200).json(newPokemon);
        })
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = getPokemonsByName