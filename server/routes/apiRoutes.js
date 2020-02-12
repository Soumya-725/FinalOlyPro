const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const { getAllSports, 
        getInsta, 
        getAllPlayersInSport, 
        getPlayerDetails, 
        searchAll, 
        getUTube,
        getTwit 
    } = require('../controllers/apiController');

router.get('/sports', getAllSports);
router.get('/sports/:sport_id', getAllPlayersInSport);
router.get('/player/:player_id', getPlayerDetails);
router.get('/search/:data', searchAll);
router.get('/insta/:username', getInsta);
router.get('/uTube/:userId', getUTube);
router.get('/twit/:username', getTwit);

module.exports = router;