const router = require('express').Router();
const { Character, User } = require('../../models');
const withAuth = require('../../utils/auth');
const { runemetrics, hiscores, miscellaneous } = require('runescape-api');

const fetch = require('node-fetch');
const { getQuests } = require('runescape-api/runescape/runemetrics');

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
router.get('/profile/:username', withAuth, async (req, res) => {
    console.log('profile route hit')
    try {
        const lowerUsername = req.params.username.toLowerCase();
        console.log(lowerUsername)
        const dbResponse = await Character.findOne({
            where: { lowername: lowerUsername }
        })
        console.log(dbResponse)
        if (!dbResponse || dbResponse === null) {
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

            const qData = await getQuests(lowerUsername);
            const createChar = await Character.create({ ...profile, lowername: lowerName, quests: qData })
            console.log(createChar)
            res.status(200).json(profile)
        } else {
            res.status(200).json(dbResponse)
        }

    } catch (err) {
        res.status(400).json(err);
    }
});

//quest routes
router.post('/allQuests', async (req, res) => {
    try {
        const response = await fetch(questURL(req.body.username), { method: 'GET' })
        const data = await response.json();
        const quests = data.quests

        res.json(quests)
    } catch (err) {
        res.status(400).json(err);
    }
});
router.post('/incompleteQuests', async (req, res) => {
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
router.post('/completedQuests', async (req, res) => {
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
router.post('/allSkills', async (req, res) => {
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
router.post('/skill/:skill', async (req, res) => {
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

router.post('/avatar', async (req, res) => {
    try {
        miscellaneous.getAvatar(req.body.username).then((data) => {
            res.json(data)
        })
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/addAccount', async (req, res) => {
    try {
        console.log('add account route hit')
        console.log(req.body)
        const userData = await User.findOne({
            where: { username: req.body.username },
        });
        console.log(userData)
        const lowerUsername = req.body.characterName.toLowerCase();
        const response = await Character.update(
            {
                user_id: userData.id
            },
            {
                where: { lowername: lowerUsername }
            }
        );
        if (response[0] === 0) {
            const charResponse = await fetch(profileURL(lowerUsername), {
                method: 'GET',
                headers: {
                }
            })
            const profile = await charResponse.json();
            if (profile.error) {
                res.status(404).json({ message: 'Account not found' })
            } else {
                console.log(profile)
                const skillIds = profile.skillvalues
                const skills = [];
                for (let i = 0; i < skillNames.length; i++) {
                    console.log(skillIds)
                    skillIds[i].name = skillNames[skillIds[i].id]
                    skills.push(skillIds[i])
                }
                profile.skillvalues = skills
                const lowerName = profile.name.toLowerCase();

                const quests = await getQuests(lowerUsername);
                console.log(quests)
                const createChar = await Character.create({ ...profile, lowername: lowerName, quests: quests })
                const updateResponse = await Character.update(
                    {
                        user_id: userData.id
                    },
                    {
                        where: { lowername: lowerUsername }
                    }
                );

                return res.json({ updateResponse, message: 'Account added' })
            }
        } else {
            res.json({ message: 'Account added' })
        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.get('/:username', withAuth, async (req, res) => {
    console.log('get characters route hit')
    try {
        console.log(req.params.username)
        const userData = await User.findOne({
            where: { username: req.params.username },
        });
        console.log(userData)
        const dbResponse = await Character.findAll({
            where: { user_id: userData.dataValues.id }
        })
        console.log(dbResponse)
        if (!dbResponse) {
            res.status(404).json({ message: 'No characters found' })
        } else {
            res.json(dbResponse)
        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});
module.exports = router;