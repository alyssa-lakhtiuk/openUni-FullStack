import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (anecdoteData) => {
    const response = await axios.post(baseUrl, anecdoteData)
    return response.data
}

const updateVotes = async (id) => {
    const singleAnecdote = await axios.get(`${baseUrl}/${id}/`)
    const likedAnecdote = singleAnecdote.data
    likedAnecdote.votes = likedAnecdote.votes + 1
    const response = await axios.put(`${baseUrl}/${id}/`, likedAnecdote)
    return response.data
}

const update = async (anecdoteData) => {
    const res = await axios.put(`${baseUrl}/${anecdoteData.id}`, anecdoteData)
    return res.data
  }

export default { getAll, create, updateVotes, update }