const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const sum = parts.reduce((total, item) => total = total + item.exercises, 0)
  //const sum= parts.reduce((a,v) =>  a = a + v.exercises , 0 )
  return <div>
      <b>total {sum} of exercises</b>
    </div>
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    <Part
      part={parts[0]} 
    />
    <Part
      part={parts[1]} 
    />
    <Part
      part={parts[2]} 
    />      
    <Part
      part={parts[3]} 
    /> 
  </>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }  
  return <Course course={course} />
}


const Course=({course})=>{
  return(
    <div>
      <Header course={course.name} />
      <Content  parts={course.parts} /> 
      <Total parts = {course.parts}/>
    </div>
  )
}

export default App