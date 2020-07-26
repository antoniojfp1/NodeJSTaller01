const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/permissions');

router.route('/')
    .get(controller.getAllPermissions)
    .post(controller.newPermission);

router.route('/:id')
    .get(controller.getPermission);

module.exports = router;