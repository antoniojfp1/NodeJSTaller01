const express = require('express');
const router = express.Router();
const users = require('./routers/users');
const tweets = require('./routers/tweets');

router.use('/users', users);
router.use('/tweets', tweets);

module.exports = router;