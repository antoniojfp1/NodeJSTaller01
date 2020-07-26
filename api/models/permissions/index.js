const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collection = 'permissions';

const permissionsSchema = new Schema({
    name:           { type: String, required: true }
}, { timestamps: true});

const Permission = mongoose.model(collection, permissionsSchema);
module.exports = Permission;
