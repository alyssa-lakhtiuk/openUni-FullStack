const mongoose = require('mongoose')
mongoose.set("bufferTimeoutMS", 100000)
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await User.insertMany(helper.users)
    await Blog.insertMany(helper.initialBlogs)
}, 100000)  

// step 1
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
}, 100000)

// step 2
test('the id named properly', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

// step 3
describe('addition of a new blog', () => {
  test('posting new blog', async () => {
    const blogToAdd = {
        title: "New blog",
        author: "Cool Author",
        url: "https://some.coo.websource.blogs/new-blog",
        likes: 123
      }

    await api
      .post('/api/blogs')
      .set('Authorization', helper.adminToken)
      .send(blogToAdd)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const afterPost = await helper.blogsInDB()
    expect(afterPost.length).toBe(helper.initialBlogs.length + 1)
  })


// step 4
  test('missing likes property is 0', async () => {
    const blogToAdd = {
        title: "Another blog",
        author: "Cool Author",
        url: "https://some.coo.websource.blogs/another-blog"
      }

    await api
      .post('/api/blogs')
      .set('Authorization', helper.adminToken)
      .send(blogToAdd)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const afterPost = await helper.blogsInDB()
    expect(afterPost[afterPost.length-1].likes).toEqual(0)
  })

// step 5
  test('400 if the URL is missing', async () => {
    const blogToAdd = {
      title: 'Interesting blog',
      author: 'Interesting Author',
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', helper.adminToken)
      .send(blogToAdd)
      .expect(400)
  })

  test('400 if the title is missing', async () => {
    const blogToAdd = {
      author: 'Interesting blog',
      url: 'https://some.coo.websource.blogs/interesting-blog',
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', helper.adminToken)
      .send(blogToAdd)
      .expect(400)
  })

  test('401 if the token is missing', async () => {
    const blogToAdd = {
      title: "New2 blog",
      author: "Cool Author",
      url: "https://some.coo.websource.blogs/new2-blog",
      likes: 127
    }

    await api
      .post('/api/blogs')
      // .set('Authorization', helper.adminToken)
      .send(blogToAdd)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    })
  })

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToDelete = blogsAtStart[blogsAtStart.length - 1]
      console.log('blog to delete: ', blogToDelete)

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', helper.adminToken)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDB()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  // describe('updating a blog', () => {
  //   test('update a blog', async () => {
  //       const blogsAtStart = await helper.blogsInDB()
  //       const blogToUpdate = blogsAtStart[0]
  //       const updatedBlog = { ...blogToUpdate, likes: 77 }
  //       await api
  //         .put(`/api/blogs/${blogToUpdate.id}`)
  //         .send(updatedBlog)
  //         .expect(200)
  //         .expect('Content-Type', /application\/json/)
      
  //       const blogsAtEnd = await helper.blogsInDB()
  //       const updatedBlogInDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
  //       expect(updatedBlogInDb.likes).toBe(77)
  //     })
  // })


afterAll(async () => {
  await mongoose.connection.close()
})