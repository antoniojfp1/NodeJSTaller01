const express = require('express');
const router = express.Router();
const users = require('./routers/users');
const tweets = require('./routers/tweets');
const permissions = require('./routers/permissions')
const roles = require('./routers/roles');

router.use('/users', users);
router.use('/tweets', tweets);
router.use('/permissions', permissions);
router.use('/roles', roles);


module.exports = router;