const User = require('./User');
const Character = require('./Character');
const Team = require('./Team');
const Requests = require('./Requests');
const TeamMember = require('./TeamMember');

User.hasMany(Character, {
    foreignKey: 'character_id'
});

User.hasMany(Team, {
    foreignKey: 'team_id'
});

Team.hasMany(Character, {
    foreignKey: 'character_id'
});

Team.hasMany(Requests, {
    foreignKey: 'request_id'
})

Team.hasMany(TeamMember, {
    foreignKey: 'teammember_id'
})

Team.belongsTo(User, {
    foreignKey: 'team_id'
})

Requests.belongsTo(Team, {
    foreignKey: 'request_id'
})

TeamMember.belongsTo(Team, {
    foreignKey: 'teammember_id'
})

Character.belongsTo(User, {
    foreignKey: 'character_id'
});

Character.belongsTo(Team, {
    foreignKey: 'character_id'
})

module.exports = {
    User,
    Team,
    Character,
    Requests,
    TeamMember
}