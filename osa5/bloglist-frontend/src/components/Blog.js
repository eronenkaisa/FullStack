const Blog = ({ blog, handleLike }) => (

    <div>
        {blog.title} {blog.author} likes: {blog.likes}

        <button onClick={handleLike}>like</button>

    </div>
)

export default Blog