const mongoose = require('mongoose')
mongoose.set("bufferTimeoutMS", 100000)
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

const bcrypt = require('bcryptjs')


describe('user creation', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
    //   const passwordHash = await bcrypt.hash('password', 10)
    //   const user = new User({ username: 'admin', passwordHash })
    //   await user.save()
    })
  
    test('post a new user succeeds', async () => {
      const usersAtStart = await helper.usersInDB()
  
      const userToAdd = {
        username: 'admin',
        name: 'Administrator',
        password: 'password',
      }
  
      await api
        .post('/api/users')
        .send(userToAdd)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDB()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).toContain(userToAdd.username)
    })

    test('post error 400 if the username is missing', async () => {
        const userToAdd = {
            name: 'Username',
            password: 'secret',
        }
      
        await api
          .post('/api/users')
          .send(userToAdd)
          .expect(400)
    })

    test('post error 400 if the password is missing', async () => {
        const userToAdd = {
            username: "user",
            name: 'Username'
        }
      
        await api
          .post('/api/users')
          .send(userToAdd)
          .expect(400)
    })

    test('post error 400 if the password is less than 3 characters long', async () => {
        const userToAdd = {
            username: "user",
            name: "Username",
            password: "1"
        }
      
        await api
          .post('/api/users')
          .send(userToAdd)
          .expect(400)
    })

})