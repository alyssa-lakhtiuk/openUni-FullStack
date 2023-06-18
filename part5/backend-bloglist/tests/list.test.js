const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

// ****************************
describe('total likes', () => {
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(testHelper.listWithOneBlog)
      expect(result).toBe(5)
    })

    test('when list has many blogs, equals the sum of likes of every blog', () => {
      const result = listHelper.totalLikes(testHelper.initialBlogs)
      expect(result).toBe(36)
    })
})

// ****************************
describe('favorite blog', () => {
    // const listWithSameLikesBlog = [
    //     {
    //       _id: '5a422aa71b54a676234d17f8',
    //       title: 'Go To Statement Considered Harmful',
    //       author: 'Edsger W. Dijkstra',
    //       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    //       likes: 5,
    //       __v: 0
    //     },
    //     {
    //         _id: '5a422aa73b54g679236d17a8',
    //         title: 'Some interesting blog',
    //         author: 'Cool author',
    //         url: 'http://www.my.interesting.favorite.blogs/.html',
    //         likes: 5,
    //         __v: 0
    //       }
    // ]
  
    test('when list has only one blog, equals tto this blog', () => {
      const result = listHelper.favoriteBlog(testHelper.listWithOneBlog)
      expect(result).toEqual({title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5})
    })

    test('when list has many blogs, equals the blog with the most likes', () => {
      const result = listHelper.favoriteBlog(testHelper.initialBlogs)
      expect(result).toEqual({title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12})
    })

    // test('when list few blogs with same most number of likes', () => {
    //     const result = listHelper.favoriteBlog(listWithSameLikesBlog)
    //     expect(result).toEqual({title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5})
    // })
})

describe('most BLOGS author & quantity', () => {
    test('when list has one blog, equals the author of this blog and 1', () => {
      const result = listHelper.mostBlogs(testHelper.listWithOneBlog)
      expect(result).toEqual({author: 'Edsger W. Dijkstra', blogs: 1})
    })

    test('when list has many blogs, equals the author of the biggest number of blogs and this number', () => {
        const result = listHelper.mostBlogs(testHelper.initialBlogs)
        expect(result).toEqual({author: 'Robert C. Martin', blogs: 3})
      })
})

describe('most LIKES author & quantity', () => {
    test('when list has one blog, equals the author of this blog and number of likes', () => {
      const result = listHelper.mostLikes(testHelper.listWithOneBlog)
      expect(result).toEqual({author: 'Edsger W. Dijkstra', likes: 5})
    })
    test('when list has many blogs, equals the author with the biggest number of likes and this number', () => {
      const result = listHelper.mostLikes(testHelper.initialBlogs)
      expect(result).toEqual({author: 'Edsger W. Dijkstra', likes: 17})
    })
})


