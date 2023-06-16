
const { default: axios } = require('axios');
const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');

const postPokemons = async(req, res) => {
    try {
        const { id, name, image, hp, attack, defense, speed, height, weight, types } = req.body;
            const newPokemon = await Pokemon.create({
                id,
                name,
                image,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                types
            })
            console.log(types);
            types.forEach(async(type) => {
                const newType = await Type.findAll({
                    where: {
                        name: type
                    }
                })
                newPokemon.addType(newType, { through: { selfGranted: false } })
            })
            
        res.status(200).json(newPokemon)
        
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

module.exports = postPokemons