const Tweet = require('./../../models/tweets');
const { response } = require('express');

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

const totalTweetsOfUser = (req, res) => {
    res.send("Número Total de tweets del usuario");
}

const listOfTweetsOfUser = (req, res) => {
    res.send("Lista de Tweets del usuario ");
}

const listOfLastTweets = (req, res) => {
    res.send("Lista de últimos {n} tweets");
}

const totalOfCommentsOfTweet = (req, res) => {
    res.send("Número total de comentarios de un tweet");
}

const tweetsMostCommented = (req, res) => {
    res.send("Lista de {n} tweets más comentados");
}

const usersWithMostTweets = (req, res) => {
    res.send("Lista de {n} usuarios con mayor número de tweets");
}


module.exports = {getTweets, getTweet, newTweet, newComment, deleteTweet, deleteComment, totalTweetsOfUser, listOfTweetsOfUser, listOfLastTweets, totalOfCommentsOfTweet, tweetsMostCommented, usersWithMostTweets};