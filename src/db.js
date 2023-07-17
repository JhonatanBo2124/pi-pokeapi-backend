require('dotenv').config(); 
const { Sequelize } = require('sequelize')
const PokemonModel = require('./models/pokemon')
const TypeModel = require('./models/type')
const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_URL} = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`, {logging: false});
const sequelize = new Sequelize(DB_URL, {logging: false});

PokemonModel(sequelize);
TypeModel(sequelize);

const { Pokemon, Type } = sequelize.models
Pokemon.belongsToMany(Type, {through: 'Pokemon_type', timestamps: false})
Type.belongsToMany(Pokemon, {through: 'Pokemon_type', timestamps: false})

console.log(sequelize.models);

module.exports = {
    sequelize,
    ...sequelize.models
}