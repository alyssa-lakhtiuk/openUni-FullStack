import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleLike, handleRemove }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  return (
    <div style={blogStyle} className='all_blogs'>
      <span>{blog.title}</span> <span>{blog.author}</span>
      <button type="button" onClick={() => setVisible(true)} style={hideWhenVisible} className='toggableObj'>view</button>
      <div style={showWhenVisible} className="test"> <button type="button" onClick={() => setVisible(false)}>hide</button><>
      <div>
        <>
        <p className="blog_url">url:{blog.url}</p></>
        <p className="blog_likes"> likes: <span>{blog.likes}</span> <button type="button" onClick={() => handleLike(blog)}>like</button></p>
        <p className="_blog_user_name">{blog.user.name}</p>
        </div>
        <button type="button"
          style={{ display: JSON.parse(window.localStorage.getItem('loggedUser')).username === blog.user.username ? '' : 'none' }}
          onClick={() => handleRemove(blog.id)}>remove</button>
          </>
      </div>
    </div >
  )
}

export default Blog