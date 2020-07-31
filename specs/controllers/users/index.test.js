var request = require("supertest");
const User = require('./../../../api/models/users');
const mongoose = require('mongoose');

var server = require('./../../..');

describe('Tasks', () => {
    
    describe('/POST Users', () => {

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
        });

         // Close DB connection
        afterAll(async(done) => {
            await mongoose.disconnect(done);
        });

        it('should create a new user', async () => {
            const body = {
                name: 'Antonio',
                lastname: 'Fernandez',
                username: 'jfantonio',
                email: 'jfantonio@uninorte.edu.co',
                age: 32,
                birthdate: '1988-06-18',
                password: 'Aa1234..',
            };
            const res = await request(server).post('/api/users/').send(body);
            expect(res.status).toBe(201);
        });

        it('should not login a non-existent user', async () => {
            const body = {
                username: 'anonymous',
                password: 'xxxxxxx'
            }
            const res = await request(server).post('/api/users/login').send(body);;
            expect(res.status).toBe(400);
        });
    });
});