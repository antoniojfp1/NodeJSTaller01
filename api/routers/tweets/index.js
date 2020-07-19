const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');

router.route('/')
    .get(controller.getTweets)
    .post(controller.newTweet);

router.route('/:id')
    .get(controller.getTweet)
    .delete(controller.deleteTweet);

router.route('/comment')
    .post(controller.newComment);

router.route('/comment/:id')
    .delete(controller.deleteComment);

module.exports = router; 