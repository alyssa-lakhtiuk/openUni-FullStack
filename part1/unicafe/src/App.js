import { useState } from 'react'


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const pageHeader = "give feedback"
  const pageHeader2 = "statistics"

  const all = good + neutral + bad


  return (
    <div>
      <h1>{pageHeader}</h1>
      <button onClick={() => setGood(good+1)}>good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>
      <h1> {pageHeader2} </h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <Average good = {good} bad = {bad} all = {all}/>
      <Positive good = {good} all = {all}/>
    </div>
  )
}

const Average = ({good, bad, all}) => {
  const points = {
    good : 1, 
    neutral : 0,
    bad : -1
  }
  const average = (good * points.good + bad * points.bad) / all
  if (isNaN(average)) {
    return <div> average 0 </div>
  }
  return <div>average {average} </div>
}

const Positive = ({good, all}) => {
  const positive = good * 100 / all
  return <div> positive {positive} % </div>
}





export default App
