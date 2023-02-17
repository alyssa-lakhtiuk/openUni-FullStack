const Course=({course})=>{
    return(
      <div>
        <Header course={course.name} />
        <Content  parts={course.parts} /> 
        <Total parts = {course.parts}/>
      </div>
    )
}

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const sum = parts.reduce((total, item) => total = total + item.exercises, 0)
  return <div>
      <b>total {sum} of exercises</b>
    </div>
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => <div>
{parts.map(part => (<Part key = {part.id} part={part} />))}
</div>


export default Course

