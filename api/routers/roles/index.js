const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/roles');

router.route('/')
    .get(controller.getAllRoles)
    .post(controller.newRol);

router.route('/:id')
    .get(controller.getRol);

module.exports = router;