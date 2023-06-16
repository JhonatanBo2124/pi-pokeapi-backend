
const { default: axios } = require('axios');
const { Pokemon } = require('../db');

const getPokemonsById = async(req, res) => {
    try {
        const { id } = req.params

        const poke = await Pokemon.findAll({
            where: {
                id: id
            }
        })
        if(poke.length) return res.status(200).json(poke[0])

        await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(({ data }) => {
            const { id, name, height, weight, abilities, sprites, stats, types } = data
            let arr = [];
            types.forEach(element => {
                arr.push(element.type.name)
            });
            const newPokemon = {
                id: id,
                name: name,
                image: sprites.other['official-artwork'].front_default,
                hp: stats[0].base_stat,
                attack: stats[1].base_stat,
                defense: stats[2].base_stat,
                speed: stats[3].base_stat,
                height: height,
                weight: weight,
                types: arr,
                source: 'api'
            }
        res.status(200).json(newPokemon)
    })
        
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

module.exports = getPokemonsById