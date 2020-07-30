
const User = require('../../../../api/models/users');
const mongoose = require('mongoose');

const userData = {
    name: 'Antonio',
    username: 'jfantonio',
    email: 'jfantonio@uninorte.edu.co',
    age: 32,
    birthdate: '1988-06-18',
    password: 'Aa1234..',
};

describe('Tests for User model', () => {

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

    it('Create & Save User Successfully', async() => {
        const validUser = new User(userData);
        const savedUser = await validUser.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.age).toBe(userData.age);
        expect(savedUser.birthdate).toBe(userData.birthdate);
    });

    it('Create & Save User Not Sucess Because Required Fields Not Sent', async() => {
        const invalidUser = new User({ username: "antoniojfp1" });
        expect(invalidUser.save()).rejects.toThrow(mongoose.ValidationError);
    });

    it('Retrieve User Successfully, Invalid Projected Fields Are Undefined', async() => {
        const validUser = new User(userData);
        await validUser.save();
        const retrievedUser = await User.findOne({ username: userData.username }, ["name", "gender", "active"]).exec();
        expect(retrievedUser._id).toBeDefined();
        expect(retrievedUser.name).toBe(userData.name);
        expect(retrievedUser.gender).toBeUndefined();
        expect(retrievedUser.active).toBeUndefined();
    });

});