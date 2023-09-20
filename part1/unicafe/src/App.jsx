import { useState } from 'react'

const StatLine = (props) => {
  return(
    <tr>
      <td> {props.name}:</td>
      <td>{props.stat}</td>
    </tr>
  )
}

const FeedbackButton = (props) => {
  return(
    <button onClick={props.handler}>
      {props.name}
    </button>
  )
}

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral
  const posi = (props.good*100)/total
  const avg = (props.bad*-1 + props.good*1)/total
  if (total === 0) {
    return(
      <h3>
        no feedback given >:(
      </h3>
    )
  }
  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatLine name="goods" stat={props.good}/>
          <StatLine name="neutral" stat={props.neutral}/>
          <StatLine name="bad" stat={props.bad}/>
          <StatLine name="avg" stat={avg}/>
          <StatLine name="pos%" stat={posi}/>
        </tbody>
      </table>
    

    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }


  return (
    <div>
      <h1>feedback: </h1>
      <FeedbackButton name="good" handler={handleGoodClick}/>
      <FeedbackButton name="neutral" handler={handleNeutralClick}/>
      <FeedbackButton name="bad" handler={handleBadClick}/>

      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App