let mostCommented = (tweets, count) => {
    
    const result = [];
    
    tweets.sort((a, b) => {
        if (a.comments.length > b.comments.length) {
          return 1;
        }
        if (a.comments.length < b.comments.length) {
          return -1;
        }
        // a must be equal to b
        return 0;
    });
    
    for(i=0; i < count; i++) {
        result.push(tweets[tweets.length - i - 1]);
    }

    return result;
}

module.exports = mostCommented;