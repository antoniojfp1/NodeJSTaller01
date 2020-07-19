const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');

router.route('/')
    .get(controller.getTweets)
    .post(controller.newTweet);

router.route('/comment')
    .post(controller.newComment)
    .delete(controller.deleteComment);

router.route('/lasts/:count')
    .get(controller.listOfLastTweets);

router.route('/:id')
    .get(controller.getTweet)
    .delete(controller.deleteTweet);

router.route('/:id/comments/count')
    .get(controller.totalOfCommentsOfTweet);

module.exports = router; 