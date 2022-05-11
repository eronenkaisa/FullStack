import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])

  const increaseSelected = () => {
    setPoints((old) => {
      const copy = [...old]
      copy[selected] += 1
      return copy
    })
  }

  const maxIndex = () => {
    var max = points[0];
    var maxIndex = 0;

    for (var i = 1; i < points.length; i++) {
      if (points[i] > max) {
        maxIndex = i;
        max = points[i];
      }
    }
    return maxIndex;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const handleClick = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  const voteClick = () => {
    increaseSelected()
  }
  console.log(maxIndex)
  console.log(points)


  return (
    <div>
      {anecdotes[selected]}
      <br />
      <Button handleClick={voteClick} text="vote" />
      <Button handleClick={handleClick} text="next anecdote" />
      <br />
      <h2>Anecdote with most votes</h2>
      {anecdotes[maxIndex()]}
      <p>has {points[selected]} votes</p>
    </div>
  )
}
export default App;

