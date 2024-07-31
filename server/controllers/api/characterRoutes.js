const router = require('express').Router();
const { Character } = require('../../models');
const withAuth = require('../../utils/auth');
const { runemetrics, hiscores, miscellaneous } = require('runescape-api');
const fetch = require('node-fetch')

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

// profile route
router.get('/profile/:username', async (req, res) => {
    try {
        const response = await fetch(profileURL(req.params.username), {
            method: 'GET',
            headers: {
            }
        })
        const profile = await response.json();
        console.log(profile)
        res.json(profile)
    } catch (err) {
        res.status(400).json(err);
    }
});

//quest routes
router.get('/allQuests', async (req, res) => {
    try {
        const response = await fetch(questURL(req.body.username), { method: 'GET' })
        const data = await response.json();
        const quests = data.quests

        res.json(quests)
    } catch (err) {
        res.status(400).json(err);
    }
});
router.get('/incompleteQuests', async (req, res) => {
    try {
        const response = await fetch(questURL(req.body.username), { method: 'GET' })
        const data = await response.json();
        const quests = [];
        console.log(data)
        data.quests.forEach(quest => {
            if (quest.status !== 'COMPLETED') {
                quests.push(quest);
            }
        })
        res.json(quests)

    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});
router.get('/completedQuests', async (req, res) => {
    try {
        const response = await fetch(questURL(req.body.username), { method: 'GET' })
        const data = await response.json();
        const quests = [];
        console.log(data)
        data.quests.forEach(quest => {
            if (quest.status === 'COMPLETED') {
                quests.push(quest);
            }
        })
        res.json(quests)
    } catch (err) {
        res.status(400).json(err);
    }
});

// skill routes
router.get('/allSkills', async (req, res) => {
    try {
        const response = await fetch(profileURL(req.body.username), { method: 'GET' })
        const profile = await response.json();
        const skillIds = profile.skillvalues
        const skills = [];
        for (let i = 0; i < skillNames.length; i++) {
            skillIds[i].name = skillNames[skillIds[i].id]
            skills.push(skillIds[i])
        }
        res.json(skills)
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});
router.get('/skill/:skill', async (req, res) => {
    try {
        const response = await fetch(profileURL(req.body.username), { method: 'GET' })
        const profile = await response.json();
        const skillIds = profile.skillvalues;
        let getId;
        let skill;

        // loop to get skillId based off Name
        for (let i = 0; i < skillNames.length; i++) {
            if (req.params.skill === skillNames[i]) {
                getId = i;
            }
        }
        // loop to set skill based off id
        for (let x = 0; x < skillIds.length; x++) {
            if (getId === skillIds[x].id) {
                skill = skillIds[x]
            }
        }
        // add name to skill
        skill.name = skillNames[getId]


        res.json(skill);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.get('/avatar', async (req, res) => {
    try {
        miscellaneous.getAvatar(req.body.username).then((data) => {
            res.json(data)
        })
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


module.exports = router;