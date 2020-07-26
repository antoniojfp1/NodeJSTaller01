const config = {
    env: process.env.ENV,
    database: {
        development:{
            host: process.env.DEV_DATABASE_HOST, 
            name: process.env.DEV_DATABASE_NAME
        },
        production:{
            host: process.env.PROD_DATABASE_HOST, 
            name: process.env.PROD_DATABASE_NAME,
            user: process.env.PROD_DATABASE_USER,
            password: process.env.PROD_DATABASE_PASSWORD
        }
    },
    server:{
        host: process.env.SERVER_HOST,
        port: process.env.PORT || process.env.SERVER_PORT,
        logs: {
            dir: process.env.SERVER_LOGS_DIR
        }
    },
    secretKey: process.env.SECRET_KEY,
    tokenKey: process.env.TOKEN_KEY
}

module.exports = config; 