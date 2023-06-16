const { default: axios } = require('axios');
const { Pokemon, Type } = require('../db')

const getPokemons = async(req, res) => {
    try {
        const { name } = req.query
        if(!name){
            
            const pokemon = await Pokemon.count()
            if(pokemon){
                const pokemons = await Pokemon.findAll();
                return res.status(200).json(pokemons);
            }
            const urls = await axios('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then(({ data }) => data.results)
            .then(data => data.map((element) => element.url))
    
            const request = urls.map(url => axios(url));
    
            Promise.all(request)
            .then(response => {
                response.forEach(async(response) => {
                    const { id, name, height, weight, abilities, sprites, stats, types } = response.data
                    console.log(name);
                    let arr = [];
                    types.forEach(element => {
                        arr.push(element.type.name)
                    });
                const newPokemon = await Pokemon.create({
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
                    source: 'data base'
                })
                arr.forEach(async(name) => {
                    const newType = await Type.findAll({
                        where: {
                            name: name
                        }
                    })
                    newPokemon.addType(newType, { through: { selfGranted: false } })
                })
                })
            })
            
            const pokemons = await Pokemon.findAll();
            return res.status(200).json(pokemons);
        } else {
            const poke = await Pokemon.findAll({
                where: {
                    name: name
                }
            })
            if(!poke) return res.status(200).json(poke);
    
            await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(({ data }) => {
                const { id, name, height, weight, abilities, sprites, stats, types } = data
                let arr = []
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
                    types: arr
                }
                return res.status(200).json(newPokemon);
            })
        }
        
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = getPokemons