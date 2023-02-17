import { useState } from 'react'


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const pageHeader = "give feedback"

  return (
    <div>
      <h1>{pageHeader}</h1>
      <button onClick={() => setGood(good+1)}>good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>
      <Statistics good = {good} neutral={neutral} bad={bad}/>
    </div>
  )
}


const Statistics = ({good, neutral, bad}) => {
  const pageHeader2 = "statistics"
  const all = good + neutral + bad
  const points = {
    good : 1, 
    neutral : 0,
    bad : -1
  }
  let average = (good * points.good + bad * points.bad) / all
  let positive = good * 100 / all
  if (all === 0) {
    average = 0
    positive = 0
  } 

  return <div> 
    <h1> {pageHeader2} </h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} % </p>
  </div>
}

export default App
