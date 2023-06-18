import React, { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import ErrorMessage from './components/ErrorMessage'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const handleMessage = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      console.log(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage(
        `wrong username or password`
      )
    }
  };
  

	const handleLogout = (event) => {
		window.localStorage.clear();
		setUser(null);
	};



  const handleLike = async (blog) => {
    const blogToUpd = {
      title: blog.title,
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url
    }

    try {
      const returnedObject = await blogService.update(blogToUpd, blog.id);
      console.log(returnedObject)
      setBlogs((prevBlogs) => [...(prevBlogs.filter((el) => el.id !== blog.id)) , returnedObject]);
      // blogService
      //   .update(blogToUpd, blog.id)
      //   .setBlogs((prevBlogs) => [...prevBlogs, returnedObject]);     
    }
    catch (exception) {
      alert(exception)
    }
	};

  const handleRemove = (id) => {
    if (window.confirm(`Remove blog?`)) {
      try {
        blogService
          .deleteBlog(id)
        setBlogs(blogs.filter((el) => el.id !== id));
      }
      catch (exception) {
        alert(exception)
      }
    }
	};

  const handleSubmit = async (blogObject) => {
    try {
      const returnedObject = await blogService.create(blogObject, user.username);
      console.log(returnedObject)
      setBlogs((prevBlogs) => [...prevBlogs, returnedObject]);
      setNewBlog({ title: '', author: '', url: '' });
      setNotificationMessage(
        `a new blog ${returnedObject.title} by ${returnedObject.author} added`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      alert(exception);
    }
  };


  if (user === null) {
    return (
      <div>
        <Notification message={notificationMessage} />
        <ErrorMessage message={errorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              id="username"
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              id="password"
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2>blogs</h2>
        <p>
          <b>{message}</b>
        </p>
        {user.name} logged in <button type="button" onClick={handleLogout}>logout</button>
      </div>
      <div>
        <div style={{ display: visible ? 'none' : '' }}>
          <button id='show-form' type="button" onClick={() => setVisible(true)}>new blog</button>
        </div>
        <div style={{ display: visible ? '' : 'none' }}>
          <h2>create new</h2>
          <BlogForm handleSubmit={handleSubmit} setVisible={setVisible} />
        </div>
        <div>
          {blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)).map((blog) => (
            <Blog key={blog.id} blog={blog} handleLike={handleLike}
            handleRemove={handleRemove}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;