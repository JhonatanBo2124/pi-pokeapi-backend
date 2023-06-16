const { default: axios } = require("axios");
const { Type } = require('../db')

const getTypes = async(req, res) => {
    try {
        const types = await Type.count();
        
        if(!types){ 
            await axios(' https://pokeapi.co/api/v2/type/')
            .then(({ data }) => {
                data.results.forEach(element => {
                    Type.create({name: element.name})
                });
            })
        }
        res.status(200).json(await Type.findAll());
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = getTypes;