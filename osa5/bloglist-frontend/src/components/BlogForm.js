import { useState, useEffect } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }
    addBlog(blogObject)
  }

   return (
     <div>
       <h2>create new</h2>
 
       <form onSubmit={onSubmit}>
         <div>
           title
           <input
             value={title}
             onChange={handleTitleChange}
             placeholder='write title'
           />
         </div>
         <div>
           author
           <input
             value={author}
             onChange={handleAuthorChange}
             placeholder='write author'
           />
       </div>
       <div>
           url
           <input
             value={url}
             onChange={handleUrlChange}
             placeholder='write url'
           />
       </div>
         <button type="submit">create</button>
       </form>
     </div>
   )
 }
 
 export default BlogForm