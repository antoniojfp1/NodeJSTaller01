const User = require('./../../../api/models/users');
const mongoose = require('mongoose');

const user = {
    name: 'Antonio',
    lastname: 'Fernandez',
    username: 'jfantonio',
    email: 'jfantonio@uninorte.edu.co',
    age: 32,
    birthdate: '1988-06-18',
    password: 'Aa1234..',
};

describe('Tests for User controller', () => {

    // Open DB connection
    beforeAll(async() => {
        await mongoose.connect(global.__MONGO_URI__, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    });

    afterEach(async() => {
        // Clear collection after each test
        await User.deleteMany({}).exec();
    })

    // Close DB connection
    afterAll(async(done) => {
        await mongoose.disconnect(done);
    });



});