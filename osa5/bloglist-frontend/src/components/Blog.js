import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleDelete, user }) => {
    const [likes, setLikes] = useState(blog.likes)
    const [showDetailed, setShowDetailed] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }

    const handleLike = (id, newBlog) => {
        blogService.update(id, newBlog)
        setLikes((prev) => prev + 1)
    }

    const handleShowClick = (event) => {
        console.log('handleSHowClick')
        event.preventDefault()
        setShowDetailed(true)
    }

    const handleHideClick = (event) => {
        event.preventDefault()
        setShowDetailed(false)
    }

    if (showDetailed) {
        return (

            <div style={blogStyle}>
                {blog.title} {blog.author}   <button onClick={handleHideClick}>hide</button> <br/>
                {blog.url}<br/>
                likes {likes} <button onClick={() => handleLike(blog.id, { user: blog.user.id, title: blog.title, author: blog.author, url: blog.url, likes: Number(likes + 1) })}>like</button><br/>
                {user.name}<br/>

                <button onClick={() => handleDelete(blog.id)}>remove</button>
            </div>
        )
    } 
    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={handleShowClick}>show</button>
        </div>
    )
}

export default Blog