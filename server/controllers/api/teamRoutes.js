const router = require('express').Router();
const { Character, Team } = require('../../models');
const withAuth = require('../../utils/auth');
const { runemetrics, hiscores, miscellaneous } = require('runescape-api');
const fetch = require('node-fetch')
const questsDB = require('../../db/quests.json')

const skillNames = [
    'Attack',
    'Defence',
    'Strength',
    'Constitution',
    'Ranged',
    'Prayer',
    'Magic',
    'Cooking',
    'Woodcutting',
    'Fletching',
    'Fishing',
    'Firemaking',
    'Crafting',
    'Smithing',
    'Mining',
    'Herblore',
    'Agility',
    'Thieving',
    'Slayer',
    'Farming',
    'Runecrafting',
    'Hunter',
    'Construction',
    'Summoning',
    'Dungeoneering',
    'Divination',
    'Invention',
    'Archaeology',
    'Necromancy',
]

function profileURL(username) {
    return `https://apps.runescape.com/runemetrics/profile/profile?user=${username}&activities=20`
}

function questURL(username) {
    return `https://apps.runescape.com/runemetrics/quests?user=${username}`
}

router.post('/', async (req, res) => {
    try {
        const teamMembers = req.body.members;
        let teamData = [];
        for (let i = 0; i < teamMembers.length; i++) {
            const lowerUsername = teamMembers[i].toLowerCase();
            const dbResponse = await Character.findOne({
                where: { lowername: lowerUsername }
            })
            if (!dbResponse) {
                const response = await fetch(profileURL(lowerUsername), {
                    method: 'GET',
                    headers: {
                    }
                })
                const profile = await response.json();
                const skillIds = profile.skillvalues
                const skills = [];
                for (let i = 0; i < skillNames.length; i++) {
                    skillIds[i].name = skillNames[skillIds[i].id]
                    skills.push(skillIds[i])
                }
                profile.skillvalues = skills
                const lowerName = profile.name.toLowerCase();
                const createChar = await Character.create({ ...profile, lowername: lowerName })
                teamData.push(profile)
            } else {
                teamData.push(dbResponse)
            }

        }
        res.json(teamData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/getTopSkills', async (req, res) => {
    try {
        const teamMembers = req.body.members;
        const teamData = [];
        const topSkills = [];
        console.log(teamMembers)
        //add name of skill to skill object then pushing user data to teamData
        for (let i = 0; i < teamMembers.length; i++) {
            const lower = teamMembers[i].toLowerCase()
            const response = await Character.findOne({
                where: { lowername: lower }
            })
            console.log(response)
            const profile = response.dataValues
            const skillIds = profile.skillvalues
            const skills = [];
            for (let i = 0; i < skillNames.length; i++) {
                skillIds[i].name = skillNames[skillIds[i].id]
                skills.push(skillIds[i])
            }
            profile.skillvalues = skills
            teamData.push(profile)
        }

        // looping through all team members skills and pushing the highest xp to topSkills
        for (let x = 0; x < teamData.length; x++) {
            for (let y = 0; y < skillNames.length; y++) {
                const found = teamData[x].skillvalues.find((skill) => skill.id === y)
                found.username = teamData[x].name;

                if (!topSkills[y]) {
                    topSkills.push(found)
                }
                if (found.xp > topSkills[y].xp) {
                    topSkills[y] = found;
                }
            }
        }

        res.json(topSkills)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/allQuests', withAuth, async (req, res) => {
    try {
        const teamMembers = req.body.members;
        const teamData = [];
        const teamQuests = questsDB;

        for (let i = 0; i < teamMembers.length; i++) {
            const response = await fetch(questURL(teamMembers[i]), { method: 'GET' })
            const data = await response.json();
            const quests = data.quests
            let count = 0;
            quests.forEach((quest) => {
                const findTitle = (element) => element.title === quest.title
                const index = teamQuests.findIndex(findTitle)

                if (teamQuests[index].compStatus) {
                    teamQuests[index].compStatus.push({
                        username: teamMembers[i],
                        status: quest.status
                    })
                } else {
                    teamQuests[index].compStatus = [
                        {
                            username: teamMembers[i],
                            status: quest.status
                        }
                    ]
                }
            })
        }
        res.json(teamQuests)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/createTeam', async (req, res) => {
    try {
        const teamName = req.body.teamName;
        const response = await Team.create({ teamName })
        res.json(response)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = router;