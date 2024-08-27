
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
            type: DataTypes.BIGINT
        },
        questsstarted: {
            type: DataTypes.INTEGER
        },
        totalskill: {
            type: DataTypes.BIGINT
        },
        questscomplete: {
            type: DataTypes.INTEGER
        },
        questsnotstarted: {
            type: DataTypes.INTEGER
        },
        totalxp: {
            type: DataTypes.BIGINT
        },
        ranged: {
            type: DataTypes.BIGINT
        },
        melee: {
            type: DataTypes.BIGINT
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