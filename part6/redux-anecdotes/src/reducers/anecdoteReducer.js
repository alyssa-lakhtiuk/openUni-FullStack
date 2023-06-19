import anecdotesService from '../services/anecdotes'
import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    changeAnecdote(state, action) {
      const id = action.payload.id
      const updatedAnec = action.payload
      console.log(updatedAnec)
      return state.map((a) => a.id === id ? updatedAnec : a) 
    }
  }
})

export const { appendAnecdote, setAnecdotes, changeAnecdote, changeVotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecdotesService.getAll()
    console.log(anecs)
    dispatch(setAnecdotes(anecs))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    console.log(content)
    const newAnec = await anecdotesService.create(asObject(content))
    dispatch(appendAnecdote(newAnec))
  }
}

export const vote = (anecdoteData) => {
  return async dispatch => {
    const anecToUpdate = { ...anecdoteData, votes: anecdoteData.votes + 1}
    console.log(anecToUpdate)
    const updatedAnec = await anecdotesService.updateVotes(anecdoteData)
    console.log(updatedAnec)
    dispatch(changeAnecdote(updatedAnec))
  }
}

export default anecdoteSlice.reducer;