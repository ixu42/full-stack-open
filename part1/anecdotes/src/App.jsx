import { useState } from 'react'

const DisplayAnecdote = ({ anecdotes, points, index }) => {
  return (
    <div>
      <p>{anecdotes[index]}</p>
      <p>has {points[index]} votes</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const VotingResult = ({ points, anecdotes }) => {
  let voted = false;
  let maxPoint = 0
  let winnerIndex = 0
  for (let i = 0; i < 8; i++) {
    if (voted === false && points[i] !== 0)
      voted = true
    if (maxPoint < points[i]) {
      maxPoint = points[i]
      winnerIndex = i
    }
  }

  if (voted === false) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>No votes yet</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote anecdotes={anecdotes} points={points} index={winnerIndex} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
 
  const [selected, setSelected] = useState(0)
  const initialPoints = Array(8).fill(0)
  const [points, setpoints] = useState(initialPoints)

  const hanleNext = () => {
    let randomNumber
    do {
      randomNumber = Math.floor(Math.random() * 8)
    } while (randomNumber === selected)
    console.log("randomNumber:", randomNumber)
    setSelected(randomNumber)
  }

  const handleVote = () => {
    const updatedPoints = [...points]
    updatedPoints[selected] += 1
    console.log("updatedPoints:", updatedPoints)
    setpoints(updatedPoints)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote anecdotes={anecdotes} points={points} index={selected} />
      <div>
        <Button handleClick={handleVote} text="vote" />
        <Button handleClick={hanleNext} text="next anecdote" />
      </div>
      <VotingResult points={points} anecdotes={anecdotes}/>
    </div>
  )
}

export default App