const insta = require('instagram-web-api')
const latestTweets = require('latest-tweets')
const YouTube = require('youtube-node')
const youTube = new YouTube()
youTube.setKey('AIzaSyA7Yzedo8Ruy9gEy0E5_psHCxxlEKcSPA4')
//youtube apikey2-AIzaSyCodsP54aPwsNQkp7nGugEvO6PY9qfyU6Y
const { mySQLConn } = require('../dbConnectivity/dbConnection')

const iClient = new insta({
    username: '',
    password: ''
})


exports.getAllSports = async (req, res) => {

    await mySQLConn.query(
        'CALL allSports()',
        (err, rows) => {
            if (!err) return res.status(200).json(rows)
            return res.sendStatus(400).send(err)
        }
    );
};
exports.getAllSportslitwise = async (req, res) => {
    let lastrow = req.params.lastrow * 12;
    mySQLConn.query(`call allSportsLimitWise(${lastrow}, 12)`, (err, rows) => {
        if (!err)
            return res.status(200).json(rows)
        return res.sendStatus(400).send(err)
    });
};

exports.getAllPlayersInSport = async (req, res) => {
    await mySQLConn.query(
        `CALL allPlayersSportsWise(
            ${req.params.sport_id})`,
        (err, row) => {
            if (!err) return res.status(200).json(row);
            return res.status(400).send(err);
        }
    )
}

exports.getPlayerDetails = async (req, res) => {
    await mySQLConn.query(
        `CALL singlePlayerDetails(${req.params.player_id})`,
        (err, row) => {
            if (!err) return res.status(200).json(row)
            return res.status(400).send(err)
        }
    )
}

exports.searchAll = async (req, res) => {
    await mySQLConn.query(
        `CALL gameOrPlayerSearch('${req.params.data}')`,
        (err, row) => {
            if (!err) return res.status(200).json(row)
            return res.status(400).send(err);
        }
    )
}

exports.getInsta = async (req, res) => {
    await iClient.login()
    await iClient.getUserByUsername({ username: req.params.username })
        .then(
            val => res.send(val.edge_owner_to_timeline_media.edges),
            err => console.log(err)
        )
}

exports.getUTube = async (req, res) => {
    await youTube.search(req.params.keyword, 7, ((error, result) => {
        if (error) return console.log(error)
        return res.send(result.items, null, 7)
    })
    )
}

exports.getTwit = async (req, res) => {
    await latestTweets(`${req.params.username}`, (err, tweets) => {
        if (!err) return res.send(tweets)
        return console.log(err)
    })
}