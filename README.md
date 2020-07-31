# Diseño de aplicaciones Web

## Grupo de trabajo
- Barceló Yaliza
- Fernandez Antonio
- Peña Juan Carlos
- Quevedo Pamela

## Repositorio
https://github.com/antoniojfp1/NodeJSTaller01

## Base de datos Mongo
- Cluster: clusters.g6etq.mongodb.net
- Database: twitter
- User: jcpenap
- Password: 3q3j83mi2TZQsbB3

## Librerías usadas

- https://www.npmjs.com/package/express
- https://www.npmjs.com/package/mongoose
- https://www.npmjs.com/package/dotenv
- https://www.npmjs.com/package/morgan
- https://www.npmjs.com/package/path
- https://www.npmjs.com/package/fs
- https://www.npmjs.com/package/crypto-js
- https://www.npmjs.com/package/bcrypt
- https://www.npmjs.com/package/jsonwebtoken

## Modelo

1. Users
2. tweets
3. roles
4. permissions

## Controladores
1. Users
    - Requerimientos: bcrypt, jsonwebtoken, crypto y express
    - API
        - getAll: obtiene todos los usuarios
        - getUser: Obtiene un usuario por el id
        - newUser: Crea un nuevo usuario
        - updateUser: Actualiza un usuario especifico
        - deleteUser: Elimina un usuario especifico
        - totalTweetsOfUser: Devuelve el numero de tweets de un usuario especifico
        - listOfTweetsOfUser: Devuelve la lista de tweets de un usuario especifico
        - loginUser: Autentica a un usuario
        - newRol: Asigna un rol a un usuario especifico

2. tweets
    - Requerimientos: Express
    - API
        - getTweets: Obtiene todos los tweets
        - getTweet: Devuelve un tweet especifico
        - newTweet: Crea un nuevo tweet
        - newComment: Crear un comentario a un tweet
        - deleteTweet: Elimina un tweet especifico
        - deleteComment: Elimina un comentario de un tweet
        - listOfLastTweets: DEvuelve la lista de los ultimos "N" tweets
        - totalOfCommentsOfTweet: Trae la cantidad de comentarios de un tweet
        - tweetsMostCommented: Devuelve los tweets con más comentarios
        - userWithMostTweets: devuelve la lista de usuarios que mas interactuan

3. roles
    - Requerimientos:
    - API
        - getRol: Devuelve un rol especifico
        - getAllRoles: Devuelve todos los roles
        - newRol: Crea un nuevo rol
        - newPermission: Agregar un permiso a un rol

4. permissions
    - Requerimientos
    - API
        - getPermission: Devuelve un permiso especifico
        - getAllPermission: Devuelve el listado de todos los permisos
        - newPermission: Crea un nuevo permiso
        
## funciones

1. bmi: Devuelve el indice de masa coporal según altura y peso
2. crypto: Ayuda a encriptar y desencriptar un dato
3. date: Obtiene la fecha actual
4. mostCommented: Devuelve la cantidad de comentarios de un tweet
5. validatePassword: Ayuda a determinar restricciones para la contraseña de los usuarios
6. validateUsernameAndEmail: Valida que no exiista un usuario previamente creado con el email


## Middleware

1. authentication: Gestiona la autenticación de los usuarios
2. listUser: Da una lista de los usuarios logueados
3. logger

