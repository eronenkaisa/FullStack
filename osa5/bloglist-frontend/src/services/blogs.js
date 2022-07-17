import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  //console.log("create blog kutsuttu")
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  console.log("update blogs kutsuttu")
  console.log('id:', id)
  console.log('newObject', newObject)
  console.log(`${baseUrl}/${id}`)
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  console.log('request', request)
  return request//.then(response => response.data)
}

export default { getAll, create, update, setToken }