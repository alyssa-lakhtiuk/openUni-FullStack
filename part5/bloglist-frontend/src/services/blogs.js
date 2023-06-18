import axios from 'axios'
const baseUrl = '/api/blogs'
const userUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = async (blogObject, username) => {
  console.log('create is started')
  const headerWithToken = {
    headers: { Authorization: token },
  }

  const users = await axios.get(userUrl)
  blogObject.userId = users.data.find(obj => obj.username === username).id
  const response = await axios.post(baseUrl, blogObject, headerWithToken)
  return response.data
}

const update = async (blogToUpd, id) => {
  console.log('update is started')
  console.log('blog: ', blogToUpd)
  console.log('id', id)
  const headerWithToken = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogToUpd, headerWithToken)
  console.log('updated res: ', response.data)
  return response.data
}

const deleteBlog = async (id) => {
  console.log('delete')
  const headerWithToken = {
		headers: { Authorization: token },
	};
  const response = await axios.delete(`${baseUrl}/${id}`, headerWithToken)
  console.log('response: ', response)
  return response
}

export default { getAll, setToken, create, update, deleteBlog }