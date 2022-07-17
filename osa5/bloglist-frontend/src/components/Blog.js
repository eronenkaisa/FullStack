import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleDelete }) => {
    const [likes, setLikes] = useState(blog.likes)

    const handleLike = (id, newBlog) => {
        blogService.update(id, newBlog)
        setLikes((prev) => prev + 1)
    }

    return (

        <div>
            {blog.title} {blog.author} likes: {likes}

            <button onClick={() => handleLike(blog.id, { user: blog.user.id, title: blog.title, author: blog.author, url: blog.url, likes: Number(likes + 1) })}>like</button>
            <button onClick={() => handleDelete(blog.id)}>remove</button>
        </div>
    )
}

export default Blog