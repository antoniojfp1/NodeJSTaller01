const express = require('express');
const router = express.Router();
const logger = require('./middleware/logger')
const users = require('./routers/users');
const tweets = require('./routers/tweets')

router.use(logger);
router.use('/users', users);
//router.use('/tweets', tweets);

module.exports = router;