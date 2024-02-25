import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)}/>
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" onClick={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if(all === 0){
    return <div>
      <h2>statistics</h2>
      <p>No feedback given</p>
      </div>
  }

  const average = all ? ((good * 1) + (bad * (-1))) / all : 0
  const positivePercentage = all ? good / all * 100 : 0

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positivePercentage + ' %'} />
        </tbody>
      </table>
      
     </div>
  )
}

const StatisticsLine = ({text, value}) => {
  return ( 
      <tr>
      <td>{text}</td>
      <td>{value}</td>
      </tr>
  )
}


export default App