
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model { }

Character.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        magic: {
            type: DataTypes.INTEGER
        },
        questsstarted: {
            type: DataTypes.INTEGER
        },
        totalskill: {
            type: DataTypes.INTEGER
        },
        questscomplete: {
            type: DataTypes.INTEGER
        },
        questsnotstarted: {
            type: DataTypes.INTEGER
        },
        totalxp: {
            type: DataTypes.INTEGER
        },
        ranged: {
            type: DataTypes.INTEGER
        },
        melee: {
            type: DataTypes.INTEGER
        },
        combatlevel: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        lowername: {
            type: DataTypes.STRING
        },
        rank: {
            type: DataTypes.STRING
        },
        loggedin: {
            type: DataTypes.BOOLEAN
        },
        // Assuming activities and skillValues are stored as JSON
        activities: {
            type: DataTypes.JSON
        },
        skillvalues: {
            type: DataTypes.JSON
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'character'
    }
);

module.exports = Character;