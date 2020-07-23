let mostTweets = (tweets, count) => {
    
    let result = [];

    let repetidos = [];

    let value = {};

    tweets.forEach(element => repetidos.push([element.user]));
    
    console.log(repetidos);

    let resultado = {};
    let i = 0;

    repetidos.forEach(function(numero){
      resultado[numero] = (resultado[numero] || 0) + 1;
      result[i] = {
        user: resultado[numero],
        cantidad: (resultado[numero] || 0) + 1
    };
    i++;
      //value.push({user: resultado[numero], cantidad: (resultado[numero] || 0) + 1 });
    });

   console.log(resultado);

   console.log(result);
   
    /*tweets.sort((a, b) => {
        if (a.user.length > b.user.length) {
          return 1;
        }
        if (a.user.length < b.user.length) {
          return -1;
        }
        // a must be equal to b
        return 0;
    });
    console.log(tweets);
    for(i=0; i < count; i++) {
        result.push(tweets[tweets.length - i - 1]);
    }*/

    return result;
}

module.exports = mostTweets;