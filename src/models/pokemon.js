const { DataTypes } = require("sequelize")

const Pokemon = (sequelize) => {
    sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        types: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        source: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    })
}
module.exports = Pokemon;