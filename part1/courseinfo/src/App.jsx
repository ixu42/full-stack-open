const Header = ({ course }) => {
  console.log(course)
  return (
    <h1>
      {course}
    </h1>
  )
}

const Part = ({ part }) => {
  const partName = part.name
  const exercises = part.exercises
  console.log("part:", partName, "| exercises:", exercises)
  return (
    <p>
      {partName} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}

const Total = ({ total }) => {
  console.log("total:", total)
  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}

export default App