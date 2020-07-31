
const User = require('./../../../api/models/users');
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

    it('Create, Save & Retrieve Multiple User Successfully', async() => {
        for (let index = 0; index < 5; index++) {
            const validUser = new User(userData);
            await validUser.save();
        }
        const allUsers = await User.find({}).exec()
        expect(allUsers).toHaveLength(5);

    });

    it('Create & Save User Not Sucess Because Required Fields Not Sent', async() => {
        const invalidUser = new User({ username: "Efren" });
        expect(invalidUser.save()).rejects.toThrow(mongoose.ValidationError);
    });

    it('Create, Save & Update User Succesfully', async() => {
        const savedUser = await new User(userData).save();
        await User.updateOne({ _id: savedUser._id }, {
            $set: {
                age: 24
            }
        }).exec()
        const retrievedUser = await User.findOne({ username: userData.username }, ["age"]).exec();
        expect(retrievedUser.age).toBe(24);
    });

});