const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');
const authentication = require('./../../middleware/authentication');

router.route('/')
    .get(authentication, controller.getTweets)
    .post(authentication, controller.newTweet);

router.route('/comment')
    .post(authentication, controller.newComment)
    .delete(authentication, controller.deleteComment);

router.route('/lasts/:count')
    .get(authentication, controller.listOfLastTweets);

router.route('/top/:count')
    .get(authentication, controller.tweetsMostCommented);

router.route('/:id')
    .get(authentication, controller.getTweet)
    .delete(authentication, controller.deleteTweet);

router.route('/:id/comments/count')
    .get(authentication, controller.totalOfCommentsOfTweet);

router.route('/top/commenters/:count')
    .get(authentication, controller.usersWithMostTweets);

module.exports = router; 