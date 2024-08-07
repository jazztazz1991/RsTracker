
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
        questsStarted: {
            type: DataTypes.INTEGER
        },
        totalSkill: {
            type: DataTypes.INTEGER
        },
        questsComplete: {
            type: DataTypes.INTEGER
        },
        questsNotStarted: {
            type: DataTypes.INTEGER
        },
        totalXp: {
            type: DataTypes.INTEGER
        },
        ranged: {
            type: DataTypes.INTEGER
        },
        melee: {
            type: DataTypes.INTEGER
        },
        combatLevel: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        rank: {
            type: DataTypes.STRING
        },
        loggedIn: {
            type: DataTypes.BOOLEAN
        },
        // Assuming activities and skillValues are stored as JSON
        activities: {
            type: DataTypes.JSON
        },
        skillValues: {
            type: DataTypes.JSON
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'team'
    }
);

module.exports = Character;