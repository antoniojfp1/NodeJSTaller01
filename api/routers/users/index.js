const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/users');
const logger = require('./../../middleware/logger');

router.route('/')
    .get(controller.getAll)
    .post(logger, controller.newUser)
    .delete(logger,controller.deleteUser);

router.route('/login')
    .post(logger, controller.loginUser);    

router.route('/:id')
    .get(controller.getUser)
    .put(logger, controller.updateUser)
    .delete(logger, controller.deleteUser);

router.route('/tweets/count')
    .get(controller.totalTweetsOfUser);

router.route('/:id/tweets')
    .get(controller.listOfTweetsOfUser);

router.route('/rol')
    .post(controller.newRol);

module.exports = router;