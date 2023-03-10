import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const min = 0
  const max = anecdotes.length

  const [selected, setSelected] = useState(Math.floor(Math.random() * (max - min) + min))
  const randomAnecdote = () =>{
    let randomInt = Math.floor(Math.random() * (max - min) + min)
    setSelected(randomInt);
  }

  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 })
  const voteOnClick = () =>{
    const newPoints = { ...points }
    newPoints[selected] += 1
    setPoints(newPoints)
  }
  const findMaxVotes = () => {
    let anecdoteNumMax, maxPoint = 0;
    for(let i = 1; i < max; i ++) {
      if(points[i] > maxPoint) {
        maxPoint = points[i];
        anecdoteNumMax = i;
      }
    }
    return anecdotes[anecdoteNumMax]
  }

  console.log(points) 
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>
        <button onClick={voteOnClick}>vote</button>
        <button onClick={randomAnecdote}>next anecdote</button>
      </p>
      <h1>Anecdote with most votes</h1>
      <Display value = {findMaxVotes()}/>
    </div>
  )
}

const Display = props => <div>{props.value}</div>

export default App