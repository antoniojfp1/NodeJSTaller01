
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
            const validUser = new User(user);
            await validUser.save();
        }
        const allUsers = await User.find({}).exec()
        expect(allUsers).toHaveLength(5);

    });

    it('Create & Save User Not Sucess Because Required Fields Not Sent', async() => {
        const invalidUser = new User({ username: "antoniojfp1" });
        expect(invalidUser.save()).rejects.toThrow(mongoose.ValidationError);
    });

    it('Create, Save & Update User Succesfully', async() => {
        const savedUser = await new User(user).save();
        await User.updateOne({ _id: savedUser._id }, {
            $set: {
                age: 33
            }
        }).exec()
        const retrievedUser = await User.findOne({ username: user.username }, ["age"]).exec();
        expect(retrievedUser.age).toBe(33);
    });

});