const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}  

const Part =(props) =>{
  return (
    <div>
      <p>{props.name} {props.exercise}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].part} exercise={props.parts[0].exercise}/>
      <Part name={props.parts[1].part} exercise={props.parts[1].exercise}/>
      <Part name={props.parts[2].part} exercise={props.parts[2].exercise}/>
    </div>
  )
}  

const Total = (props) => {
  return (
    <div>
        <p>{props.total}</p>
    </div>
  )
}  

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [
    {
      part: part1,
      exercise: exercises1
    },
    {
      part: part2,
      exercise: exercises2
    },
    {
      part: part3,
      exercise: exercises3
    }
  ]
  return (
    <div>
      <Header course={course.name}/>
      <Content parts = {parts}/>
      <Total total={"Number of exercises " + (exercises1 + exercises2 + exercises3)} />
    </div>
  )
}

export default App
