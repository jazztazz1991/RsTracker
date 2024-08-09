const User = require('./User');
const Character = require('./Character');
const Team = require('./Team');
const Requests = require('./Requests');
const TeamMember = require('./TeamMember');

User.hasMany(Character, {
    foreignKey: 'user_id'
});

User.hasMany(Team, {
    foreignKey: 'user_id'
});

Team.hasMany(Character, {
    foreignKey: 'team_id'
});

Team.hasMany(Requests, {
    foreignKey: 'team_id'
})

Team.hasMany(User, {
    foreignKey: 'team_id'
})

module.exports = {
    User,
    Team,
    Character,
    Requests,
    TeamMember
}