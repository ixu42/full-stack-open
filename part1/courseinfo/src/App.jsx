const Header = ({ course }) => {
  console.log(course)
  return (
    <h1>
      {course}
    </h1>
  )
}

const Content = ({ part }) => {
  console.log(part)
  return (
    <p>
      {part.name} {part.exercises}
    </p>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
    <Header course={course} />
    <Content part={part1} />
    <Content part={part2} />
    <Content part={part3} />
    <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App