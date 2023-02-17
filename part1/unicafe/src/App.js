import { useState } from 'react'


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const pageHeader = "give feedback"

  return (
    <div>
      <h1>{pageHeader}</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
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
    return <div>
      <h1> {pageHeader2} </h1>
      <p>No feedback given</p>
      </div>
  } 

  return <div> 
    <h1> {pageHeader2} </h1>
    <StatisticLine text="good" value = {good}/>
    <StatisticLine text="neutral" value = {neutral}/>
    <StatisticLine text="bad" value = {bad}/>
    <StatisticLine text="all" value = {all}/>
    <StatisticLine text="average" value = {average}/>
    <StatisticLine text="positive" value = {positive}/>
  </div>
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, value}) => {
  if (text === "positive") {
    return <div><p> {text} {value} %</p></div>
  }
  return <div><p> {text} {value}</p></div>
}

export default App
