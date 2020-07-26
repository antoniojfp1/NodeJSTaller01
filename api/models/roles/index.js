const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collection = 'roles';

const rolSchema = new Schema({
    name:           { type: String, required: true },
    permission_ids:       [ { permission:{ type: Schema.ObjectId, ref: 'permissions'} } ]
}, { timestamps: true});

const Rol = mongoose.model(collection, rolSchema);
module.exports = Rol;
