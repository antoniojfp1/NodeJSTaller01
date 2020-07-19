const User = require('./../../models/users')

const updateUser = (req, res) => {
    res.send("Actualizar usuario");
}

const deleteUser = (req, res) => {
    res.send("Borrar usuario");
}

module.exports = {updateUser, deleteUser};