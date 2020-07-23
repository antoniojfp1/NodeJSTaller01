const Tweet = require('./../../models/tweets');
const { response } = require('express');
const mostCommented = require('./../../functions/mostCommented');
const mostTweets = require('../../functions/mastTweets');

const getTweets = (req, res) => {
    Tweet
    .find({})
    .populate('user', 'username')
    .populate('comments.user', 'username')
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    });
}

const getTweet = (req, res) => {
    const id = req.params.id;
    Tweet
    .find({_id : id})
    .populate('user', 'username')
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    });
};

const newTweet = (req, res) => {
    const tweet = {
        content: req.body.content,
        user: req.body.user
    };
    if(tweet.content && tweet.user){
        const object = new Tweet(tweet);
        object.save()
        .then((response)=>{
            res.status(201).send(response);
        })
        .catch((err)=>{
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(500);
    }
};

const newComment = (req, res) => {
    const tweet = req.body.tweet;
    const comment = {
        comment: req.body.comment,
        user: req.body.user
    };
    Tweet.updateOne({_id :tweet}, {$addToSet: {comments : comment}})
    .then(response=>{
        res.status(202).send(response);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
};

const deleteTweet = (req, res) => {
    const id = req.params.id;
    Tweet.deleteOne({_id : id})
    .then(response=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    });
}

const deleteComment = (req, res) => {
    const tweet = req.body.tweet;    
    const comment = req.body.comment;
    console.log("tweet: "+ tweet);
    console.log("comment: "+ comment);
    Tweet.updateOne({_id: tweet}, {$pull: {comments: { _id: comment } } })
    .then(response=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    });
}

const listOfLastTweets = (req, res) => {
    console.log(`Lista de últimos ${req.params.count} tweets`);
    const count = Number(req.params.count);
    Tweet.find()
    .sort({$natural:-1}).limit(count)
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    });
}

const totalOfCommentsOfTweet = (req, res) => {
    const id = req.params.id
    console.log("id: "+id);
    Tweet.find({_id : id}, ["_id", "comments"])
    .then(response => {        
        const result = {
            id: response[0]._id,
            cantidad: response[0].comments.length
        }
        res.status(200).send(result);
    })
    .catch((err)=>{
        res.sendStatus(500);
    });
}

const tweetsMostCommented = (req, res) => {
    console.log(`Lista de ${req.params.count} tweets más comentados`);
    const count = Number(req.params.count);
    Tweet.find({},['_id', 'comments'])
    .then((response)=>{
        res.status(200).send(mostCommented(response, count));
    })
    .catch((err)=>{
        res.sendStatus(500);
    });
}

const usersWithMostTweets = (req, res) => {
    console.log(`Lista de usuarios con ${req.params.count} numero de tweets`);
    const count = Number(req.params.count);
    Tweet.find({},['user'])
    .then((response)=>{
        console.log(response);
        res.status(200).send(mostTweets(response, count));
    })
    .catch((err)=>{
        res.sendStatus(500);
    });
}


module.exports = {getTweets, getTweet, newTweet, newComment, deleteTweet, deleteComment, listOfLastTweets, totalOfCommentsOfTweet, tweetsMostCommented, usersWithMostTweets};