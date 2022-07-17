import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)


  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    /* console.log('logging in with', username, password) */

    try {
      const user = await loginService.login({
        username, password,
      })

      /* window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user) 
      )*/

      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    //console.log('loging out', username, password)

    window.localStorage.clear()
    window.location.reload()
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
      })

    setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

    setTimeout(() => {
      window.location.reload()
    }, 5000)

  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleDelete = (id) => {
    console.log('handleDelete ID:', id)
    blogService.deleteBlog(id)
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }


  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="new blog">
          <BlogForm
            onSubmit={addBlog}
            title={title}
            author={author}
            url={url}
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
          />
        </Togglable>
      </div>
    )
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {user.name} logged in


      <form onSubmit={handleLogout}>
        <button>logout</button>
      </form>
      <br />

      {blogForm()}<br />

      {blogs.filter(blog => blog.user.username === user.username).sort(function (a, b) {
        return a.likes - b.likes;
      })
        .map(blog =>

          <Blog key={blog.id} blog={blog} handleDelete={handleDelete} />

        )}
    </div>
  )

}

export default App


//() => blogService.update(blog.id, { user: blog.user.id, title: blog.title, author: blog.author, url: blog.url, likes: Number(blog.likes + 1) })


