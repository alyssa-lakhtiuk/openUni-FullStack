const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')



blogsRouter.get('/', async (request, response) => {
    // Blog.find({}).then(blogs => {
    //     response.json(blogs.map(blog => blog.toJSON()))
    // })
    const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
    response.json(blogs)
})

// blogsRouter.get('/:id', (request, response, next) => {
//     Blog.findById(request.params.id)
//       .then(blog => {
//         if (blog) {
//           response.json(blog)
//         } else {
//           response.status(404).end()
//         }
//       })
//       .catch(error => next(error))
// })

  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    if(request.token === null){
        response.status(401).json({ error: 'Invalid token' });
    }
    // const token = request.token
    // console.log('token ', token)
    const decodedToken = request.user
    // const token = getTokenFrom(request)
    // const decodedToken = jwt.verify(token, config.SECRET)
    console.log('decoded token from req: ', decodedToken)
    const user = await User.findById(decodedToken.id);
    console.log('user: ', user)
    if (!user) {
        response.status(401).json({ error: 'Invalid token' });
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
//   await Blog.findByIdAndRemove(request.params.id)
//   response.sendStatus(204)
if(request.token === null){
    response.status(401).json({ error: 'Invalid token' });
}
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(400).end();
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const blog = await Blog.findByIdAndUpdate(request.params.id, request.body);
	// response.status(200).end();
    response.json(blog) 
})

module.exports = blogsRouter