const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/users');

router.route('/')
    .get(controller.getAll)
    .post(controller.newUser);
    

router.route('/:id')
    .get(controller.getUser)
    .put(controller.updateUser)
    .delete(controller.deleteUser);

module.exports = router;