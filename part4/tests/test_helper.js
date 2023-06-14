const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: '6487a86de35c097c8e09d59c',
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      user: '6487a850e35c097c8e09d598',
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      user: '6487a850e35c097c8e09d598',
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      user: '6487a86de35c097c8e09d59c',
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      user: '6487a850e35c097c8e09d598',
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      user: '6487a86de35c097c8e09d59c',
      __v: 0
    }  
  ]
  
  const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
]

const users = [
    {
        _id: '6487a86de35c097c8e09d59c',
        username: "admin",
        name: "Administrator",
        passwordHash: "$2a$10$akw29l3sE7tz5w7/vsRa0Om.laDjFO2.WBNXnVa1bwVEJ2TGk4Eu2",
        blogs: [],
        __v: 0
    },
    {
        _id: '6487a850e35c097c8e09d598',
        username: "user2",
        name: "user2",
        passwordHash: "$2a$10$T4FljQF6sQZH2xI/AD/kweVq1XI4hEEZH4E.MjwHXsL08kRmyuMJW",
        blogs: [],
        __v: 0
    }
]

const adminToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2NDg3YTg2ZGUzNWMwOTdjOGUwOWQ1OWMiLCJpYXQiOjE2ODY2NTI5MTd9.Puc9ppAZouwYep2ALlO8vWDfKUv9Ply3PuHdCREomq0'


const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
  }

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()
  
  return blog._id.toString()
}

module.exports = {
    initialBlogs, 
    listWithOneBlog,
    blogsInDB,
    usersInDB,
    nonExistingId,
    adminToken,
    users
}