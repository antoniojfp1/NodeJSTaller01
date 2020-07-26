const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');
const authentication = require('./../../middleware/authentication');

router.route('/')
    .get(controller.getTweets)
    .post(authentication, controller.newTweet);

router.route('/comment')
    .post(controller.newComment)
    .delete(controller.deleteComment);

router.route('/lasts/:count')
    .get(controller.listOfLastTweets);

router.route('/top/:count')
    .get(controller.tweetsMostCommented);

router.route('/:id')
    .get(controller.getTweet)
    .delete(controller.deleteTweet);

router.route('/:id/comments/count')
    .get(controller.totalOfCommentsOfTweet);

    router.route('/top/commenters/:count')
    .get(controller.usersWithMostTweets);

module.exports = router; 