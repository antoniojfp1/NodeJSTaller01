const Tweet = require('./../../models/tweets')

const deteleTweet = (req, res) => {
    res.send("Borrar Tweet");
}

const deleteComment = (req, res) => {
    res.send("Borrar Comentario");
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


module.exports = {deteleTweet, deleteComment, totalTweetsOfUser, listOfTweetsOfUser, listOfLastTweets, totalOfCommentsOfTweet, tweetsMostCommented, usersWithMostTweets};