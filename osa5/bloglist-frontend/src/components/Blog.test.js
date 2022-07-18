import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'


test('renders title and author but no url or likes', () => {
  const testBlog1 = {
    title: 'TestBlog',
    author: 'TestAuthor',
    url: 'www.test.fi',
    likes: 5,
    user: {
        username: 'keke',
        name: 'kalle',
        id: '62af1e87101926852cdc4567'
    }

  }

  render(<Blog blog={testBlog1} />)

  screen.debug()

  const testBlogTestAuthor = screen.getByText('TestBlog TestAuthor')
  const urlAndLikes = screen.queryByText('www.test.fi likes')

  expect(testBlogTestAuthor).toBeDefined()
  expect(urlAndLikes).toBeNull()
})

test('clicking show button renders url and likes', async() => {
    const testBlog2 = {
        title: 'TestBlog2',
        author: 'TestAuthor2',
        url: 'www.test2.fi',
        likes: 5,
        user: {
            username: 'keke',
            name: 'kalle',
            id: '62af1e87101926852cdc4567'
        }
    } 
    
    const mockHandler = jest.fn()
    const user = userEvent.setup()
    
    const button = screen.queryByText('show')
    await user.click(button)

    render(
        <Blog blog={testBlog2} />
      )

    screen.debug()

    const urlAndLikes = screen.queryByText('www.test2.fi likes')
    expect(urlAndLikes).toBeDefined()
})

test('clicking like button twice calls the event handler twice', async () => {
    const testBlog3 = {
        title: 'TestBlog3',
        author: 'TestAuthor3',
        url: 'www.test3.fi',
        likes: 5,
        user: {
            username: 'keke',
            name: 'kalle',
            id: '62af1e87101926852cdc4567'
        }
    } 
    const testUser = {
        username: 'keke',
        name: 'kalle',
        id: '62af1e87101926852cdc4567'
    }
    
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render(
        <Blog blog={testBlog3} handleLike={mockHandler} user={testUser}/>
      )

    const showButton = screen.queryByText('show')
    await user.click(showButton)
    
    const likeButton = screen.queryByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    
    

    screen.debug()

    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> calls event handler with correct data when clicking onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<BlogForm addBlog={createBlog} />)

    
    const titleInput = screen.getByPlaceholderText('write title')
    console.log('titleInput:', titleInput)
    const authorInput = screen.getByPlaceholderText('write author')
    const urlInput = screen.getByPlaceholderText('write url')

    await user.type(titleInput, 'testTitle4')
    await user.type(authorInput, 'TestAuthor4')
    await user.type(urlInput, 'www.test4.fi')

    const sendButton = screen.getByText('create')
    await user.click(sendButton)

    screen.debug()

    console.log('createblog.calls:', createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls[0][0].title).toBe('testTitle4')
  })


    