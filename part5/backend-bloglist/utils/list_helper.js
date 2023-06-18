const blog = require("../models/blog");

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, one_blog) => total + one_blog.likes, 0)
}

const favoriteBlog = blogs => {
    if (blogs.length === 0) {
        return null; 
    }
    const maxLikes = Math.max(...blogs.map(blog => blog.likes));
    const favorite = blogs.find(blog => blog.likes === maxLikes);
    console.log('favorite: ', favorite)
    return {title: favorite.title, author: favorite.author, likes: favorite.likes};
}

const mostBlogs = blogs => {
    if (blogs.length === 0) {
        return null; 
    }
    const authorBlogsNum = {};
    blogs.forEach(blog => {
      if (!(blog.author in authorBlogsNum)) {
        authorBlogsNum[blog.author] = 1;
      } else {
        authorBlogsNum[blog.author]++;
      }
    });
    const mostBlogsNum = Math.max(...Object.values(authorBlogsNum));
    const mostBlogsAuth = Object.keys(authorBlogsNum).find(author => authorBlogsNum[author] === mostBlogsNum);
    return { author: mostBlogsAuth, blogs: mostBlogsNum };
}

const mostLikes = blogs => {
    if (blogs.length === 0) {
        return null; 
      }
      const likesByAuthor = {};
      blogs.forEach(blog => {
        if (blog.author in likesByAuthor) {
          likesByAuthor[blog.author] += blog.likes;
        } else {
          likesByAuthor[blog.author] = blog.likes;
        }
      });
      const maxLikes = Math.max(...Object.values(likesByAuthor));
      const topAuthor = Object.keys(likesByAuthor).find(author => likesByAuthor[author] === maxLikes);
    
      return { author: topAuthor, likes: maxLikes };
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}